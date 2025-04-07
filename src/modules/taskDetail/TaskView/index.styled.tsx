import { Avatar, Input } from 'antd';
import styled from 'styled-components';

export const StyledTaskDetailExecutionDate = styled.div`
  margin-bottom: 20px;
`;
export const StyledTaskDetailExecutionDateItem = styled.p`
  font-size: ${({ theme }) => theme.font.size.base};
  display: flex;
  color: ${({ theme }) => theme.palette.primary.main};
  margin-bottom: 12px;
`;

export const StyledExecutionDateItemInner = styled.span`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

export const StyledExecutionDatePara = styled.span`
  color: ${({ theme }) => theme.palette.text.primary};
  margin-right: 6px;

  [dir='rtl'] & {
    margin-right: 0;
    margin-left: 6px;
  }
`;
export const StyledExecutionDateItemIcon = styled.span`
  margin-right: 12px;

  [dir='rtl'] & {
    margin-right: 0;
    margin-left: 12px;
  }
`;

export const StyledTaskDetailItemTitle = styled.h3`
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: ${({ theme }) => theme.font.size.lg};
  margin-bottom: 12px;
`;

export const StyledDeliveryInput = styled(Input)`
  height: 40px;
  margin-top: 8px;
`;

export const StyledProductDeliveryInfoPara = styled.p`
  font-size: ${({ theme }) => theme.font.size.base};
  margin-top: 8px;
  margin-bottom: 4px;

  & span {
    margin-right: 12px;

    [dir='rtl'] & {
      margin-right: 0;
      margin-left: 12px;
    }
  }
`;

export const StyledTaskDetailService = styled.div`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.font.size.lg};

  &:not(:first-child) {
    margin-top: 12px;
  }
`;

export const StyledTaskDetailServicePara = styled.p`
  color: ${({ theme }) => theme.palette.text.primary};
  margin-left: 12px;
  display: flex;
  align-items: center;
  margin-bottom: 0;

  [dir='rtl'] & {
    margin-left: 0;
    margin-right: 12px;
  }
`;

export const StyledTaskView = styled.div`
  position: relative;

  & span.line-through {
    color: ${({ theme }) => theme.palette.text.secondary};
    font-size: ${({ theme }) => theme.font.size.lg};
    margin-left: 12px;
    text-decoration: line-through;

    [dir='rtl'] & {
      margin-left: 0;
      margin-right: 12px;
    }
  }
`;
export const StyledTaskViewTitle = styled.h3`
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: 20px;
  margin-bottom: 4px;
`;

export const StyledStrokeSubtitle = styled.h4`
  color: ${({ theme }) => theme.palette.primary.main};
  font-size: ${({ theme }) => theme.font.size.lg};
  margin-bottom: 16px;
`;

export const StyledTaskDetailSpecification = styled.div`
  position: relative;

  & .ant-row > .ant-col {
    margin-bottom: 0;
  }

  & p {
    margin-bottom: 12px;
  }
`;

export const StyledTaskDetailReviewInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;
export const StyledTaskDetailReviewCirProgressView = styled.div`
  max-width: 150px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    margin-right: 20px;

    [dir='rtl'] & {
      margin-right: 0;
      margin-left: 20px;
    }
  }
`;
export const StyledTaskDetailReviewCirProgressInside = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & h3 {
    font-size: ${({ theme }) => theme.font.size.base};
    display: flex;
    align-items: center;
    font-weight: ${({ theme }) => theme.font.weight.bold};
  }

  & p {
    margin-left: 8px;
    font-size: ${({ theme }) => theme.font.size.base};
    font-weight: ${({ theme }) => theme.font.weight.light};
    margin-bottom: 0;
    color: ${({ theme }) => theme.palette.text.primary};

    [dir='rtl'] & {
      margin-left: 0;
      margin-right: 8px;
    }
  }

  & .anticon {
    font-size: ${({ theme }) => theme.font.size.base} !important;
    margin-left: 4px;

    [dir='rtl'] & {
      margin-left: 0;
      margin-right: 4px;
    }
  }
`;

export const StyledTaskDetailReviewContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledTaskDetailReviewitem = styled.div`
  padding: 4px;
  font-size: ${({ theme }) => theme.font.size.base};
  display: flex;
  align-items: center;

  & .anticon {
    margin-left: 4px;
    margin-right: 4px;
    font-size: ${({ theme }) => theme.font.size.sm};
  }
`;

export const StyledTaskDetailReviewResult = styled.span`
  margin-left: 8px;
  font-size: ${({ theme }) => theme.font.size.base};
  color: ${({ theme }) => theme.palette.text.secondary};
  min-width: 30px;

  [dir='rtl'] & {
    margin-left: 0;
    margin-right: 8px;
  }
`;

export const StyledTaskDetailReviewCell = styled.div`
  position: relative;
  //display: flex;
  //align-items: center;
  //justify-content: space-between;
  padding: 12px 16px;

`;
export const StyledTaskDetailReviewCellInfo = styled.div`
  position: relative;
  display: flex;
`;

export const StyledActionStatusBadgeGreen = styled.span`
  background-color: ${({ theme }) => theme.palette.green[7]};
  color: white;
  height: 18px;
  padding: 8px 8px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  font-size: ${({ theme }) => theme.font.size.sm};

    margin-right: 8px;

  & .anticon {
    margin-left: 2px;
    font-size: 10px;

    [dir='rtl'] & {
      margin-left: 0;
      margin-right: 2px;
    }
  }
`;
export const StyledActionStatusBadgeRed = styled.span`
  background-color:red;
  color: white;
  height: 18px;
  padding: 10px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  font-size: ${({ theme }) => theme.font.size.sm};

    margin-right: 8px;

  & .anticon {
    margin-left: 2px;
    font-size: 10px;

    [dir='rtl'] & {
      margin-left: 0;
      margin-right: 2px;
    }
  }
`;
export const StyledTaskDetailReviewCellContent = styled.div`
  flex: 1;
  margin-left: 16px;

  [dir='rtl'] & {
    margin-left: 0;
    margin-right: 16px;
  }

  & h3 {
    color: ${({ theme }) => theme.palette.text.primary};
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    font-size: ${({ theme }) => theme.font.size.base};
    font-weight: ${({ theme }) => theme.font.weight.bold};
  }

  & p {
    color: ${({ theme }) => theme.palette.text.secondary};
    margin-bottom: 0;
  }
`;

export const StyledTaskDetailCellAvatar = styled(Avatar)`
  height: 50px;
  width: 50px;
  overflow: hidden;
`;
export const StyledTaskDetailCellTime = styled.span`
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.palette.text.hint};
`;

export const StyledTaskDetailCellAction = styled.span`
  display: flex;
  align-items: center;
  flex-direction: row;
  align-items: center;
    justify-content: center;
    height: 100%;

  color: ${({ theme }) => theme.palette.text.primary};
  font-size: ${({ theme }) => theme.font.size.base};

  [dir='rtl'] & {
    right: auto;
    left: 2px;
  }

 /* & .ant-btn {
    margin-left: 15px;
    width: 25px;
    height: 25px;
    border-radius: ${({ theme }) => theme.sizes.borderRadius.circle};
    padding: 2px;
      margin-right: 15px;
    
  }*/
`;
