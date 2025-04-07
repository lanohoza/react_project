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
import { useNoteActionsContext, useNoteContext } from '../NoteContextProvider';

import {
    StyledSidebarContent,
    StyledSidebarItemContent,
    StyledSidebarTitle,
} from './index.styled';
import { GetClasseDto } from '@core/types/models/classe/ClasseTypes';
import { Year } from '@core/types/models/year/YearTypes';
import { Trimestre } from '@core/types/models/trimestre/TrimestreTypes';
import { size } from 'lodash';
import { downloadTemplateFile } from '@core/services/NoteService';
import { downloadFile } from '@core/hooks/UrlHooks';

const SideBar = ({ }) => {
    const { onCreate, onSelectYear, onChangeClass, onChangeTrimestre,setOpenImportModel,setOpenExportModel } =
        useNoteActionsContext();
    const { classes, years, trimestres, selectedIdClasse } = useNoteContext();
    const { Option } = Select;
    const downloadfile = () => {
        
       // if (selectedIdClasse != -1)

            downloadTemplateFile()
                .then(response => {
                    downloadFile(response);
                });
    /*    else
            message.warning("الرجاء إختر القسم")*/
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
