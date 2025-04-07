import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Form, Input, message } from 'antd';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useIntl } from 'react-intl';
import {
  StyledForgotForm,
  StyledForgotContent,
  StyledForgotPara,
  StyledFormFooter,
  StyledForgotBtn,
} from './index.styled';
import { verifyEmail } from '@core/services/ForgetPasswordService';

const ForgetPasswordJwtAuth = () => {
  const { messages } = useIntl();
  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      await verifyEmail(values.email);
      localStorage.setItem('email', values.email);
      message.success('تم إرسال البريد الإلكتروني للتحقق بنجاح.');
      router.push('/reset-password');
    } catch (error) {
      message.error('فشل إرسال رسالة التحقق. يرجى المحاولة مرة أخرى.');
      console.error('Error:', error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <StyledForgotContent>
      <StyledForgotPara>
        <IntlMessages id="common.forgetPasswordTextOne" />
        <span>
          <IntlMessages id="common.forgetPasswordTextTwo" />
        </span>
      </StyledForgotPara>

      <StyledForgotForm
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="email"
          className="form-field"
          rules={[
            { required: true, message: 'الرجاء إدخال البريد الإلكتروني!' },
          ]}
        >
          <Input placeholder={messages['common.emailAddress'] as string} />
        </Form.Item>

        <div className="form-field">
          <StyledForgotBtn type="primary" htmlType="submit">
            <IntlMessages id="common.sendNewPassword" />
          </StyledForgotBtn>
        </div>

        <StyledFormFooter>
          <IntlMessages id="common.alreadyHavePassword" />
          <Link href="/signin">
            <IntlMessages id="common.signIn" />
          </Link>
        </StyledFormFooter>
      </StyledForgotForm>
    </StyledForgotContent>
  );
};

export default ForgetPasswordJwtAuth;
