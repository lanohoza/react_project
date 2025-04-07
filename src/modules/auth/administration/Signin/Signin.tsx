// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useIntl } from 'react-intl';
// import { Checkbox, Form, Input } from 'antd';

// import IntlMessages from '@crema/helpers/IntlMessages';
// import { useAuthMethod } from '@crema/hooks/AuthHooks';
// import {
//   SignInButton,
//   StyledRememberMe,
//   StyledSign,
//   StyledSignContent,
//   StyledSignForm,
//   StyledSignLink,
//   StyledSignLinkTag,
//   StyledSignTextGrey,
// } from './index.styled';

// const SignInJwtAuth = () => {
//   const navigate = useNavigate();
//   const { signInAdmin } = useAuthMethod();

//   const onFinishFailed = (errorInfo:any) => {
//     console.log('Failed:', errorInfo);
//   };

//   const onGoToForgetPassword = () => {
//     navigate('/forget-password', { tab: 'jwtAuth' });
//   };

//   function onRememberMe(e) {
//     console.log(`checked = ${e.target.checked}`);
//   }

//   const { messages } = useIntl();

//   return (
//     <StyledSign>
//       <StyledSignContent>
//         <StyledSignForm
//           name="basic"
//           initialValues={{
//             remember: true,
//             email: 'crema.demo@gmail.com',
//             password: 'Pass@1!@all',
//           }}
//           onFinish={signInAdmin}
//           onFinishFailed={onFinishFailed}
//         >
//           <Form.Item
//             name="email"
//             className="form-field"
//             rules={[{ required: true, message: 'Please input your Email!' }]}
//           >
//             <Input placeholder={messages['common.email']} />
//           </Form.Item>

//           <Form.Item
//             name="password"
//             className="form-field"
//             rules={[{ required: true, message: 'Please input your Password!' }]}
//           >
//             <Input.Password placeholder={messages['common.password']} />
//           </Form.Item>

//           <StyledRememberMe>
//             <Checkbox onChange={onRememberMe}>
//               <IntlMessages id="common.rememberMe" />
//             </Checkbox>

//             <StyledSignLink onClick={onGoToForgetPassword}>
//               <IntlMessages id="common.forgetPassword" />
//             </StyledSignLink>
//           </StyledRememberMe>

//           <div className="form-btn-field">
//             <SignInButton type="primary" htmlType="submit">
//               <IntlMessages id="common.login" />
//             </SignInButton>
//           </div>

//           <div className="form-field-action">
//             <StyledSignTextGrey>
//               <IntlMessages id="common.dontHaveAccount" />
//             </StyledSignTextGrey>
//             <StyledSignLinkTag to="/signup">
//               <IntlMessages id="common.signup" />
//             </StyledSignLinkTag>
//           </div>
//         </StyledSignForm>
//       </StyledSignContent>
//     </StyledSign>
//   );
// };

// export default SignInJwtAuth;

import React from 'react';
import { useRouter } from 'next/navigation';
import { Checkbox, Form, Input, notification } from 'antd';
import { GithubOutlined, GoogleOutlined, TwitterOutlined } from '@ant-design/icons';
import { FaFacebookF } from 'react-icons/fa';
import { useAuthMethod } from '@crema/hooks/AuthHooks';
import {
  SignInButton,
  StyledRememberMe,
  StyledSign,
  StyledSignContent,
  StyledSignedText,
  StyledSignFooter,
  StyledSignForm,
  StyledSignIconBtn,
  StyledSignLink,
  StyledSignLinkTag,
  StyledSignSocialLink,
  StyledSignTextGrey,
} from './index.styled';
import { UserLogIn } from '@core/types/models/userLogin/UserLoginTyps';
import { UserLogInResponse } from '@core/types/models/userLogInResponse/UserLogInResponseTypes';
import { authenticateUser } from '@core/services/Authentication';
import { SignInProps } from '@crema/services/auth/jwt-auth/JWTAuthProvider';

const SignInJwtAuth = () => {
  const router = useRouter();
  const { signInAdmin } = useAuthMethod();

  const onFinish = (values: SignInProps) => {
    signInAdmin(values);

  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onGoToForgetPassword = () => {
    router.push('/forget-password');
  };

  const onRememberMe = () => {
    console.log('checked');
  };

  return (
    <StyledSign>
      <StyledSignContent>
        <StyledSignForm
          name='basic'
          // initialValues={{
          //   remember: true,
          //   email: 'crema.demo@gmail.com',
          //   password: 'Pass@1!@all',
          // }}
          onFinish={signInAdmin}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name='email'
            className='form-field'
            rules={[{ required: true, message: 'الرجاء إدخال البريد الإلكتروني!' }]}
          >
            <Input placeholder='البريد الإلكتروني' />
          </Form.Item>

          <Form.Item
            name='password'
            className='form-field'
            rules={[{ required: true, message: 'الرجاء إدخال كلمة السر!' }]}
          >
            <Input.Password placeholder='كلمة السر' />
          </Form.Item>

          <StyledRememberMe>
            <Checkbox onChange={onRememberMe}>تذكرني</Checkbox>
            <StyledSignLink onClick={onGoToForgetPassword}>نسيت كلمة السر؟</StyledSignLink>
          </StyledRememberMe>

          <div className='form-btn-field'>
            <SignInButton type='primary' htmlType='submit'>
              تسجيل الدخول
            </SignInButton>
          </div>

          <div className='form-field-action'>
            <StyledSignTextGrey>ليس لديك حساب؟</StyledSignTextGrey>
            <StyledSignLinkTag href='/signup'>إنشاء حساب جديد</StyledSignLinkTag>
          </div>
        </StyledSignForm>
      </StyledSignContent>
      {/* <StyledSignFooter>
        <StyledSignedText>أو قم بتسجيل الدخول باستخدام</StyledSignedText>
        <StyledSignSocialLink>
          <StyledSignIconBtn onClick={() => logInWithPopup('google')} icon={<GoogleOutlined />} />
          <StyledSignIconBtn icon={<FaFacebookF />} onClick={() => logInWithPopup('facebook')} />
          <StyledSignIconBtn icon={<GithubOutlined />} onClick={() => logInWithPopup('github')} />
          <StyledSignIconBtn icon={<TwitterOutlined />} onClick={() => logInWithPopup('twitter')} />
        </StyledSignSocialLink>
      </StyledSignFooter> */}
    </StyledSign>
  );
};

export default SignInJwtAuth;
