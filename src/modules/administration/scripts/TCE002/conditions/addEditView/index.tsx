'use client';
import React, { useEffect, useState } from 'react';
import { Button, Form, Row, Col, Input, Select, Divider } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { getAllShedCategories } from '@core/services/ShedCategoryService';
import { getAllShedSettingsForTce002Condition } from '@core/services/ShedSettingService';
import { getAdminSubjectsByType, getSubjectsByType } from '@core/services/SubjectService';
import { createTCE002Condition, deleteTCE002Condition, useGetAllTCE002Condition } from '@core/services/TCE002ConditionService';
import { TCE002ConditionOperate } from '@core/types/enums/TCE002ConditionOperate';
import { DiagnosticType } from '@core/types/enums/DiagnosticType';
import { SubjectShedSettingConditionDto } from '@core/types/models/subject/SubjectsTypes';
import { InfoViewActions } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { TCE002ConditionDto } from '@core/types/models/script/TCE002ConditionDto/TCE002ConditionTypes';
import { TypeEstablishment } from '@core/types/enums/TypeEtablissement';
import { useTCE002ConditionActionsContext, useTCE002ConditionContext } from '../TCE002ConditionContextProvider';
import TCE002ConditionList from '../index';
import { ShedSettingMenuDto } from '@core/types/models/shedSetting/ShedSettingTypes';
import { StyledForm, StyledFormBtn, StyledFormContent, StyledFormContentField, StyledFormContentItem, StyledFormFooter, StyledFormHeader, StyledFormHeaderTitle, StyledModal } from './index.styled';
import { ModeComponent } from '@core/types/models/core/models';
import { StyledFormItem } from '@core/styles/createTechnicalCard/index.styled';
import { getAllAdminLevels } from '@core/services/LevelService';
import { typeEstablishmentMap } from '@core/hooks/UrlHooks';

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
  const { onCloseEditViewModel, reload } = useTCE002ConditionActionsContext();
  const { initialData, modeAddEditViewModel, openAddEditViewModel } = useTCE002ConditionContext();
  const [shedCategories, setShedCategories] = useState<any[]>([]);
  const [selectedDiagnosticType, setSelectedDiagnosticType] = useState<DiagnosticType | null>(null);
  const [selectedShedCategory, setSelectedShedCategory] = useState<number | null>(null);
  const [shedSettings, setShedSettings] = useState<ShedSettingMenuDto[]>([]);
  const [subjects, setSubjects] = useState<SubjectShedSettingConditionDto[]>([]);
  const [selectedConditionOperate, setSelectedConditionOperate] = useState<TCE002ConditionOperate | null>(null);
  const [referenceDisabled, setReferenceDisabled] = useState(false);
  const [levels, setLevels] = useState<any[]>([]);


  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({ ...initialData });
    }
    if (modeAddEditViewModel === ModeComponent.edit || modeAddEditViewModel === ModeComponent.view) {
      setSelectedConditionOperate(initialData.operate);
      setSelectedDiagnosticType(initialData.target);
      setSelectedShedCategory(initialData.idShedSettingCategory);
    }
  }, [initialData, form]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getAllShedCategories(infoViewActionsContext);
        setShedCategories(categories);
      } catch (error) {
        console.error("Error fetching shed categories", error);
        infoViewActionsContext.fetchError("حدثت مشكلة , يرجى إعادة المحاولة لاحقا");
      }
    };
    fetchCategories();

    getAllAdminLevels(infoViewActionsContext)
      .then((levelDtos) => {
        setLevels(levelDtos);
        const level = levelDtos.find(
          (level) => level.id == initialData?.idLevel,
        );
        if (level) loadData(level);
      })
      .catch(() => {
        infoViewActionsContext.fetchError(
          'حدثت مشكلة , يرجى إعادة المحاولة لاحقا',
        );
      });
  }, []);

  useEffect(() => {
    const fetchShedSettings = async () => {
      if (selectedDiagnosticType && selectedShedCategory) {
        try {
          const settings = await getAllShedSettingsForTce002Condition(selectedDiagnosticType, selectedShedCategory, infoViewActionsContext);
          setShedSettings(settings);
        } catch (error) {
          console.error("Error fetching shed settings", error);
          infoViewActionsContext.fetchError("حدثت مشكلة , يرجى إعادة المحاولة لاحقا");
        }
      }
    };
    fetchShedSettings();
  }, [selectedDiagnosticType, selectedShedCategory]);


  const setSelectIdLevel = (idLevel: any) => {
    const level = levels.find((level) => level.id == idLevel);
    form.setFieldsValue({ subjectIds: undefined });
    if (level) {
      loadData(level);
    }
  };

  const loadData = (level: any) => {


    getAdminSubjectsByType(level.type, infoViewActionsContext)
      .then((subjectDtos) => {
        setSubjects(subjectDtos);
      })
      .catch(() => {
        infoViewActionsContext.fetchError(
          'حدثت مشكلة  getAdminSubjectsByType, يرجى إعادة المحاولة لاحقا',
        );
      });
  };

  const onFinish = async (values: any) => {
    const dto: TCE002ConditionDto = {
      id: initialData ? initialData.id : null,
      average: values.average,
      averageMax: values.operate === TCE002ConditionOperate.btwEqual ? values.averageMax : 0,
      operate: values.operate,
      idLevel:values.idLevel,
      idShedSetting: values.idShedSetting,
      target: values.target,
      subjectIds: values.subjectIds,
    };

    try {
      await createTCE002Condition(dto, infoViewActionsContext, () => {
        infoViewActionsContext.showMessage('تم الحفظ بنجاح');
        // setShowForm(false);
        reload();
        onCloseEditViewModel();
      });
    } catch (error) {
      infoViewActionsContext.fetchError("حدثت مشكلة , يرجى إعادة المحاولة لاحقا");
      console.error("Error saving condition:", error);
    }
  };

  const handleDeleteCondition = async (conditionId: number) => {
    try {
      await deleteTCE002Condition(conditionId, infoViewActionsContext, () => {
        infoViewActionsContext.showMessage('تم الحذف بنجاح');
      });
    } catch (error) {
      infoViewActionsContext.fetchError("حدثت مشكلة , يرجى إعادة المحاولة لاحقا");
      console.error("Error deleting condition:", error);
    }
  };

  return (
    <StyledModal footer={false} open={openAddEditViewModel} onCancel={onCloseEditViewModel} width="75%">
      <StyledForm form={form} onFinish={onFinish}>
        <StyledFormHeader>
          <StyledFormHeaderTitle>
            {modeAddEditViewModel === ModeComponent.create
              ? 'إنشاء شروط التشخيص'
              : modeAddEditViewModel === ModeComponent.edit
                ? 'تعديل شروط التشخيص'
                : 'عرض شروط التشخيص'}
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
                        setSelectIdLevel(level);
                      }}
                    >
                      {levels.map((level) => (
                        <Option key={level.id} value={level.id}>
                          {level.title} {typeEstablishmentMap[level.type]}
                        </Option>
                      ))}
                    </Select>
                  </StyledFormItem>
             
                  <StyledFormItem
                    name="target"
                    label="الهدف"
                    rules={[{ required: true, message: 'الرجاء اختيار الهدف التشخيصي' }]}
                    labelCol={{ span: 8 }}
                    labelAlign="left"
                  >
                    <Select disabled={modeAddEditViewModel === ModeComponent.view} placeholder="اختر الهدف" onChange={(value: DiagnosticType) => setSelectedDiagnosticType(value)}>
                      {Object.entries(diagnosticTypeMap).map(([key, arabicLabel]) => (
                        <Option key={key} value={key}>
                          {arabicLabel}
                        </Option>
                      ))}
                    </Select>
                  </StyledFormItem>

                  <StyledFormItem
                    name="idShedSettingCategory"
                    label="الفئة"
                    rules={[{ required: true, message: 'الرجاء اختيار الفئة' }]}
                    labelCol={{ span: 8 }}
                    labelAlign="left"
                  >
                    <Select disabled={modeAddEditViewModel === ModeComponent.view} placeholder="اختر الفئة" onChange={(value: number) => {
                      setSelectedShedCategory(value);
                      const selectedCategory = shedCategories.find((cat) => cat.id === value);
                      if (selectedCategory) {
                        form.setFieldsValue({ reference: selectedCategory.code });
                        setReferenceDisabled(true);
                      }
                    }}>
                      {shedCategories.map((cat) => (
                        <Option key={cat.id} value={cat.id}>
                          {cat.name}
                        </Option>
                      ))}
                    </Select>
                  </StyledFormItem>
                  <StyledFormItem
                    name="idShedSetting"
                    label="مظهر التشخيص"
                    rules={[{ required: true, message: 'الرجاء اختيار مظهر التشخيص' }]}
                    labelCol={{ span: 8 }}
                    labelAlign="left"
                  >
                    <Select disabled={modeAddEditViewModel === ModeComponent.view} placeholder="اختر مظهر التشخيص">
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
                    name="subjectIds"
                    label="المواد الدراسية"
                    rules={[{ required: true, message: 'الرجاء اختيار المواد الدراسية' }]}
                    labelCol={{ span: 8 }}
                    labelAlign="left"
                  >
                    <Select mode="multiple" disabled={modeAddEditViewModel === ModeComponent.view} placeholder="اختر المواد الدراسية">
                      {subjects.map((sub) => (
                        <Option key={sub.id} value={sub.id}>
                          {sub.title}
                        </Option>
                      ))}
                    </Select>
                  </StyledFormItem>

                  <StyledFormItem
                    name="operate"
                    label="عملية الشرط"
                    rules={[{ required: true, message: 'الرجاء اختيار عملية الشرط' }]}
                    labelCol={{ span: 8 }}
                    labelAlign="left"
                  >
                    <Select placeholder="اختر عملية الشرط"
                      disabled={modeAddEditViewModel === ModeComponent.view}
                      onChange={(value: TCE002ConditionOperate) => setSelectedConditionOperate(value)}>
                      {Object.entries(conditionOperateMap).map(([key, label]) => (
                        <Option key={key} value={key}>
                          {label}
                        </Option>
                      ))}
                    </Select>
                  </StyledFormItem>

                  {selectedConditionOperate && selectedConditionOperate !== TCE002ConditionOperate.btwEqual && (

                    <StyledFormItem
                      name="average"
                      label="القيمة"
                      rules={[{ required: true, message: 'الرجاء إدخال قيمة الشرط' }]}
                      labelCol={{ span: 8 }}
                      labelAlign="left"
                    >
                      <Input placeholder="ادخل القيمة" disabled={modeAddEditViewModel === ModeComponent.view} />
                    </StyledFormItem>

                  )}
                  {selectedConditionOperate === TCE002ConditionOperate.btwEqual && (
                    <>

                      <StyledFormItem
                        name="average"
                        label="القيمة الصغرى"
                        rules={[{ required: true, message: 'الرجاء إدخال القيمة الدنيا' }]}
                        labelCol={{ span: 8 }}
                        labelAlign="left"
                      >
                        <Input placeholder="القيمة الصغرى" disabled={modeAddEditViewModel === ModeComponent.view} />
                      </StyledFormItem>

                      <StyledFormItem
                        name="averageMax"
                        label="القيمة الكبرى"
                        rules={[
                          { required: true, message: 'الرجاء إدخال القيمة العليا' },
                          {
                            validator: (_, value) => {
                              const lower = form.getFieldValue('average');
                              if (Number(value) > Number(lower)) {
                                return Promise.resolve();
                              }
                              return Promise.reject(new Error('يجب أن تكون القيمة العليا أكبر من القيمة الدنيا'));
                            },
                          },
                        ]}
                        labelCol={{ span: 8 }}
                        labelAlign="left"
                      >
                        <Input placeholder="القيمة الكبرى" disabled={modeAddEditViewModel === ModeComponent.view} />
                      </StyledFormItem>

                    </>
                  )}
                </Col>
              </Row>
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
