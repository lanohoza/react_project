import {Button, Form} from 'antd';
import styled from 'styled-components';

export const StyledForgotForm = styled(Form)`
  flex: 1;
  display: flex;
  flex-direction: column;

  & .form-field {
    margin-bottom: 20px;
  }
`;

export const StyledForgotContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const StyledForgotPara = styled.p`
  line-height: 1.5;
  margin-bottom: 24px;
  font-size: ${({theme}) => theme.font.size.base};

  @media screen and (min-width: ${({theme}) => theme.breakpoints.xxl}px) {
    font-size: ${({theme}) => theme.font.size.lg};
    margin-bottom: 48px;
  }

  & span {
    margin-left: 4px;
  }
`;

export const StyledFormFooter = styled.p`
  margin-top: auto;
  font-size: 15px;
  color: ${({theme}) => theme.palette.gray[500]};
  margin-bottom: 0;

  & a {
    text-decoration: none;
    margin-left: 10px;
    display: inline-block;

    [dir='rtl'] & {
      margin-left: 0;
      margin-right: 10px;
    }
  }
`;

export const StyledForgotBtn = styled(Button)`
  width: 100%;
  font-weight: ${({theme}) => theme.font.weight.regular};
  text-transform: capitalize;
  font-size: ${({theme}) => theme.font.size.base}; ;
`;

export const StyledAuthReconContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  & .ant-card-body {
    padding-top: 10px;
    @media screen and (min-width: ${({theme}) => theme.breakpoints.sm}px) {
      padding-top: 28px;
    }
    @media screen and (min-width: ${({theme}) => theme.breakpoints.xxl}px) {
      padding-top: 40px;
    }
  }
`;

export const StyledConfirmBtn = styled(Button)`
  border-radius: ${({theme}) => theme.sizes.borderRadius.base};
  width: 100%;
  font-weight: ${({theme}) => theme.font.weight.regular};
  font-size: ${({theme}) => theme.font.size.base};
`;

export const StyledResetForm = styled(Form)`
  position: relative;

  & .form-field {
    margin-bottom: 20px;

    & p {
      margin-bottom: 24px;
      font-size: ${({theme}) => theme.font.size.base};
      @media screen and (min-width: ${({theme}) => theme.breakpoints.xxl}px) {
        font-size: ${({theme}) => theme.font.size.lg};
      }
    }
  }

  & .ant-form-item-explain-error {
    text-align: left;

    [dir='rtl'] & {
      text-align: right;
    }
  }

  & .react-code-input input {
    &:focus {
      outline: none;
    }
  }
`;
