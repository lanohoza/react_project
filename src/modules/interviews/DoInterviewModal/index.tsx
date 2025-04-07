'use client';
import React, { useEffect, useState } from 'react';

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
import { Level } from '@core/types/models/level/LevelTypes';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Steps,
  message,
  notification,
} from 'antd';

import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { ModeComponent } from '@core/types/models/core/models';
import {
  useInterviewActionsContext,
  useInterviewContext,
} from '../InterviewsContextProvider';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { DoInterviewDto } from '@core/types/models/interview/InterviewTypes';
import { doInterview } from '@core/services/InterviewService';

const ChangeClassStudent = () => {
  const infoViewActionsContext = useInfoViewActionsContext();
  const { openDoInterviewModel, selectedDoInterview } = useInterviewContext();
  const { closeDoInterviewModel, reload } = useInterviewActionsContext();
  const router = useRouter();
  const onFinish = (values: any) => {
    //const day = dayjs(values.interviewDate)
    //console.log(day.date);
    const doInterviewDto = {
      idInterview: selectedDoInterview.id,
      interviewDate: dayjs(values.interviewDate).format('YYYY-MM-DD'),
    } as DoInterviewDto;

    doInterview(doInterviewDto, infoViewActionsContext).then(() => {
      notification.success({ message: ' تمت العملية بنجاح' });
      reload();
      closeDoInterviewModel();
    });
  };
  return (
    <>
      <StyledModal
        footer={false}
        open={openDoInterviewModel}
        width={'35%'}
        onCancel={() => {
          closeDoInterviewModel();
        }}
      >
        <StyledForm onFinish={onFinish}>
          <StyledFormHeader>
            <StyledFormHeaderTitle> إجراء مقابلة</StyledFormHeaderTitle>
          </StyledFormHeader>
          <StyledFormContent>
            <StyledFormContentItem>
              <StyledFormContentField>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      className='form-field'
                      labelAlign={'left'}
                      labelCol={{ span: 8 }}
                      label='رقم المقابلة'
                      rules={[{ required: true }]}
                    >
                      <Input
                        disabled
                        defaultValue={selectedDoInterview.number}
                      ></Input>
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      className='form-field'
                      labelAlign={'left'}
                      labelCol={{ span: 8 }}
                      label='الفئة المستهدفة'
                      rules={[{ required: true }]}
                    >
                      <Input
                        disabled
                        defaultValue={selectedDoInterview.target}
                      ></Input>
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      className='form-field'
                      labelAlign={'left'}
                      labelCol={{ span: 8 }}
                      name='interviewDate'
                      label='تاريخ إجراء المقابلة'
                      rules={[{ required: true }]}
                    >
                      <DatePicker></DatePicker>
                    </Form.Item>
                  </Col>
                </Row>
              </StyledFormContentField>
            </StyledFormContentItem>
          </StyledFormContent>
          <StyledFormFooter>
            <StyledFormBtn type='primary' htmlType='submit'>
              حفظ
            </StyledFormBtn>
          </StyledFormFooter>
        </StyledForm>
      </StyledModal>
    </>
  );
};

export default ChangeClassStudent;
