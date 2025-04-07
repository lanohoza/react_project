import React from 'react';
import { Button, Col, Form, Input, message } from 'antd';
import AppRowContainer from '@crema/components/AppRowContainer';
import IntlMessages from '@crema/helpers/IntlMessages';
import {
  StyledUserProfileForm,
  StyledUserProfileFormTitle,
  StyledUserProfileGroupBtn,
} from '../index.styled';
import { editPassword } from '@core/services/UserService';

const ChangePassword = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    const token = localStorage.getItem('token');
    const { oldPassword, password, confirmPassword } = values;
    try {
      const response = await editPassword(oldPassword, password);
      if (response) {
        message.success('تم تغيير كلمة المرور بنجاح!');
        form.resetFields();
      } else {
        message.error('كلمة السر الحالية غير صحيحة');
      }
    } catch (error) {
      message.error('فشل في تغيير كلمة المرور. يرجى المحاولة مرة أخرى.');
      console.error('Error:', error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <StyledUserProfileForm
      form={form}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <StyledUserProfileFormTitle>
        <IntlMessages id="userProfile.changePassword" />
      </StyledUserProfileFormTitle>
      <AppRowContainer gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            name="oldPassword"
            rules={[
              { required: true, message: 'يرجى إدخال كلمة المرور الحالية' },
            ]}
          >
            <Input.Password placeholder="أدخل كلمة المرور الحالية" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12} />
        <Col xs={24} md={12}>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'يرجى إدخال كلمة المرور الجديدة!' },
            ]}
          >
            <Input.Password placeholder="أدخل كلمة المرور الجديدة" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: 'يرجى إدخال تأكيد كلمة المرور!',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    'كلمة المرور المؤكدة لا تطابق كلمة المرور الجديدة!'
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="تأكيد كلمة المرور" />
          </Form.Item>
        </Col>
        <Col xs={24} md={24}>
          <StyledUserProfileGroupBtn
            shouldUpdate
            className="user-profile-group-btn"
          >
            <Button type="primary" htmlType="submit">
              حفظ
            </Button>
            <Button>إلغاء</Button>
          </StyledUserProfileGroupBtn>
        </Col>
      </AppRowContainer>
    </StyledUserProfileForm>
  );
};

export default ChangePassword;
