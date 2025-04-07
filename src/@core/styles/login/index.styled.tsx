import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import styled from 'styled-components';

const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const LoginFormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  padding: 0 50px;
`;

const Logo = styled.div`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 1rem;
`;

const LoginForm = styled(Form)`
  max-width: 300px;
  width: 100%;
`;

const LoginFormForgot = styled.div`
  float: right;
`;

const LoginFormButton = styled(Button)`
  width: 100%;
`;

const LoginWelcome = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #333;
  color: #fff;
  text-align: center;
  padding: 0 50px;

  h2 {
    font-size: 2rem;
  }

  p {
    font-size: 1rem;
  }
`;