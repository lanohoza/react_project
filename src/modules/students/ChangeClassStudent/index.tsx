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
import {
  useStudentActionsContext,
  useStudentContext,
} from '../StudentContextProvider';
import dayjs from 'dayjs';
import { GetClasseDto } from '@core/types/models/classe/ClasseTypes';
import { changeClass } from '@core/services/StudentService';

const ChangeClassStudent = () => {
  const infoViewActionsContext = useInfoViewActionsContext();
  const { OnCloseChangeClassStudent, reload } = useStudentActionsContext();
  const { classes, initialData, openChangClasseeModel } = useStudentContext();
  const { Step } = Steps;

  const { Option } = Select;
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);

  function onFinish(values: any): void {
    changeClass(
      initialData.id,
      initialData.idClasse,
      values.idNewClasse,
      infoViewActionsContext,
    )
      .then(() => {
        message.success('تم تغير القسم بنجاح');
        OnCloseChangeClassStudent();
        reload();
      })
      .catch(() => {
        message.success('تم تغير القسم بنجاح');
      });
  }

  return (
    <>
      <StyledModal
        footer={false}
        open={openChangClasseeModel}
        aria-labelledby='keep-mounted-modal-title'
        aria-describedby='keep-mounted-modal-description'
        onCancel={OnCloseChangeClassStudent}
        width={'35%'}
      >
        <StyledForm form={form} onFinish={onFinish}>
          <StyledFormHeader>
            <StyledFormHeaderTitle>تعير القسم</StyledFormHeaderTitle>
          </StyledFormHeader>
          <StyledFormContent>
            <StyledFormContentItem>
              <StyledFormContentField>
                <Form.Item
                  className='form-field'
                  labelAlign={'left'}
                  labelCol={{ span: 8 }}
                  name='idNewClasse'
                  label=' القسم الجديد'
                  rules={[{ required: true }]}
                >
                  <Select>
                    {classes.map((classe: GetClasseDto) => {
                      return (
                        <Option value={classe.id} key={classe.id}>
                          {classe.title}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </StyledFormContentField>
            </StyledFormContentItem>
          </StyledFormContent>
          <StyledFormFooter>
            <StyledFormBtn
              type='primary'
              ghost
              disabled={current === 0}
              onClick={() => {
                setCurrent(current - 1);
              }}
            >
              السابق
            </StyledFormBtn>

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
