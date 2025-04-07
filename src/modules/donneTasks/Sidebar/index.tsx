'use client';
import React, { useEffect, useState } from 'react';
import { Button, Col, DatePicker, Input, Modal, Row, Select } from 'antd';

import { PlusOutlined } from '@ant-design/icons';
import { StyledContactSidebarHeader } from '../Listing/index.styled';
import { Year } from '@core/types/models/year/YearTypes';
import {
  StyledSidebarContent,
  StyledSidebarTitle,
  StyledSidebarItemContent,
} from '../../notes/Sidebar/index.styled';
import { environment } from '../../../envirenement/environnement';
import {
  useDonneTaskContext,
  useDonneTaskActionsContext,
} from '../DonneTaskContextProvider';
import { monthsInArabic } from '@crema/hooks/dateHooks';

export interface Filtter {
  start: string;
  end: string;
}

const SideBar = ({}) => {
  const { setIdTcCategory, setMonth } = useDonneTaskActionsContext();
  const { technicalCardCategories } = useDonneTaskContext();
  const Option = Select.Option;
  const handleCategoryChange = (value: any) => {
    setIdTcCategory(value);
  };
  const handleMonthChange = (value: any) => {
    setMonth(value);
  };

  return (
    <>
      <StyledContactSidebarHeader></StyledContactSidebarHeader>
      <StyledSidebarContent>
        <StyledSidebarTitle>حسب باب النشاط </StyledSidebarTitle>
        <StyledSidebarItemContent>
          <Select
            style={{ width: '100%' }}
            showSearch
            placeholder='حسب باب النشاط '
            onChange={handleCategoryChange}
          >
            <Option key={-1} value={-1}>
              الكل
            </Option>
            {technicalCardCategories.map((category) => (
              <Option key={category.id} value={category.id}>
                {category.name}
              </Option>
            ))}
          </Select>
        </StyledSidebarItemContent>
        <StyledSidebarTitle>حسب مراحل الإنجاز</StyledSidebarTitle>
        <StyledSidebarItemContent>
          <Select
            style={{ width: '100%' }}
            showSearch
            onChange={handleMonthChange}
            placeholder='حسب مراحل الإنجاز'
          >
            {' '}
            <Option key={-1} value={-1}>
              الكل
            </Option>
            {monthsInArabic.map((month, index) => (
              <Option key={index} value={index + 1}>
                {month}
              </Option>
            ))}
          </Select>
        </StyledSidebarItemContent>
      </StyledSidebarContent>
    </>
  );
};

export default SideBar;
