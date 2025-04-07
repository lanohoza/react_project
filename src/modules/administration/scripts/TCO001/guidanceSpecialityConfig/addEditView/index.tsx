'use client';
import React, { useEffect, useState } from 'react';
import { Button, Form, Row, Col, Select, Divider, InputNumber, Input } from 'antd';
import { DiagnosticType } from '@core/types/enums/DiagnosticType';
import { InfoViewActions, useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';

import { ShedSettingMenuDto } from '@core/types/models/shedSetting/ShedSettingTypes';
import { StyledForm, StyledFormBtn, StyledFormContent, StyledFormContentField, StyledFormContentItem, StyledFormFooter, StyledFormHeader, StyledFormHeaderTitle, StyledModal } from './index.styled';
import { ModeComponent } from '@core/types/models/core/models';
import { StyledFormItem } from '@core/styles/createTechnicalCard/index.styled';
import { createTCO002GuidanceSpecialityConfigs, updateTCO002GuidanceSpecialityConfigs } from '@core/services/scripts/TCO002ScriptService';
import { useTCO002GuidanceSpecialityConfigContext, useTCO002GuidanceSpecialityConfigActionsContext } from '../TCO002GuidanceSpecialityConfigContextProvider';
import { getAdminGuidanceSpecialitiesByEstablishmentType } from '@core/services/GuidanceSpecialityService';
import { getAllAdminLevels } from '@core/services/LevelService';
import { typeEstablishmentMap } from '@core/hooks/UrlHooks';
import { getAdminSubjectsByType } from '@core/services/SubjectService';
import { getAllShedSettingsByFilter } from '@core/services/ShedSettingService';
import { DeleteFilled, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const diagnosticTypeMap: Record<string, string> = {
  student: 'تلميذ',
  classe: 'قسم',
  level: 'مستوى',
  speciality: 'تخصص',
  professor: 'أستاذ',
  parents: 'أولياء الأمور',
};

const conditionOperateMap: Record<string, string> = {
  greater: 'أكبر',
  greaterEqual: 'أكبر أو يساوي',
  less: 'أصغر',
  lessEqual: 'أصغر أو يساوي',
  equal: 'يساوي',
  btwEqual: 'أكبر وأصغر من',
};

const AddEditViewTCE002Condition: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [form] = Form.useForm();
  const infoViewActionsContext = useInfoViewActionsContext();
  const { onCloseEditViewModel, reload } = useTCO002GuidanceSpecialityConfigActionsContext();
  const { initialData, modeAddEditViewModel, openAddEditViewModel } = useTCO002GuidanceSpecialityConfigContext();
  const [subjects, setSubjects] = useState<any[]>([]);
  const [levels, setLevels] = useState<any[]>([]);
  const [subjectConfigs, setSubjectConfigs] = useState<any[]>([]);
  const [idLevel, setIdLevel] = useState<any>(undefined);
  const [guidanceSpecialities, setGuidanceSpecialities] = useState([] as any[]);
  const [subjectConfigsCount, setSubjectConfigsCount] = useState(0); // State for audiences

  useEffect(() => {
    if (initialData) {
      let localsubjectConfigsCount = 0;

      initialData?.subjectConfigs?.forEach((subjectConfigDto) => {
        subjectConfigDto.key = localsubjectConfigsCount;
        localsubjectConfigsCount++;
      });
      setSubjectConfigs(initialData?.subjectConfigs);
      console.log(`nitialData?.subjectConfigs`, initialData?.subjectConfigs);
      setSubjectConfigsCount(localsubjectConfigsCount);

      const basic = initialData?.subjectConfigs
        ? Object.values(initialData?.subjectConfigs).map((subjectConfigDto: any) => subjectConfigDto.basic)
        : [];
      const coefficient = initialData?.subjectConfigs
        ? Object.values(initialData?.subjectConfigs).map((subjectConfigDto: any) => subjectConfigDto.coefficient)
        : [];
      const idSubject = initialData?.subjectConfigs
        ? Object.values(initialData?.subjectConfigs).map((subjectConfigDto: any) => subjectConfigDto.idSubject)
        : [];
      form.setFieldsValue({ ...initialData, basic, coefficient, idSubject });

    }

  }, [initialData]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {

    getAllAdminLevels(infoViewActionsContext).then((levelDtos) => {
      setLevels(levelDtos);
      const level = levelDtos.find(level => level.id == initialData?.idLevel);
      if (level) loadData(level);
    }).catch(() => {
      infoViewActionsContext.fetchError("حدثت مشكلة getAllAdminLevels , يرجى إعادة المحاولة لاحقا");
    });

  };



  const loadData = (level: any) => {

    getAdminGuidanceSpecialitiesByEstablishmentType(level.type, infoViewActionsContext).then((guidanceSpecialitieDtos) => {
      setGuidanceSpecialities(guidanceSpecialitieDtos);
    }).catch(() => {
      infoViewActionsContext.fetchError("حدثت مشكلة setGuidanceSpecialities , يرجى إعادة المحاولة لاحقا");
    });

    getAdminSubjectsByType(level.type, infoViewActionsContext).then((subjectDtos) => {
      setSubjects(subjectDtos);
    }).catch(() => {
      infoViewActionsContext.fetchError("حدثت مشكلة  getAdminSubjectsByType, يرجى إعادة المحاولة لاحقا");
    });
  }
  const setSelectIdLevel = (idLevel: any) => {
    const level = levels.find(level => level.id == idLevel);
    form.setFieldsValue({ idGuidanceSpeciality: undefined })
    form.setFieldsValue({ idShedSetting: undefined })
    if (level) {
      loadData(level);
    }
  }



  const onFinish = async (values: any) => {

    const basics = values.basic
      ? Object.values(values.basic).map((key) => key)
      : [];
    const coefficients = values.coefficient
      ? Object.values(values.coefficient).map((key) => key)
      : [];
    const idSubjects = values.idSubject
      ? Object.values(values.idSubject).map((key) => key)
      : [];

    const localSubjectConfigs = idSubjects.map((value: string, index) => (
      {
        idSubject: parseInt(value),
        coefficient: coefficients[index],
        basic: basics[index],
      })
    );
    const dto: any = {
      id: initialData ? initialData.id : null,
      idLevel: values.idLevel,
      idGuidanceSpeciality: values.idGuidanceSpeciality,
      typeEstablishment: values.typeEstablishment,
      subjectConfigs: localSubjectConfigs

    };
    if (modeAddEditViewModel == ModeComponent.create) {


      createTCO002GuidanceSpecialityConfigs(dto, infoViewActionsContext).then(() => {
        infoViewActionsContext.showMessage('تم الحفظ بنجاح');
        reload();
        onCloseEditViewModel();
      }).catch(() => {
        infoViewActionsContext.fetchError("حدثت مشكلة , يرجى إعادة المحاولة لاحقا");
      });

    } else {

      updateTCO002GuidanceSpecialityConfigs(dto.id, dto, infoViewActionsContext).then(() => {
        infoViewActionsContext.showMessage('تم الحفظ بنجاح');
        reload();
        onCloseEditViewModel();
      }).catch(() => {
        infoViewActionsContext.fetchError("حدثت مشكلة , يرجى إعادة المحاولة لاحقا");
      });
    }
  };
  const OnAddNewSubjectConfig = () => {
    setSubjectConfigs([...subjectConfigs, { key: subjectConfigsCount + 1 }]);
    setSubjectConfigsCount(subjectConfigsCount + 1);
  };
  const OnRemoveSubjectConfigs = (key) => {
    setSubjectConfigs(subjectConfigs.filter((item) => item.key !== key));
  };
  return (
    <StyledModal footer={false} open={openAddEditViewModel} onCancel={onCloseEditViewModel} width="80%">
      <StyledForm form={form} onFinish={onFinish}>
        <StyledFormHeader>
          <StyledFormHeaderTitle>
            {modeAddEditViewModel === ModeComponent.create
              ? 'إنشاء  مجموعة التوجيه '
              : modeAddEditViewModel === ModeComponent.edit
                ? 'تعديل  مجموعة التوجيه  '
                : 'عرض  مجموعة التوجيه '}
          </StyledFormHeaderTitle>
        </StyledFormHeader>
        <StyledFormContent>
          <StyledFormContentItem>
            <StyledFormContentField>

              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>

                <Col span={12}>
                  <StyledFormItem
                    name="idLevel"
                    label="المستوى"
                    rules={[{ required: true, message: 'الرجاء اختيار المستوى' }]}
                    labelCol={{ span: 8 }}
                    labelAlign="left"
                  >
                    <Select disabled={modeAddEditViewModel === ModeComponent.view} placeholder="اختر المستوى " onSelect={(level) => { setSelectIdLevel(level) }}>
                      {levels.map((level) => (
                        <Option key={level.id} value={level.id}>
                          {level.title} {typeEstablishmentMap[level.type]}
                        </Option>
                      ))}
                    </Select>
                  </StyledFormItem>

                </Col>
              </Row>
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>



                <Col span={12}>
                  <StyledFormItem
                    name="idGuidanceSpeciality"
                    label="شعبة الرغبة"
                    rules={[{ required: true, message: 'الرجاء اختيار  شعبة الرغبة' }]}
                    labelCol={{ span: 8 }}
                    labelAlign="left"
                  >
                    <Select disabled={modeAddEditViewModel === ModeComponent.view} placeholder="اختر  شعبة الرغبة" >
                      {guidanceSpecialities.map((guidanceEstablishment) => (
                        <Option key={guidanceEstablishment.id} value={guidanceEstablishment.id}>
                          {guidanceEstablishment.title}
                        </Option>
                      ))}
                    </Select>
                  </StyledFormItem>
                </Col>

              </Row>
              <Divider style={{ background: "#e5e4e4" }}></Divider>
              <Row style={{ marginBottom: '10px' }}>
                <Col span={22}>
                </Col>
                <Col
                  span={2}
                  style={{ display: 'flex', justifyContent: 'end' }}
                >
                  <Button
                    icon={<PlusOutlined />}
                    style={{ padding: '13px 8px', background: 'green', display: modeAddEditViewModel == ModeComponent.view ? "none" : "flex" }}
                    onClick={OnAddNewSubjectConfig}
                    size='small'
                    type='primary'
                  >
                    إضافة
                  </Button>
                </Col>
              </Row>
              {subjectConfigs?.map((subjectConfig) => (
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  <Col span={8}>
                    <StyledFormItem
                      name={['idSubject', subjectConfig?.key?.toString() ?? '']}

                      label="المادة"
                      rules={[{ required: true, message: 'الرجاء اختيار المادة' }]}
                      labelCol={{ span: 8 }}
                      labelAlign="left"
                    >
                      <Select disabled={modeAddEditViewModel === ModeComponent.view} placeholder="اختر المادة ">
                        {subjects.map((subject) => (
                          <Option key={subject.id} value={subject.id}>
                            {subject.title}
                          </Option>
                        ))}
                      </Select>
                    </StyledFormItem>

                  </Col>
                  <Col span={6}>
                    <Form.Item
                      labelCol={{ span: 8 }}
                      labelAlign={'left'}
                      className='form-field'
                      name={['basic', subjectConfig?.key?.toString() ?? '']}
                      label='أساسي'
                      rules={[{ required: true }]}
                    >
                      <Select
                        placeholder='أختر '
                        disabled={modeAddEditViewModel === ModeComponent.view}
                      >
                        <Option value={true}>نعم</Option>
                        <Option value={false}>لا</Option>

                      </Select>
                    </Form.Item>
                  </Col>

                  <Col span={6}>
                    <Form.Item
                      labelCol={{ span: 8 }}
                      className='form-field'
                      labelAlign={'left'}
                      name={['coefficient', subjectConfig?.key?.toString() ?? '']}
                      label='المعامل'
                      rules={[{ required: true }]}
                    >
                      <Input
                        disabled={modeAddEditViewModel === ModeComponent.view}
                      ></Input>
                    </Form.Item>
                  </Col>


                  <Col span={2}>
                    <Button
                      style={{ color: '#ff4d4f', border: '1px solid red', display: modeAddEditViewModel == ModeComponent.view ? "none" : "flex" }}
                      onClick={() => OnRemoveSubjectConfigs(subjectConfig.key)}
                      icon={<DeleteFilled />}
                    ></Button>
                  </Col>
                </Row>
              ))}



            </StyledFormContentField>
          </StyledFormContentItem>
        </StyledFormContent>
        <StyledFormFooter>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={24}>
              <StyledFormBtn type="primary" ghost onClick={onCloseEditViewModel}>
                إلغاء
              </StyledFormBtn>
              {modeAddEditViewModel !== ModeComponent.view && (
                <StyledFormBtn type="primary" htmlType="submit">
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

export default AddEditViewTCE002Condition;


