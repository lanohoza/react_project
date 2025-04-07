'use client';
import React, { useEffect, useState } from 'react';
import { Button, Col, message, Row, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { StyledContactSidebarHeader } from '../Listing/index.styled';
import { StyledSidebarContent } from '../../../notes/Sidebar/index.styled';
import { usePopUpActionsContext } from '../PopUpContextProvider';


const { Option } = Select;



const SideBar = () => {
  const { onCreate } = usePopUpActionsContext();


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
              إنشاء إعلان
            </Button>
          </Col>
        </Row>
      </StyledContactSidebarHeader>
      <StyledSidebarContent>
        {/* <StyledSidebarTitle>حسب الشهر </StyledSidebarTitle>
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
        </StyledSidebarItemContent> */}
      </StyledSidebarContent>
    </>
  );
};

export default SideBar;
