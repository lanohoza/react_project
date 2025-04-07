'use client';
import React, { useEffect, useState } from 'react';
import {
    Button,
    Col,
    Divider,
    Form,
    Input,
    message,
    Modal,
    Radio,
    Row,
    Select,
} from 'antd';

import { DownloadOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { StyledContactSidebarHeader } from '../Listing/index.styled';

import {
    StyledSidebarContent,
    StyledSidebarItemContent,
    StyledSidebarTitle,
} from './index.styled';
import { GetClasseDto } from '@core/types/models/classe/ClasseTypes';
import { Year } from '@core/types/models/year/YearTypes';
import { Trimestre } from '@core/types/models/trimestre/TrimestreTypes';
import { size } from 'lodash';
import { downloadFile } from '@core/hooks/UrlHooks';
import { useDesireActionsContext, useDesireContext } from '../DesireContextProvider';

const SideBar = ({ }) => {
    const { onCreate, onSelectYear, onChangeClass, onChangeTrimestre,setOpenImportModel,setOpenExportModel } =
        useDesireActionsContext();
    const { classes, years, trimestres, selectedIdClasse } = useDesireContext();
    const { Option } = Select;
    const downloadfile = () => {
        


    }
    return (
        <>
            <StyledContactSidebarHeader>
                <Row gutter={6}>
                    <Col span={12}>
                        <Button type='default' onClick={()=>{setOpenImportModel(true)}} icon={<UploadOutlined />} size={"middle"}>
                            إستيراد
                        </Button></Col>
                    <Col span={12}>
                        <Button onClick={()=>{downloadfile()}} type='primary' icon={<DownloadOutlined />} size={"middle"}>
                            النموذج
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
                        onChange={onSelectYear}
                    >
                        {years.map((year: Year) => {
                            return (
                                <Option value={year.id} key={year.id}>
                                    {year.title}
                                </Option>
                            );
                        })}
                    </Select>
                </StyledSidebarItemContent>
                <StyledSidebarTitle>الفصل</StyledSidebarTitle>
                <StyledSidebarItemContent>
                    <Select
                        style={{ width: '100%' }}
                        showSearch
                        onChange={onChangeTrimestre}
                        placeholder='الفصل'
                    >
                        {trimestres.map((trimestre: Trimestre) => {
                            return (
                                <Option value={trimestre.id} key={trimestre.id}>
                                    {trimestre.title}
                                </Option>
                            );
                        })}
                    </Select>
                </StyledSidebarItemContent>
                <StyledSidebarTitle>القسم</StyledSidebarTitle>
                <StyledSidebarItemContent>
                    <Select style={{ width: '100%' }} onChange={onChangeClass}
                        showSearch placeholder='القسم'>
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
