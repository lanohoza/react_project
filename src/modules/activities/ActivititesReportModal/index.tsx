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
} from 'antd';

import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { ModeComponent } from '@core/types/models/core/models';
import { useActivityActionsContext, useActivityContext } from '../activityContextProvider';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { environment } from '../../../envirenement/environnement';


const ChangeClassStudent = () => {
  const infoViewActionsContext = useInfoViewActionsContext();
  const { openActivityReportModal } = useActivityContext();
  const { setOpenActivityReportModal } = useActivityActionsContext();
  const router = useRouter();
  const onFinish = (values: any) => {
    const day = dayjs(values.day)
    const queryParams = new URLSearchParams({ d: (values.day as dayjs.Dayjs).valueOf() }).toString();
    const url = `${environment?.BASE_PATH ?? ''}/pdf/notebooks/activities?${queryParams}`;
    window.open(url, '_blank');
    //router.push("notebooks/activities?d=" +);/// day.format("YYYYMMDD"));
  };

  return (
    <>
      <StyledModal
        footer={false}
        open={openActivityReportModal}
        width={'35%'}
        onCancel={() => { setOpenActivityReportModal(false) }}
      >
        <StyledForm onFinish={onFinish}  >
          <StyledFormHeader>
            <StyledFormHeaderTitle>طباعة التقرير اليومي </StyledFormHeaderTitle>
          </StyledFormHeader>
          <StyledFormContent>
            <StyledFormContentItem>
              <StyledFormContentField>
                <Form.Item
                  className='form-field'
                  labelAlign={'left'}
                  labelCol={{ span: 8 }}
                  name='day'
                  label='تاريخ اليوم'
                  rules={[{ required: true }]}
                >
                  <DatePicker></DatePicker>
                </Form.Item>
              </StyledFormContentField>
            </StyledFormContentItem>
          </StyledFormContent>
          <StyledFormFooter>
            <StyledFormBtn type='primary' htmlType='submit'>
              طباعة
            </StyledFormBtn>
          </StyledFormFooter>
        </StyledForm>
      </StyledModal>
    </>
  );
};

export default ChangeClassStudent;
