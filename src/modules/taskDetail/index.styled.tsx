import { Badge } from 'antd';
import styled from 'styled-components';

export const StyledTaskDetails = styled.div`
  position: relative;
  padding-bottom: 15px;
`;

export const StyledTaskDetailHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.borderColor};
  margin-bottom: 20px;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}px) {
    flex-direction: column;
  }
`;
export const StyledTaskDetailHeaderInfo = styled.div`
  position: relative;
  flex: 1;

  & h3 {
    color: ${({ theme }) => theme.palette.text.primary};
    font-weight: ${({ theme }) => theme.font.weight.bold};
    font-size: ${({ theme }) => theme.font.size.xxlg} !important;
    margin-bottom: 15px;
  }
`;

export const StyledTaskDetailHeaderContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  & .ant-rate {
    font-size: ${({ theme }) => theme.font.size.base};
    margin-bottom: 6px;
  }

  & > span {
    margin-bottom: 6px;
  }
`;

export const StyledProfileReviewText = styled.span`
    margin-left: 16px;
    margin-right: 8px;
  font-weight: bold;
  color: #000;


  [dir='rtl'] & {
    margin-left: 16px;
    margin-right: 8px;
  }
`;
export const StyledProfileMbText = styled.span`
  margin-left: 8px;
  color: ${({ theme }) => theme.palette.text.secondary};

  [dir='rtl'] & {
    margin-left: 0;
    margin-right: 8px;
  }
`;

export const StyledTaskDetailSocial = styled.div`
  display: flex;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xs}px) {
    margin-top: 10px;
  }

  & .react-share__ShareButton {
    margin-right: 0 !important;
    margin-left: 12px !important;

    [dir='rtl'] & {
      margin-right: 12px !important;
      margin-left: 0 !important;
    }
  }
`;
export const StyledStatus = styled.span`
  padding: 5px 12px;
  margin-right: 6px;
  border-radius: 3px;
  

  .title {
    font-weight: ${({ theme }) => theme.font.weight.medium};
    font-size: ${({ theme }) => theme.font.size.sm};
  }
`;

export const StyledRibbon = styled(Badge.Ribbon)`
height: 33px;
width: 105px;
font-size: 16px;
display: flex;
align-items: center;
justify-content: center;
    `