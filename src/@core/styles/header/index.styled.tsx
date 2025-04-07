import AppTableContainer from '@crema/components/AppTableContainer';
import { Button } from 'antd';
import styled from 'styled-components';

export const StyledCustomButtonsHeaderContainer = styled.div`
margin:0 50px;
`;


export const StyledCurrentTaskListTable = styled(AppTableContainer)`


  & .ant-table table {
    table-layout: auto !important;
    background-color: white;
  }

  & .ant-table-thead > tr > th {
    font-size: 13px;
    padding: 8px;
    font-weight: ${({ theme }) => theme.font.weight.bold};
    background-color: transparent;

    &:first-child {
      padding-left: 20px;

      [dir='rtl'] & {
        padding-left: 0;
        padding-right: 20px;
      }
    }

    &:last-child {
      padding-right: 20px;

      [dir='rtl'] & {
        padding-right: 0;
        padding-left: 20px;
      }
    }

    & .List-table-action {
      text-align: center;
 
    }
    
  }
  & .ant-table-tbody > tr:hover{
    cursor: pointer;
    box-shadow: none !important;
    & .List-table-action > button{
      background-color: transparent
       !important;
    }
  }
    
  & .ant-table-tbody > tr > td {
    font-size: 13px;
    padding: 12px 8px;
    min-width: 130px;
    &:first-child {
      padding-left: 20px;

      [dir='rtl'] & {
        padding-left: 0;
        padding-right: 20px;
      }
    }

    &:last-child {
      padding-right: 20px;

      [dir='rtl'] & {
        padding-right: 0;
        padding-left: 20px;
      }
    }

    &.List-table-action {
      text-align: center;
   
    }
  }

  & .badge {
    padding: 3px 10px;
    bList-radius: ${({ theme }) => theme.cardRadius};
    display: inline-block;
  }
`;
export const StyledCustomButton =styled(Button)`
margin: 0 3px;
`;
