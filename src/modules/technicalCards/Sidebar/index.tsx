'use client';
import React, { useEffect, useState } from 'react';
import { Button, Col, message, Row, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { StyledContactSidebarHeader } from '../Listing/index.styled';
import { useTechnicalCardActionsContext, useTechnicalCardContext } from '../TechnicalCardContextProvider';
import {
  StyledSidebarContent,
  StyledSidebarItemContent,
  StyledSidebarTitle,
} from '../../notes/Sidebar/index.styled';
import { useRouter } from 'next/navigation';
import { TechnicalCardCategory } from '@core/types/models/TechnicalCardCategory/TechnicalCardCategoryTypes';

const { Option } = Select;

const monthsInArabic = [
  'جانفي', 'فيفري', 'مارس', 'أفريل', 'ماي', 'جوان', 'جويلية', 'أوت', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
];

const SideBar = () => {
  const { onCreate, setCategoryFilter, setMonth } = useTechnicalCardActionsContext();
  const { technicalCardCategories } = useTechnicalCardContext();



  const handleCategoryChange = (value: any) => {
    setCategoryFilter(value);
  }
  const handleMonthChange = (value: any) => {
    setMonth(value);
  }
  return (
    <>
      <StyledContactSidebarHeader>
        <Row gutter={6} style={{ marginTop: '10px' }}>
          <Col span={24}>
            <Button
              type='primary'
              ghost
              onClick={() => {
                onCreate();
              }}
              icon={<PlusOutlined style={{ marginRight: 8 }} />}
            >
              إنشاء بطاقة تقنية
            </Button>
          </Col>
        </Row>
      </StyledContactSidebarHeader>
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
            <Option key={-1} value={-1}>
              الكل
            </Option>
            {monthsInArabic.map((month, index) => (
              <Option key={index} value={index + 1}>{month}</Option>
            ))}
          </Select>
        </StyledSidebarItemContent>
      </StyledSidebarContent>
    </>
  );
};

export default SideBar;
