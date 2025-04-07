'use client';
import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Input, Select, Spin } from 'antd';
import styled from 'styled-components';
import {
  StyledModal,
  StyledFormContent,
  StyledFormContentItem,
  StyledForm,
  StyledFormHeader,
  StyledFormHeaderTitle,
  StyledFormContentField,
  StyledFormFooter,
  StyledFormBtn,
} from './index.styled';
import { StyledFormItem } from '@core/styles/createTechnicalCard/index.styled';
import { ModeComponent } from '@core/types/models/core/models';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import {
  useShedSettingActionsContext,
  useShedSettingContext,
} from '../ShedSettingContextProvider';
import { RequiredProceduresDto } from '@core/types/models/requiredProcedures/RequiredProceduresTypes';
import { DirectionsShedDto } from '@core/types/models/directionsShed/DirectionsShedTypes';
import { SupportCounselorDto } from '@core/types/models/supportCounselor/SupportCounselorTypes';
import { SupportStudentDto } from '@core/types/models/supportStudent/SupportStudentTypes';
import { getAllRequiredProcedures } from '@core/services/RequiredProceduresService';
import { getAllDirectionsShed } from '@core/services/DirectionsShedService';
import { getAllSupportCounselors } from '@core/services/SupportCounselorService';
import { getAllSupportStudents } from '@core/services/SupportStudentService';
import { getAllShedCategories } from '@core/services/ShedCategoryService';
import {
  createShedSetting,
  updateShedSetting,
} from '@core/services/ShedSettingService';
import { ShedSettingDto } from '@core/types/models/shedSetting/ShedSettingTypes';
import { DiagnosticType, diagnosticTypeMap } from '@core/types/enums/DiagnosticType';
import { getAllSpecialitys } from '@core/services/SpecialityService';

const { Option } = Select;



const AddEditViewShedSetting = () => {
  const { onCloseEditViewModel, reload } = useShedSettingActionsContext();
  const { initialData, modeAddEditViewModel, openAddEditViewModel } =
    useShedSettingContext();
  const [form] = Form.useForm();
  const infoViewActionsContext = useInfoViewActionsContext();

  const [shedCategories, setShedCategories] = useState<any[]>([]);
  const [requiredProcedures, setRequiredProcedures] = useState<
    RequiredProceduresDto[]
  >([]);
  const [directionsShed, setDirectionsShed] = useState<DirectionsShedDto[]>([]);
  const [supportCounselors, setSupportCounselors] = useState<
    SupportCounselorDto[]
  >([]);
  const [supportStudents, setSupportStudents] = useState<SupportStudentDto[]>(
    [],
  );
  const [specialities, setSpecialities] = useState<any[]>([]);
  const [target, setTarget] = useState<any>(undefined);
  const [hasGroup, setHasGroup] = useState<any>(false);
  useEffect(() => {
    if (initialData) {
      setHasGroup(initialData.hasGroup);
      setTarget(initialData.target);
      form.setFieldsValue({ ...initialData });
    }
  }, [initialData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          reqProceduresData,
          directionsShedData,
          supportCounselorsData,
          supportStudentsData,
          shedCategoriesData,
          specialitiesData,
        ] = await Promise.all([
          getAllRequiredProcedures(infoViewActionsContext),
          getAllDirectionsShed(infoViewActionsContext),
          getAllSupportCounselors(infoViewActionsContext),
          getAllSupportStudents(infoViewActionsContext),
          getAllShedCategories(infoViewActionsContext),
          getAllSpecialitys(infoViewActionsContext),
        ]);
        setRequiredProcedures(reqProceduresData);
        setDirectionsShed(directionsShedData);
        setSupportCounselors(supportCounselorsData);
        setSupportStudents(supportStudentsData);
        setShedCategories(shedCategoriesData);
        setSpecialities(specialitiesData);
      } catch (error) {
        console.error('Error fetching data:', error);
        infoViewActionsContext.fetchError(
          'حدثت مشكلة , يرجى إعادة المحاولة لاحقا',
        );
      }
    };

    fetchData();
  }, []);

  const onFinish = async (values: any) => {
    const shedSettingDto: ShedSettingDto = {
      id: initialData?.id || null,
      idShedCategory: values.idShedCategory,
      target: values.target,
      reference: values.reference,
      syndromeDiagnostic: values.syndromeDiagnostic,
      supportCounselors: values.supportCounselors,
      supportStudents: values.supportStudents,
      requiredProcedures: values.requiredProcedures,
      directionSheds: values.directionSheds,
      idSpeciality: values.idSpeciality,
      groupName: values.groupName,
      hasGroup: values.hasGroup,
    };

    try {
      if (modeAddEditViewModel === ModeComponent.create) {
        await createShedSetting(shedSettingDto, infoViewActionsContext, () => {
          const successMessage = 'تم الحفظ بنجاح';
          infoViewActionsContext.showMessage(successMessage);
          reload();
          onCloseEditViewModel();
        }).catch((error) => {
          infoViewActionsContext.fetchError(error.message);
        });
      } else if (modeAddEditViewModel === ModeComponent.edit) {
        await updateShedSetting(
          initialData.id!,
          shedSettingDto,
          infoViewActionsContext,
          () => {
            const successMessage = 'تم التعديل بنجاح';
            infoViewActionsContext.showMessage(successMessage);
            reload();
            onCloseEditViewModel();
          },
        ).catch((error) => {
          infoViewActionsContext.fetchError(error.message);
        });
      }
    } catch (error) {
      const errorMessage =
        modeAddEditViewModel === ModeComponent.create
          ? 'لم يتم الحفظ بنجاح'
          : 'لم يتم التعديل بنجاح';
      infoViewActionsContext.showMessage(errorMessage);
      console.error('Error saving shedSetting:', error);
    }
  };

  return (
    <StyledModal
      footer={false}
      open={openAddEditViewModel}
      onCancel={onCloseEditViewModel}
      width='75%'
    >
      <StyledForm form={form} onFinish={onFinish}>
        <StyledFormHeader>
          <StyledFormHeaderTitle>
            {modeAddEditViewModel === ModeComponent.create
              ? 'إنشاء إعدادات التوجيه'
              : modeAddEditViewModel === ModeComponent.edit
                ? 'تعديل إعدادات التوجيه'
                : 'عرض إعدادات التوجيه'}
          </StyledFormHeaderTitle>
        </StyledFormHeader>
        <StyledFormContent>
          <StyledFormContentItem>
            <StyledFormContentField>
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={12}>
                  {/* Select for idShedCategory using fetched data */}
                  <StyledFormItem
                    label='الفئة'
                    name='idShedCategory'
                    labelAlign='left'
                    rules={[
                      { required: true, message: 'الرجاء اختيار الفئة!' },
                    ]}
                    labelCol={{ span: 8 }}
                  >
                    <Select
                      placeholder='اختر الفئة'
                      disabled={
                        modeAddEditViewModel === ModeComponent.view ||
                        modeAddEditViewModel === ModeComponent.edit
                      }
                      onChange={(value: number) => {
                        const selectedCategory = shedCategories.find(
                          (cat) => cat.id === value,
                        );
                        if (selectedCategory) {
                          form.setFieldsValue({
                            reference: selectedCategory.code,
                          });
                        }
                      }}
                    >
                      {shedCategories.map((cat: any) => (
                        <Option key={cat.id} value={cat.id}>
                          {cat.name}
                        </Option>
                      ))}
                    </Select>
                  </StyledFormItem>

                  {/* Input for reference */}
                  <StyledFormItem
                    label='المرجع'
                    name='reference'
                    labelAlign='left'
                    rules={[
                      { required: true, message: 'الرجاء إدخال المرجع!' },
                    ]}
                    labelCol={{ span: 8 }}
                  >
                    <Input placeholder='أدخل المرجع' disabled={true} />
                  </StyledFormItem>

                  <StyledFormItem
                    label='الهدف'
                    name='target'
                    labelAlign='left'
                    rules={[
                      { required: true, message: 'الرجاء اختيار الهدف!' },
                    ]}
                    labelCol={{ span: 8 }}
                  >
                    <Select
                      placeholder='اختر الهدف'
                      disabled={modeAddEditViewModel === ModeComponent.view}
                      onChange={(target) => {
                        setTarget(target);
                      }}
                    >
                      {Object.values(DiagnosticType).map((option) => (
                        <Option key={option} value={option}>
                          {diagnosticTypeMap[option]}
                        </Option>
                      ))}
                    </Select>
                  </StyledFormItem>
                  {target == DiagnosticType.speciality && (
                    <StyledFormItem
                      name='idSpeciality'
                      label='شعبة الرغبة'
                      rules={[
                        {
                          required: true,
                          message: 'الرجاء اختيار مظهر التشخيص',
                        },
                      ]}
                      labelCol={{ span: 8 }}
                      labelAlign='left'
                    >
                      <Select
                        disabled={modeAddEditViewModel === ModeComponent.view}
                        placeholder='اختر مظهر التشخيص'
                      >
                        {specialities.map((guidanceSpeciality) => (
                          <Option
                            key={guidanceSpeciality.id}
                            value={guidanceSpeciality.id}
                          >
                            {guidanceSpeciality.title}
                          </Option>
                        ))}
                      </Select>
                    </StyledFormItem>
                  )}
                  <StyledFormItem
                    label='مظهر التوجيه'
                    name='syndromeDiagnostic'
                    labelAlign='left'
                    rules={[
                      { required: true, message: 'الرجاء إدخال التشخيص!' },
                    ]}
                    labelCol={{ span: 8 }}
                  >
                    <Input
                      placeholder='أدخل التشخيص'
                      disabled={modeAddEditViewModel === ModeComponent.view}
                    />
                  </StyledFormItem>
                  <StyledFormItem
                    label='لديه مجموعة ارشادية'
                    name='hasGroup'
                    labelAlign='left'
                    rules={[{ required: true, message: 'لديه مجموعة ارشادية' }]}
                    labelCol={{ span: 8 }}
                  >
                    <Select
                      placeholder='لديه مجموعة ارشادية'
                      onChange={(value) => {
                        setHasGroup(value);
                      }}
                      defaultValue={hasGroup}
                      disabled={modeAddEditViewModel === ModeComponent.view}
                    >
                      <Option value={true}>نعم</Option>
                      <Option value={false}>لا</Option>
                    </Select>
                  </StyledFormItem>
                </Col>
                <Col span={12}>
                  {/* Multi-select for supportCounselors */}
                  <StyledFormItem
                    label='سند المستشار'
                    name='supportCounselors'
                    labelAlign='left'
                    rules={[
                      { required: true, message: 'الرجاء اختيار السند!' },
                    ]}
                    labelCol={{ span: 8 }}
                  >
                    <Select
                      mode='multiple'
                      placeholder='اختر السند'
                      disabled={modeAddEditViewModel === ModeComponent.view}
                    >
                      {supportCounselors.map((sc) => (
                        <Option key={sc.id} value={sc.id}>
                          {sc.name}
                        </Option>
                      ))}
                    </Select>
                  </StyledFormItem>

                  {/* Multi-select for supportStudents */}
                  <StyledFormItem
                    label='سند التلميذ'
                    name='supportStudents'
                    labelAlign='left'
                    rules={[
                      { required: true, message: 'الرجاء اختيار السند!' },
                    ]}
                    labelCol={{ span: 8 }}
                  >
                    <Select
                      mode='multiple'
                      placeholder='اختر السند'
                      disabled={modeAddEditViewModel === ModeComponent.view}
                    >
                      {supportStudents.map((ss) => (
                        <Option key={ss.id} value={ss.id}>
                          {ss.name}
                        </Option>
                      ))}
                    </Select>
                  </StyledFormItem>

                  {/* Multi-select for requiredProcedures */}
                  <StyledFormItem
                    label='الإجراءات المطلوبة'
                    name='requiredProcedures'
                    labelAlign='left'
                    rules={[
                      { required: true, message: 'الرجاء اختيار الإجراءات!' },
                    ]}
                    labelCol={{ span: 8 }}
                  >
                    <Select
                      mode='multiple'
                      placeholder='اختر الإجراءات'
                      disabled={modeAddEditViewModel === ModeComponent.view}
                    >
                      {requiredProcedures.map((rp) => (
                        <Option key={rp.id} value={rp.id}>
                          {rp.name}
                        </Option>
                      ))}
                    </Select>
                  </StyledFormItem>

                  {/* Multi-select for directionSheds */}
                  <StyledFormItem
                    label='التوجيهات الإرشادية'
                    name='directionSheds'
                    labelAlign='left'
                    rules={[
                      { required: true, message: 'الرجاء اختيار التوجيهات!' },
                    ]}
                    labelCol={{ span: 8 }}
                  >
                    <Select
                      mode='multiple'
                      placeholder='اختر الاتجاهات'
                      disabled={modeAddEditViewModel === ModeComponent.view}
                    >
                      {directionsShed.map((ds) => (
                        <Option key={ds.id} value={ds.id}>
                          {ds.name}
                        </Option>
                      ))}
                    </Select>
                  </StyledFormItem>
                  {hasGroup && (
                    <StyledFormItem
                      label='اسم المجموعة'
                      name='groupName'
                      labelAlign='left'
                      rules={[
                        { required: true, message: 'الرجاء اسم المجموعة !' },
                      ]}
                      labelCol={{ span: 8 }}
                    >
                      <Input
                        placeholder='أدخل اسم المجموعة'
                        disabled={modeAddEditViewModel === ModeComponent.view}
                      />
                    </StyledFormItem>
                  )}
                </Col>
              </Row>
            </StyledFormContentField>
          </StyledFormContentItem>
        </StyledFormContent>
        <StyledFormFooter>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={24}>
              <StyledFormBtn
                type='primary'
                ghost
                onClick={onCloseEditViewModel}
              >
                إلغاء
              </StyledFormBtn>
              {modeAddEditViewModel !== ModeComponent.view && (
                <StyledFormBtn type='primary' htmlType='submit'>
                  حفظ
                </StyledFormBtn>
              )}
            </Col>
          </Row>
        </StyledFormFooter>
      </StyledForm>
      {/* {loading && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Spin size="large" />
        </div>
      )} */}
    </StyledModal>
  );
};

export default AddEditViewShedSetting;
