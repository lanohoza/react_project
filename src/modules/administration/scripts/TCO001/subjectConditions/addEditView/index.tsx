'use client';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Form,
  Row,
  Col,
  Input,
  Select,
  Divider,
  InputNumber,
} from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { getAllShedCategories } from '@core/services/ShedCategoryService';
import {
  getAllShedSettingsByFilter,
  getAllShedSettingsForTce002Condition,
} from '@core/services/ShedSettingService';
import {
  getAdminSubjectsByType,
  getSubjectsByType,
} from '@core/services/SubjectService';
import {
  createTCE002Condition,
  deleteTCE002Condition,
  useGetAllTCE002Condition,
} from '@core/services/TCE002ConditionService';
import { TCE002ConditionOperate } from '@core/types/enums/TCE002ConditionOperate';
import { DiagnosticType } from '@core/types/enums/DiagnosticType';
import { SubjectShedSettingConditionDto } from '@core/types/models/subject/SubjectsTypes';
import { InfoViewActions } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { TCE002ConditionDto } from '@core/types/models/script/TCE002ConditionDto/TCE002ConditionTypes';
import { TypeEstablishment } from '@core/types/enums/TypeEtablissement';
import TCE002ConditionList from '../index';
import { ShedSettingMenuDto } from '@core/types/models/shedSetting/ShedSettingTypes';
import {
  StyledForm,
  StyledFormBtn,
  StyledFormContent,
  StyledFormContentField,
  StyledFormContentItem,
  StyledFormFooter,
  StyledFormHeader,
  StyledFormHeaderTitle,
  StyledModal,
} from './index.styled';
import { ModeComponent } from '@core/types/models/core/models';
import { StyledFormItem } from '@core/styles/createTechnicalCard/index.styled';
import {
  createTCO002SubjectConditions,
  updateTCO002SubjectConditions,
} from '@core/services/scripts/TCO002ScriptService';
import {
  useTCO002SubjectConditionContext,
  useTCO002SubjectConditionActionsContext,
} from '../TCO002SubjectConditionsContextProvider';
import {
  getAdminGuidanceSpecialitiesByEstablishmentType,
} from '@core/services/GuidanceSpecialityService';
import { Speciality } from '@core/types/models/speciality/LevelTypes';
import { Subject } from '../../../../../../@core/types/models/subject/SubjectsTypes';
import { getAllAdminLevels } from '@core/services/LevelService';
import { typeEstablishmentMap } from '@core/hooks/UrlHooks';

const { Option } = Select;



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
  const { onCloseEditViewModel, reload } =
    useTCO002SubjectConditionActionsContext();
  const { initialData, modeAddEditViewModel, openAddEditViewModel } =
    useTCO002SubjectConditionContext();
  const [selectedDiagnosticType, setSelectedDiagnosticType] =
    useState<DiagnosticType | null>(DiagnosticType.subject);
  const [shedSettings, setShedSettings] = useState<ShedSettingMenuDto[]>([]);
  const [subjectType, setSelectedCsubjectType] = useState<any | null>(null);
  const [subjects, setSubjects] = useState<SubjectShedSettingConditionDto[]>(
    [],
  );
  const [levels, setLevels] = useState<any[]>([]);

  const [guidanceSpecialities, setGuidanceSpecialities] = useState(
    [] as Speciality[],
  );
  const [subjectOperate, setSubjectOperate] = useState<any | null>(null);
  const [rateOperate, setRateOperate] = useState<any | null>(null);
  useEffect(() => {
    if (initialData) {
      setRateOperate(initialData.rateOperate);
      setSubjectOperate(initialData.operate);
      form.setFieldsValue({ ...initialData });
    }
  }, [initialData]);

  useEffect(() => {
    const fetchCategories = async () => {
      const filter = { target: selectedDiagnosticType };

      getAllShedSettingsByFilter(filter, infoViewActionsContext)
        .then((shedCategorieDtos) => {
          setShedSettings(shedCategorieDtos);
        })
        .catch(() => {
          infoViewActionsContext.fetchError(
            'حدثت مشكلة , يرجى إعادة المحاولة لاحقا',
          );
        });
      getAllAdminLevels(infoViewActionsContext)
        .then((levelDtos) => {
          setLevels(levelDtos);
        })
        .catch(() => {
          infoViewActionsContext.fetchError(
            'حدثت مشكلة , يرجى إعادة المحاولة لاحقا',
          );
        });
    };
    fetchCategories();
  }, []);

  const onSelcetLevel = (idLevel: any) => {
    form.setFieldsValue({ idGuidanceSpeciality: undefined });
    form.setFieldsValue({ idSubject: undefined });
    const level = levels.find((level) => level.id == idLevel);
    if (level) {
      getAdminGuidanceSpecialitiesByEstablishmentType(
        level.type,
        infoViewActionsContext,
      )
        .then((guidanceSpecialitieDtos) => {
          setGuidanceSpecialities(guidanceSpecialitieDtos);
        })
        .catch(() => {
          infoViewActionsContext.fetchError(
            'حدثت مشكلة , يرجى إعادة المحاولة لاحقا',
          );
        });

      getAdminSubjectsByType(level.type, infoViewActionsContext)
        .then((subjectDtos) => {
          setSubjects(subjectDtos);
        })
        .catch(() => {
          infoViewActionsContext.fetchError(
            'حدثت مشكلة , يرجى إعادة المحاولة لاحقا',
          );
        });
    }
  };

  const onFinish = async (values: any) => {
    const dto: any = {
      id: initialData ? initialData.id : null,
      average: values.average,
      number: values.number,
      operate: values.operate,
      idShedSetting: values.idShedSetting,
      idSubject: values.idSubject,
      rate: values.rate,
      idGuidanceSpeciality: values.idGuidanceSpeciality,
      rateMax: values.rateMax,
      rateOperate: values.rateOperate,
      averageMax: values.averageMax,
    };

    if (modeAddEditViewModel == ModeComponent.create) {
      createTCO002SubjectConditions(dto, infoViewActionsContext)
        .then(() => {
          infoViewActionsContext.showMessage('تم الحفظ بنجاح');
          reload();
          onCloseEditViewModel();
        })
        .catch(() => {
          infoViewActionsContext.fetchError(
            'حدثت مشكلة , يرجى إعادة المحاولة لاحقا',
          );
        });
    } else {
      updateTCO002SubjectConditions(dto.id, dto, infoViewActionsContext)
        .then(() => {
          infoViewActionsContext.showMessage('تم الحفظ بنجاح');
          reload();
          onCloseEditViewModel();
        })
        .catch(() => {
          infoViewActionsContext.fetchError(
            'حدثت مشكلة , يرجى إعادة المحاولة لاحقا',
          );
        });
    }
  };

  return (
    <StyledModal
      footer={false}
      open={openAddEditViewModel}
      onCancel={onCloseEditViewModel}
      width='80%'
    >
      <StyledForm form={form} onFinish={onFinish}>
        <StyledFormHeader>
          <StyledFormHeaderTitle>
            {modeAddEditViewModel === ModeComponent.create
              ? 'إنشاء شروط التشخيص المادة'
              : modeAddEditViewModel === ModeComponent.edit
                ? 'تعديل شروط التشخيص المادة'
                : 'عرض شروط التشخيص المادة'}
          </StyledFormHeaderTitle>
        </StyledFormHeader>
        <StyledFormContent>
          <StyledFormContentItem>
            <StyledFormContentField>
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={12}>
                  <StyledFormItem
                    name='idLevel'
                    label='المستوى'
                    rules={[
                      { required: true, message: 'الرجاء اختيار المستوى' },
                    ]}
                    labelCol={{ span: 8 }}
                    labelAlign='left'
                  >
                    <Select
                      disabled={modeAddEditViewModel === ModeComponent.view}
                      placeholder='اختر المستوى '
                      onSelect={(level) => {
                        onSelcetLevel(level);
                      }}
                    >
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
                    name='idSubject'
                    label='المادة'
                    rules={[
                      { required: true, message: 'الرجاء اختيار المادة' },
                    ]}
                    labelCol={{ span: 8 }}
                    labelAlign='left'
                  >
                    <Select
                      disabled={modeAddEditViewModel === ModeComponent.view}
                      placeholder='اختر المادة '
                    >
                      {subjects.map((subject) => (
                        <Option key={subject.id} value={subject.id}>
                          {subject.title}
                        </Option>
                      ))}
                    </Select>
                  </StyledFormItem>
                </Col>
                <Col span={12}>
                  <StyledFormItem
                    name='operate'
                    label='عملية الشرط'
                    rules={[
                      { required: true, message: 'الرجاء اختيار عملية الشرط' },
                    ]}
                    labelCol={{ span: 8 }}
                    labelAlign='left'
                  >
                    <Select
                      placeholder='اختر عملية الشرط'
                      disabled={modeAddEditViewModel === ModeComponent.view}
                      onChange={(value) => setSubjectOperate(value)}
                    >
                      {Object.entries(conditionOperateMap).map(
                        ([key, label]) => (
                          <Option key={key} value={key}>
                            {label}
                          </Option>
                        ),
                      )}
                    </Select>
                  </StyledFormItem>
                </Col>
                <Col span={12}>
                  <StyledFormItem
                    name='average'
                    label='معدل المادة '
                    rules={[
                      { required: true, message: 'الرجاء اختيار المادة' },
                    ]}
                    labelCol={{ span: 8 }}
                    labelAlign='left'
                  >
                    <InputNumber
                      placeholder=' معدل المادة'
                      style={{ width: '100%' }}
                      disabled={modeAddEditViewModel === ModeComponent.view}
                    />
                  </StyledFormItem>
                </Col>
                {subjectOperate == 'btwEqual' && (
                  <Col span={12}>
                    <StyledFormItem
                      name='averageMax'
                      label='معدل م التوجيه الاقصى'
                      rules={[
                        {
                          required: true,
                          message: ' الرجاء اختيار  معدل م التوجيه الاقصى',
                        },
                      ]}
                      labelCol={{ span: 8 }}
                      labelAlign='left'
                    >
                      <InputNumber
                        placeholder=' معدل م التوجيه الاقصى'
                        style={{ width: '100%' }}
                        disabled={modeAddEditViewModel === ModeComponent.view}
                      />
                    </StyledFormItem>
                  </Col>
                )}
              </Row>
              <Divider style={{ background: '#e5e4e4' }}></Divider>
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={12}>
                  <StyledFormItem
                    name='idGuidanceSpeciality'
                    label='شعبة الرغبة'
                    rules={[
                      { required: true, message: 'الرجاء اختيار مظهر التشخيص' },
                    ]}
                    labelCol={{ span: 8 }}
                    labelAlign='left'
                  >
                    <Select
                      disabled={modeAddEditViewModel === ModeComponent.view}
                      placeholder='اختر مظهر التشخيص'
                    >
                      {guidanceSpecialities.map((guidanceSpeciality) => (
                        <Option
                          key={guidanceSpeciality.id}
                          value={guidanceSpeciality.id}
                        >
                          {guidanceSpeciality.title}
                        </Option>
                      ))}
                    </Select>
                  </StyledFormItem>
                </Col>

                <Col span={12}>
                  <StyledFormItem
                    name='number'
                    label='رقم الرغبة'
                    rules={[
                      { required: true, message: 'الرجاء اختيار رقم الرغبة' },
                    ]}
                    labelCol={{ span: 8 }}
                    labelAlign='left'
                  >
                    <InputNumber
                      placeholder='رقم الرغبة'
                      style={{ width: '100%' }}
                      disabled={modeAddEditViewModel === ModeComponent.view}
                    />
                  </StyledFormItem>
                </Col>
                <Col span={8}></Col>
              </Row>
              <Divider style={{ background: '#e5e4e4' }}></Divider>

              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={12}>
                  <StyledFormItem
                    name='idShedSetting'
                    label='مظهر التشخيص'
                    rules={[
                      { required: true, message: 'الرجاء اختيار مظهر التشخيص' },
                    ]}
                    labelCol={{ span: 8 }}
                    labelAlign='left'
                  >
                    <Select
                      disabled={modeAddEditViewModel === ModeComponent.view}
                      placeholder='اختر مظهر التشخيص'
                    >
                      {shedSettings.map((setting) => (
                        <Option key={setting.id} value={setting.id}>
                          {setting.syndromeDiagnostic}
                        </Option>
                      ))}
                    </Select>
                  </StyledFormItem>
                </Col>
              
                <Col span={12}>
                  <StyledFormItem
                    name='rateOperate'
                    label='نوع الشرط'
                    rules={[
                      {
                        required: subjectType != 'empty',
                        message: 'الرجاء اختيار نوع الشرط',
                      },
                    ]}
                    labelCol={{ span: 8 }}
                    labelAlign='left'
                  >
                    <Select
                      placeholder='اختر نوع الشرط'
                      disabled={modeAddEditViewModel === ModeComponent.view}
                      onChange={(value) => setRateOperate(value)}
                    >
                      {Object.entries(conditionOperateMap).map(
                        ([key, label]) => (
                          <Option key={key} value={key}>
                            {label}
                          </Option>
                        ),
                      )}
                    </Select>
                  </StyledFormItem>
                </Col>
                <Col span={12}>
                  <StyledFormItem
                    name='rate'
                    label='النسبة'
                    rules={[{ required: true, message: 'الرجاءالنسبة' }]}
                    labelCol={{ span: 8 }}
                    labelAlign='left'
                  >
                    <InputNumber
                      placeholder=' النسبة '
                      style={{ width: '100%' }}
                      disabled={modeAddEditViewModel === ModeComponent.view}
                    />
                  </StyledFormItem>
                </Col>
                {rateOperate == 'btwEqual' && (
                  <Col span={12}>
                    <StyledFormItem
                      name='rateMax'
                      label='النسبة الاقصى'
                      rules={[
                        {
                          required: true,
                          message: ' الرجاء اختيار  النسبة الاقصى',
                        },
                      ]}
                      labelCol={{ span: 8 }}
                      labelAlign='left'
                    >
                      <InputNumber
                        placeholder=' النسبة الاقصى'
                        style={{ width: '100%' }}
                        disabled={modeAddEditViewModel === ModeComponent.view}
                      />
                    </StyledFormItem>
                  </Col>
                )}
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

export default AddEditViewTCE002Condition;
