'use client';
import React, { useEffect, useState } from 'react';
import { Button, Col, message, Row, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { StyledContactSidebarHeader } from '../Listing/index.styled';
import {
  StyledSidebarContent,
  StyledSidebarItemContent,
  StyledSidebarTitle,
} from '../../notes/Sidebar/index.styled';
import { useWeekProgramActionsContext } from '../WeekProgramContextProvider';


const { Option } = Select;

const monthsInArabic = [
  'جانفي', 'فيفري', 'مارس', 'أفريل', 'ماي', 'جوان', 'جويلية', 'أوت', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
];

const SideBar = () => {
  const { onCreate, setMonth } = useWeekProgramActionsContext();

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
              إعداد برنامج أسبوعي
            </Button>
          </Col>
        </Row>
      </StyledContactSidebarHeader>
      <StyledSidebarContent>
        <StyledSidebarTitle>حسب الشهر </StyledSidebarTitle>
        <StyledSidebarItemContent>
          <Select
            style={{ width: '100%' }}
            showSearch
            placeholder='حسب الشهر '
            onChange={handleMonthChange}
          >
            <Option key={-1} value={-1}>
              الكل
            </Option>
            {monthsInArabic.map((month, index) => (
              <Select.Option key={index} value={index + 1}>
                {month}
              </Select.Option>
            ))}
          </Select>
        </StyledSidebarItemContent>
        {/* <StyledSidebarTitle>حسب مراحل الإنجاز</StyledSidebarTitle>
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
        </StyledSidebarItemContent> */}
      </StyledSidebarContent>
    </>
  );
};

export default SideBar;
