import AppsPagination from '@crema/components/AppsPagination';
import AppTableContainer from '@crema/components/AppTableContainer';
import styled from 'styled-components';

export const StyledListHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;
export const StyledListHeaderInputView = styled.div`
  max-width: 120px;
  margin: 0 10px ;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
    max-width: 150px;
  }
`;

export const StyledListHeaderLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 10px;

  padding-left: 0;
    padding-right: 10px;

  [dir='ltr'] & {
    padding-left: 10;
    padding-right: 0px;
  }
`;
export const StyledListHeaderRight = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 10px;

  [dir='rtl'] & {
    padding-left: 0;
    padding-right: 10px;
  }
`;

export const StyledListHeaderPagination = styled(AppsPagination)`
  //display: none;
  padding-left: 12px;
  padding-right: 2px;

  [dir='rtl'] & {
    padding-left: 2px;
    padding-right: 12px;
  }

  /*@media screen and (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    display: block;
  }*/
`;

export const StyledListFooterPagination = styled(AppsPagination)`
  display: block;
  padding: 10px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    display: none;
  }
`;

export const StyledListId = styled.span`
  text-decoration: underline;
  color: ${({ theme }) => theme.palette.primary.main};
`;

export const StyledListTable = styled(AppTableContainer)`
  & .ant-table table {
    table-layout: auto !important;
  }

  & .ant-table-thead > tr > th {
    font-size: 13px;
    padding: 8px;
    font-weight: ${({ theme }) => theme.font.weight.bold};
    background-color: transparent;
    text-align: center;
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
    text-align: center;

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
