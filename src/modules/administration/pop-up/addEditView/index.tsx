'use client';
import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Input, Spin } from 'antd';
import styled from 'styled-components';
import { StyledModal, StyledFormContent, StyledFormContentItem, StyledForm, StyledFormHeader, StyledFormHeaderTitle, StyledFormContentField, StyledFormFooter, StyledFormBtn } from './index.styled';
import { StyledFormItem } from '@core/styles/createTechnicalCard/index.styled';
import { ModeComponent } from '@core/types/models/core/models';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { createPopUp } from '@core/services/PopUpService';
import { usePopUpActionsContext, usePopUpContext } from '../PopUpContextProvider';

const StyledScrollableContainer = styled.div`
  margin: 0 auto;
  padding: 10px;
  width: 100%;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  background-color: #f5f5f5;
`;

const AddEditViewPopUp = () => {
  const { onCloseEditViewModel, reload } = usePopUpActionsContext();
  const { initialData, modeAddEditViewModel, openAddEditViewModel } = usePopUpContext();
  const [form] = Form.useForm();
  const infoViewActionsContext = useInfoViewActionsContext();
  const [publish, setPublish] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({ ...initialData });
      setPublish(initialData?.publish);
      form.setFieldsValue({
        publish: initialData?.publish,
      });
    }
  }, [initialData]);

  const onFinish = async (values) => {
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    const file = fileInput?.files?.[0] || null;

    const popUpDto = {
      ...initialData,
      id: initialData?.id,
      title: values.title,
      description: values.description,
      sourceUrl: values.sourceUrl,
      targetUrl: values.targetUrl,
      publish: modeAddEditViewModel === ModeComponent.create ? false : publish,
    };

    try {
      setLoading(true);  // Start loading
      await createPopUp(popUpDto, file);
      const successMessage =
        modeAddEditViewModel === ModeComponent.create
          ? 'تم حفظ الإعلان بنجاح'
          : 'تم تعديل الإعلان بنجاح';
      infoViewActionsContext.showMessage(successMessage);
      reload();
      onCloseEditViewModel();
    } catch (error) {
      const errorMessage =
        modeAddEditViewModel === ModeComponent.create
          ? 'لم يتم حفظ الإعلان بنجاح'
          : 'لم يتم تعديل الإعلان بنجاح';
      infoViewActionsContext.fetchError(errorMessage);
      console.error("Error saving pop up:", error);
    } finally {
      setLoading(false);  // Stop loading
    }
  };

  return (
    <StyledModal footer={false} open={openAddEditViewModel} onCancel={onCloseEditViewModel} width={'75%'}>
      <StyledForm form={form} onFinish={onFinish}>
        <StyledFormHeader>
          <StyledFormHeaderTitle>
            {modeAddEditViewModel === ModeComponent.create
              ? 'إنشاء الإعلان'
              : modeAddEditViewModel === ModeComponent.edit
                ? 'تعديل الإعلان'
                : 'عرض الإعلان'}
          </StyledFormHeaderTitle>
        </StyledFormHeader>
        <StyledFormContent>
          <StyledFormContentItem>
            <StyledFormContentField>
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={12}>
                  <StyledFormItem
                    label="العنوان"
                    name="title"
                    labelAlign="left"
                    rules={[{ required: true, message: 'الرجاء العنوان!' }]}
                    labelCol={{ span: 8 }}>
                    <Input placeholder="الرجاء إدخال العنوان" disabled={modeAddEditViewModel === ModeComponent.view} />
                  </StyledFormItem>

                  <StyledFormItem
                    label="الرابط المستهدف"
                    name="targetUrl"
                    labelAlign="left"
                    labelCol={{ span: 8 }}>
                    <Input placeholder="الرجاء إدخال الرابط المستهدف" disabled={modeAddEditViewModel === ModeComponent.view} />
                  </StyledFormItem>

                  <StyledFormItem
                    label="الوصف"
                    name="description"
                    labelAlign="left"
                    rules={[{ required: true, message: 'الرجاء إدخال الوصف!' }]}
                    labelCol={{ span: 8 }}>
                    <Input.TextArea placeholder="الرجاء إدخال الوصف" rows={4} disabled={modeAddEditViewModel === ModeComponent.view} />
                  </StyledFormItem>
                </Col>
                <Col span={12}>
                  <StyledFormItem label="صورة الإعلان" name="sourceUrl" labelAlign="left" labelCol={{ span: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <input
                        type="file"
                        id="file-input"
                        style={{ display: 'none' }}
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            const file = e.target.files[0];
                            const reader = new FileReader();

                            reader.onload = (event) => {
                              const imgElement = document.getElementById('selected-image') as HTMLImageElement;
                              if (imgElement && event.target?.result) {
                                imgElement.src = event.target.result as string;
                              }
                            };

                            reader.readAsDataURL(file);

                            form.setFieldsValue({ sourceUrl: file.name });
                          }
                        }}
                      />
                      <img
                        id="selected-image"
                        src={`data:image/jpeg;base64,${initialData?.image}` || "https://cdn4.iconfinder.com/data/icons/image/156/Image-02-512.png"}
                        alt="إختر صورة"
                        style={{
                          maxWidth: 200,
                          maxHeight: 200,
                          display: 'block',
                          border: '1px solid #d9d9d9',
                          borderRadius: 8,
                          padding: 4,
                          cursor: 'pointer',
                        }}
                        onClick={() => document.getElementById('file-input')?.click()}
                      />
                    </div>
                  </StyledFormItem>
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
      {loading && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Spin size="large" />
        </div>
      )}
    </StyledModal>
  );
};

export default AddEditViewPopUp;
