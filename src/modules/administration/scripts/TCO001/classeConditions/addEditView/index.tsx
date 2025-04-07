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
import {
  getAllShedSettingsByFilter,
  getAllShedSettingsForTce002Condition,
} from '@core/services/ShedSettingService';
import { DiagnosticType } from '@core/types/enums/DiagnosticType';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
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
  useTCO002ClasseConditionActionsContext,
  useTCO002ClasseConditionContext,
} from '../TCO002ClasseConditionsContextProvider';
import {
  createTCO002ClasseConditions,
  updateTCO002ClasseConditions,
} from '@core/services/scripts/TCO002ScriptService';

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
    useTCO002ClasseConditionActionsContext();
  const { initialData, modeAddEditViewModel, openAddEditViewModel } =
    useTCO002ClasseConditionContext();
  const [selectedDiagnosticType, setSelectedDiagnosticType] =
    useState<DiagnosticType | null>(DiagnosticType.classe);
  const [shedSettings, setShedSettings] = useState<ShedSettingMenuDto[]>([]);
  const [subjectType, setSelectedCsubjectType] = useState<any | null>(null);
  const [guidanceOperate, setGuidanceOperate] = useState<any | null>(null);
  const [subjectOperate, setSubjectOperate] = useState<any | null>(null);
  const [rateOperate, setRateOperate] = useState<any | null>(null);

  useEffect(() => {
    if (initialData) {
      setRateOperate(initialData.rateOperate);
      setSubjectOperate(initialData.subjectOperate);
      setGuidanceOperate(initialData.guidanceOperate);
      setSelectedCsubjectType(initialData.subjectType);
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
    };
    fetchCategories();
  }, []);
  

  const onFinish = async (values: any) => {
    const dto: any = {
      id: initialData ? initialData.id : null,
      average: values.average,
      number: values.number,
      rank: values.rank,
      subjectOperate: values.subjectOperate,
      guidanceOperate: values.guidanceOperate,
      idShedSetting: values.idShedSetting,
      subjectType: values.subjectType,
      rate: values.rate,
      subjectAverage: values.subjectAverage,
      averageMax: values.averageMax,
      subjectAverageMax: values.subjectAverageMax,
      rateMax: values.rateMax,
      rateOperate: values.rateOperate,
    };

    if (modeAddEditViewModel == ModeComponent.create) {
      createTCO002ClasseConditions(dto, infoViewActionsContext)
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
      updateTCO002ClasseConditions(dto.id, dto, infoViewActionsContext)
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
              ? 'إنشاء شروط التشخيص القسم'
              : modeAddEditViewModel === ModeComponent.edit
                ? 'تعديل شروط التشخيص القسم'
                : 'عرض شروط التشخيص القسم'}
          </StyledFormHeaderTitle>
        </StyledFormHeader>
        <StyledFormContent>
          <StyledFormContentItem>
            <StyledFormContentField>
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
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
                <Col span={12}>
                  <StyledFormItem
                    name='guidanceOperate'
                    label='نوع الشرط'
                    rules={[
                      { required: true, message: 'الرجاء اختيار نوع الشرط' },
                    ]}
                    labelCol={{ span: 8 }}
                    labelAlign='left'
                  >
                    <Select
                      placeholder='اختر نوع الشرط'
                      onChange={(value) => setGuidanceOperate(value)}
                      disabled={modeAddEditViewModel === ModeComponent.view}
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
                    label='معدل م التوجيه'
                    rules={[
                      {
                        required: true,
                        message: 'الرجاء اختيار  معدل م التوجيه ',
                      },
                    ]}
                    labelCol={{ span: 8 }}
                    labelAlign='left'
                  >
                    <InputNumber
                      placeholder='معدل م التوجيه'
                      style={{ width: '100%' }}
                      disabled={modeAddEditViewModel === ModeComponent.view}
                    />
                  </StyledFormItem>
                </Col>
                {guidanceOperate == 'btwEqual' && (
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
                  <Form.Item
                    className='form-field'
                    labelAlign={'left'}
                    labelCol={{ span: 8 }}
                    name='subjectType'
                    label='نوع الشرط المواد'
                  >
                    <Select
                      disabled={modeAddEditViewModel === ModeComponent.view}
                      onChange={(value: any) => setSelectedCsubjectType(value)}
                    >
                      <Option value={'empty'}> بدون شرط </Option>
                      <Option value={'one'}> واحدة على الاقل </Option>

                      <Option value={'all'}>جميع المواد </Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              {subjectType != 'empty' && (
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  <Col span={12}>
                    <StyledFormItem
                      name='subjectOperate'
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
                        disabled={
                          modeAddEditViewModel === ModeComponent.view ||
                          subjectType == 'empty'
                        }
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
                      name='subjectAverage'
                      label='المعدل'
                      rules={[
                        {
                          required: subjectType != 'empty',
                          message: 'الرجاء اختيار  المعدل ',
                        },
                      ]}
                      labelCol={{ span: 8 }}
                      labelAlign='left'
                    >
                      <InputNumber
                        placeholder='المعدل'
                        style={{ width: '100%' }}
                        disabled={
                          modeAddEditViewModel === ModeComponent.view ||
                          subjectType == 'empty'
                        }
                      />
                    </StyledFormItem>
                  </Col>
                  {subjectOperate == 'btwEqual' && (
                    <Col span={12}>
                      <StyledFormItem
                        name='subjectAverageMax'
                        label='المعدل الاقصى'
                        rules={[
                          {
                            required: true,
                            message: ' الرجاء اختيار  المعدل الاقصى',
                          },
                        ]}
                        labelCol={{ span: 8 }}
                        labelAlign='left'
                      >
                        <InputNumber
                          placeholder=' المعدل الاقصى'
                          style={{ width: '100%' }}
                          disabled={modeAddEditViewModel === ModeComponent.view}
                        />
                      </StyledFormItem>
                    </Col>
                  )}
                </Row>
              )}

              <Divider style={{ background: '#e5e4e4' }}></Divider>
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={12}>
                  <StyledFormItem
                    name='rank'
                    label=' رتبة معدل مجموعة التوجيه '
                    rules={[
                      {
                        required: true,
                        message: 'الرجاء اختيار  رتبة معدل مجموعة التوجيه',
                      },
                    ]}
                    labelCol={{ span: 8 }}
                    labelAlign='left'
                  >
                    <InputNumber
                      placeholder=' رتبة معدل مجموعة التوجيه  '
                      style={{ width: '100%' }}
                      disabled={modeAddEditViewModel === ModeComponent.view}
                    />
                  </StyledFormItem>
                </Col>

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
              </Row>
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
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
