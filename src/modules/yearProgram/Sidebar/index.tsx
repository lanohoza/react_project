'use client';
import React, { useEffect, useState } from 'react';
import { Button, Col, message, Row, Select } from 'antd';
import { PlusOutlined, PrinterOutlined, SettingOutlined } from '@ant-design/icons';
import { StyledContactSidebarHeader } from '../Listing/index.styled';
import {
  StyledSidebarContent,
  StyledSidebarItemContent,
  StyledSidebarTitle,
} from '../../notes/Sidebar/index.styled';
import { useYearProgramActionsContext, useYearProgramContext } from '../YearProgramContextProvider';
import { monthsInArabic } from '@crema/hooks/dateHooks';
import { environment } from '../../../envirenement/environnement';

const { Option } = Select;



const SideBar = () => {

  const { onOpenConfigurationModel, setIdTcCategory, setMonth } = useYearProgramActionsContext();
  const { technicalCardCategories } = useYearProgramContext();


  const handleCategoryChange = (value: any) => {
    setIdTcCategory(value);
  }
  const handleMonthChange = (value: any) => {
    setMonth(value);
  }

  const handlePrint = () => {
    window.open(`${environment?.BASE_PATH ?? ''}/pdf/year-program`, '_blank');
  }

  return (
    <>
      <StyledContactSidebarHeader>
        <Row gutter={6} style={{ marginTop: '10px' }}>
          <Col span={24}>
            <Button
              type='primary'
              onClick={() => {
                onOpenConfigurationModel();
              }}
              icon={<SettingOutlined style={{ marginRight: 8 }} />}
            >
              إعداد البرنامج السنوي            </Button>
          </Col>
        </Row>
        <Row gutter={6} style={{ marginTop: '10px' }}>
          <Col span={24}>
            <Button
              icon={<PrinterOutlined style={{ marginRight: 8 }} />}
              onClick={()=>{
                handlePrint();
              }}
            >
              طباعة البرنامج السنوي
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
          >  <Option key={-1} value={-1}>
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
