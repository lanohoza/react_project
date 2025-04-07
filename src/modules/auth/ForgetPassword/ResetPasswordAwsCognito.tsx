'use client';
import React from 'react';
import { Form, Input, message } from 'antd';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useRouter } from 'next/navigation';
import { useIntl } from 'react-intl';
import {
  StyledAuthReconContent,
  StyledConfirmBtn,
  StyledResetForm,
} from './index.styled';
import { changePassword, verifyCodeOtp } from '@core/services/ForgetPasswordService';
import CustomCodeInput from './CustomCodeInput';

const ResetPasswordAwsCognito = () => {
  const { messages } = useIntl();
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = async (values: any) => {
    const { pin, newPassword, confirmPassword } = values;
    const email = localStorage.getItem('email');

    try {
      // Step 1: Verify the OTP code
      await verifyCodeOtp(email, Number(pin));
      message.success('Code verified successfully!');

      // Step 2: Change the password
      await changePassword(email, newPassword, confirmPassword);
      message.success('Password changed successfully!');

      router.push('/signin');
    } catch (error) {
      message.error('An error occurred: ' + error.message);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <StyledAuthReconContent>
      <StyledResetForm
        name='basic'
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {/* <Form.Item
          name='pin'
          className='form-field'
          rules={[{ required: true, message: 'الرجاء إدخال رقم التعريف الشخصي الخاص بك!' }]}
        >
          <p>
            <IntlMessages id='common.verificationMessage' />
          </p>
          <CustomCodeInput
            name='pin'
            // type='password'
            fields={6}
          />
        </Form.Item> */}
        <Form.Item
          name='pin'
          className='form-field'
          rules={[
            { required: true, message: 'الرجاء إدخال رقم التعريف الشخصي الخاص بك!' },
          ]}
        >
          <Input
            placeholder={messages['common.verificationMessage'] as string}
          />
        </Form.Item>

        <Form.Item
          name='newPassword'
          className='form-field'
          rules={[
            { required: true, message: 'الرجاء إدخال كلمة المرور الجديدة الخاصة بك!' },
          ]}
        >
          <Input
            type='password'
            placeholder={messages['common.newPassword'] as string}
          />
        </Form.Item>

        <Form.Item
          name='confirmPassword'
          className='form-field'
          rules={[
            {
              required: true,
              message: 'الرجاء إدخال إعادة كتابة كلمة المرور الخاصة بك!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  'لا تطابق كلمة المرور الجديدة!'
                );
              },
            }),
          ]}
        >
          <Input
            type='password'
            placeholder={messages['common.retypePassword'] as string}
          />
        </Form.Item>

        <StyledConfirmBtn type='primary' htmlType='submit'>
          <IntlMessages id='common.resetMyPassword' />
        </StyledConfirmBtn>
      </StyledResetForm>
    </StyledAuthReconContent>
  );
};

export default ResetPasswordAwsCognito;
