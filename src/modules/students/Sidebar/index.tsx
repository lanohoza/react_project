'use client';
import React, { useEffect, useState } from 'react';
import { Button, Col, Input, Modal, Row, Select } from 'antd';

import {
  DownloadOutlined,
  OrderedListOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { StyledContactSidebarHeader } from '../Listing/index.styled';
import {
  useStudentActionsContext,
  useStudentContext,
} from '../StudentContextProvider';
import {
  StyledSidebarContent,
  StyledSidebarItemContent,
  StyledSidebarTitle,
} from '../../notes/Sidebar/index.styled';
import { Year } from '@core/types/models/year/YearTypes';
import { GetClasseDto } from '@core/types/models/classe/ClasseTypes';
import { downloadStudentTemplateFile } from '@core/services/StudentService';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { downloadFile } from '@core/hooks/UrlHooks';
const SideBar = ({ }) => {
  const infoViewActionsContext = useInfoViewActionsContext();

  const { onOpenRemovedStudenModel, onCreate, setSelectedIdYear, onChangeClass, setOpenImportModel } =
    useStudentActionsContext();
  const { years, classes } = useStudentContext();
  const { Option } = Select;
  const downloadTemplate = () => {
    downloadStudentTemplateFile()
      /*  .then(response => console.log(response.data)
        );*/
      .then((response) => {
        console.log(`response`, response);
        downloadFile(response);

      })

  };

  return (
    <>
      <StyledContactSidebarHeader>
        <Row gutter={6}>
          <Col span={12}>
            <Button type='default' onClick={() => { setOpenImportModel(true) }} icon={<UploadOutlined />} size={'middle'}>
              إستيراد
            </Button>
          </Col>
          <Col span={12}>
            <Button type='primary' icon={<DownloadOutlined />} onClick={() => { downloadTemplate() }} size={'middle'}>
              النموذج
            </Button>
          </Col>
        </Row>
        <Row style={{ marginTop: '10px' }}>
          <Col span={24}>
            <Button
              style={{ background: '#faad14', color: "white" }}
              ghost
              onClick={() => {
                onCreate();
              }}
              type='dashed'
              icon={<PlusOutlined style={{ marginRight: 8 }} />}
            >
              تلميذ جديد
            </Button>
            <Button
              style={{ background: '#ff4d4f', color: "white" }}
              ghost
              onClick={() => {
                onOpenRemovedStudenModel(true)
              }}
              icon={<OrderedListOutlined style={{ marginRight: 8 }} />}
            >
              قوائم الشطب
            </Button>
          </Col>
        </Row>
      </StyledContactSidebarHeader>
      <StyledSidebarContent>
        <StyledSidebarTitle>الموسم الدراسي</StyledSidebarTitle>
        <StyledSidebarItemContent>
          <Select
            style={{ width: '100%' }}
            showSearch
            placeholder='الموسم الدراسي'
            onChange={(id) => setSelectedIdYear(id)}
          >
            {years?.map((year: Year) => {
              return (
                <Option value={year.id} key={year.id}>
                  {year.title}
                </Option>
              );
            })}
          </Select>
        </StyledSidebarItemContent>
        <StyledSidebarTitle>القسم</StyledSidebarTitle>
        <StyledSidebarItemContent>
          <Select
            style={{ width: '100%' }}
            onChange={onChangeClass}
            showSearch
            placeholder='القسم'
          >
            {classes.map((classe: GetClasseDto) => {
              return (
                <Option value={classe.id} key={classe.id}>
                  {classe.title}
                </Option>
              );
            })}
          </Select>
        </StyledSidebarItemContent>
      </StyledSidebarContent>
    </>
  );
};

export default SideBar;
