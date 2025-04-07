'use client';
import React, { useEffect } from 'react';
import { Form, Row, Col, Select, Input, Button } from 'antd';
import styled from 'styled-components';
import {
  StyledModal,
  StyledForm,
  StyledFormHeader,
  StyledFormHeaderTitle,
  StyledFormContent,
  StyledFormContentItem,
  StyledFormContentField,
  StyledFormFooter,
  StyledFormBtn,
} from './index.styled';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { TypeEstablishmentEmployees } from '@core/types/enums/TypeEstablishmentEmployees';
import { useEstablishmentSettingsContext, useEstablishmentSettingsActionsContext } from '../../EstablishmentSettingsContextProvider';
import { ModeComponent } from '@core/types/models/core/models';
import { createEstablishmentEmployee, updateEstablishmentEmployee } from '@core/services/EstablishmentEmployeesService';

const AddEditEstablishmentEmployees = () => {
  const [form] = Form.useForm();
  const infoViewActionsContext = useInfoViewActionsContext();
  const { initialData, modeAddEditViewModel, openAddEditViewModel } = useEstablishmentSettingsContext();
  const { onCloseEditViewModel, reload } = useEstablishmentSettingsActionsContext();

  const typeLabels: Record<TypeEstablishmentEmployees, string> = {
    [TypeEstablishmentEmployees.EDUCATION_ADVISOR]: 'مستشار التربية',
    [TypeEstablishmentEmployees.OVERSEER]: 'الناظر',
    [TypeEstablishmentEmployees.EDUCATION_SUPERVISOR]: 'مشرف تربية',
    [TypeEstablishmentEmployees.DIRECTOR]: 'مدير المؤسسة',
  };

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData);
    } else {
      form.resetFields();
    }
  }, [initialData, form]);

  const onFinish = async (values) => {
    try {
      if (modeAddEditViewModel === ModeComponent.create) {
        createEstablishmentEmployee(values, infoViewActionsContext, () => {
          infoViewActionsContext.showMessage('تم حفظ الموظف بنجاح');
          reload();
          onCloseEditViewModel();
        }).catch((error) => {
          infoViewActionsContext.fetchError(error.message);
        });
      } else if (modeAddEditViewModel === ModeComponent.edit) {
        const employeeToUpdate = { ...values, id: initialData?.id };
        updateEstablishmentEmployee(employeeToUpdate, infoViewActionsContext, () => {
          infoViewActionsContext.showMessage('تم تعديل الموظف بنجاح');
          reload();
          onCloseEditViewModel();
        }).catch((error) => {
          infoViewActionsContext.fetchError(error.message);
        });
      }
    } catch (error) {
      const errorMessage =
        modeAddEditViewModel === ModeComponent.create
          ? 'لم يتم حفظ المعلومات بنجاح'
          : 'لم يتم تعديل المعلومات بنجاح';
      infoViewActionsContext.showMessage(errorMessage);
    }
  };


  return (
    <StyledModal
      footer={false}
      open={openAddEditViewModel}
      onCancel={onCloseEditViewModel}
      width={'75%'}
    >
      <StyledForm form={form} onFinish={onFinish}>
        <StyledFormHeader>
          <StyledFormHeaderTitle>
            {modeAddEditViewModel === ModeComponent.edit
              ? 'تعديل معلومات الموظف'
              : modeAddEditViewModel === ModeComponent.create
                ? 'إدخال معلومات الموظف'
                : 'عرض معلومات الموظف'}
          </StyledFormHeaderTitle>
        </StyledFormHeader>
        <StyledFormContent>
          <StyledFormContentItem>
            <StyledFormContentField>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="الاسم"
                    name="firstName"
                    rules={[{ required: true, message: 'الرجاء إدخال الاسم الأول!' }]}
                    labelCol={{ span: 8 }}
                    labelAlign="left"
                  >
                    <Input placeholder="الاسم الأول" disabled={modeAddEditViewModel === ModeComponent.view} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="اللقب"
                    name="lastName"
                    rules={[{ required: true, message: 'الرجاء إدخال الاسم الأخير!' }]}
                    labelCol={{ span: 8 }}
                    labelAlign="left"
                  >
                    <Input placeholder="الاسم الأخير" disabled={modeAddEditViewModel === ModeComponent.view} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="رقم الهاتف"
                    name="phoneNumber"
                    rules={[
                      { required: true, message: 'الرجاء إدخال رقم الهاتف!' },
                      {
                        pattern: /^0[0-9]{9}$/,
                        message: 'الرجاء إدخال رقم هاتف صحيح مكون من 10 أرقام ويبدأ بصفر!'
                      },
                    ]}
                    labelCol={{ span: 8 }}
                    labelAlign="left"
                  >
                    <Input placeholder="رقم الهاتف" disabled={modeAddEditViewModel === ModeComponent.view} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="الوظيفة"
                    name="type"
                    rules={[{ required: true, message: 'الرجاء اختيار الوظيفة!' }]}
                    labelCol={{ span: 8 }}
                    labelAlign="left"
                  >
                    <Select placeholder="اختر الوظيفة" disabled={modeAddEditViewModel === ModeComponent.view}>
                      {Object.values(TypeEstablishmentEmployees).map((type) => (
                        <Select.Option key={type} value={type}>
                          {typeLabels[type]}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="البريد الإلكتروني"
                    name="email"
                    rules={[
                      { required: true, message: 'الرجاء إدخال البريد الإلكتروني!' },
                      { type: 'email', message: 'الرجاء إدخال بريد إلكتروني صحيح!' },
                    ]}
                    labelCol={{ span: 8 }}
                    labelAlign="left"
                  >
                    <Input placeholder="البريد الإلكتروني" disabled={modeAddEditViewModel === ModeComponent.view} />
                  </Form.Item>
                </Col>
              </Row>
            </StyledFormContentField>
          </StyledFormContentItem>
        </StyledFormContent>
        <StyledFormFooter>
          {modeAddEditViewModel !== ModeComponent.view && (
            <StyledFormBtn type="primary" htmlType="submit">
              حفظ
            </StyledFormBtn>
          )}
          <StyledFormBtn type="default" onClick={onCloseEditViewModel}>
            إلغاء
          </StyledFormBtn>
        </StyledFormFooter>
      </StyledForm>
    </StyledModal>
  );

};

export default AddEditEstablishmentEmployees;
