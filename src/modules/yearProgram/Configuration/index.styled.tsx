import { Button, List } from 'antd';
import { darken } from 'polished';
import styled from 'styled-components';

export const StyledTcCell = styled(List.Item)`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  padding: 8px 20px !important;
  align-items: flex-start;
  flex-wrap: nowrap;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xs}px) {
    flex-direction: row;
    align-items: center;
  }
  &.selected{
        background-color:rgba(10,143,220,0.1);
        transform:translateY(-2px);
        box-shadow:0 3px 10px 0 rgba(10,143,220,0.1);
  }
`;

export const StyledTcCellContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
    width: 55%;
    margin-bottom: 0;
    margin-right: 8px;
  }
`;

export const StyledTcCellThumb = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 20px;
  width: 50px;
  height: 50px;
  border-radius: ${({ theme }) => theme.sizes.borderRadius.base};
  margin-right: 16px;

  [dir='rtl'] & {
    margin-right: 0;
    margin-left: 16px;
  }
`;

export const StyledTcCellInfo = styled.div`
  width: calc(100% - 76px);

  & h4 {
    margin-bottom: 2px;
  }

  & p {
    margin: 0px 5px;
    color: ${({ theme }) => theme.palette.text.secondary};
    size: ${({ theme }) => theme.palette.text.secondary};

  }
  & p.label {
    color:black;
  }
`;

export const StyledTcCellAction = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
    margin-left: auto;
    width: 45%;
    justify-content: flex-end;

    [dir='rtl'] & {
      margin-left: 0;
      margin-right: auto;
    }
  }

  & .ant-row {
    flex-wrap: nowrap;
  }
`;

export const StyledTcCellRate = styled.span`
  margin-right: 8px;

  [dir='rtl'] & {
    margin-right: 0;
    margin-left: 8px;
  }
`;

export const StyledTcCellBtn = styled(Button)`
  white-space: nowrap;
  width: 105px;
  padding: 8px 9px 7px;
  font-size: 13px;
  height: auto;
  font-weight: ${({ theme }) => theme.font.weight.medium};
`;

export const StyledTcCellRating = styled.span`
  margin-left: 8px;
  margin-right: 8px;
  font-size: ${({ theme }) => theme.font.size.base};
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xxl}px) {
    font-size: ${({ theme }) => theme.font.size.lg};
  }
`;

export const StyledTcCellMenu = styled.div`
  margin-left: auto;
  margin-right: -8px;

  [dir='rtl'] & {
    margin-left: -8px;
    margin-right: auto;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
    margin-left: 4px;

    [dir='rtl'] & {
      margin-left: 0;
      margin-right: 4px;
    }
  }
`;

export const StyledMyCourseHeader = styled.div`
  margin-bottom: 8px;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

export const StyledMyCategoryItem = styled.div`
  margin-right: 12px;
  margin-bottom: 4px;

  [dir='rtl'] & {
    margin-right: 0;
    margin-left: 12px;
  }
`;

export const StyledCategoryBadge = styled.span`
  cursor: pointer;
  background-color: ${({ theme }) =>
    darken(0.078, theme.palette.background.default)};
  color: ${({ theme }) => theme.palette.text.primary};
  padding: 6px 12px 7.1px;
  border-radius: 30px;
  display: block;
  transition: all 0.2s ease;

  &.active {
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: ${({ theme }) => theme.palette.primary.contrastText};
  }
`;
