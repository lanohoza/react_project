'use client';
import React, { useEffect, useState } from 'react';
import { Button, Col, Input, Modal, Row, Select } from 'antd';

import { PlusOutlined } from '@ant-design/icons';
import { StyledContactSidebarHeader } from '../Listing/index.styled';
import {
  useProfessorActionsContext,
  useProfessorContext,
} from '../ProfessorContextProvider';
import { Year } from '@core/types/models/year/YearTypes';
import {
  StyledSidebarContent,
  StyledSidebarTitle,
  StyledSidebarItemContent,
} from '../../notes/Sidebar/index.styled';

const SideBar = ({}) => {
  const { onCreate, setSelectedIdYear } = useProfessorActionsContext();
  const { years } = useProfessorContext();
  const { Option } = Select;
  return (
    <>
      <StyledContactSidebarHeader>
        <Button
          ghost
          onClick={() => {
            onCreate();
          }}
          type='primary'
          icon={<PlusOutlined style={{ marginRight: 8 }} />}
        >
          أستاذ جديد
        </Button>

        <StyledSidebarContent></StyledSidebarContent>
      </StyledContactSidebarHeader>
    </>
  );
};

export default SideBar;
