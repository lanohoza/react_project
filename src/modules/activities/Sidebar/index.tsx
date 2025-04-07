'use client';
import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Input, Modal, Row, Select } from 'antd';

import { PlusOutlined } from '@ant-design/icons';
import { StyledContactSidebarHeader } from '../Listing/index.styled';
import { Year } from '@core/types/models/year/YearTypes';
import { StyledSidebarContent, StyledSidebarTitle, StyledSidebarItemContent } from '../../notes/Sidebar/index.styled';
import { useActivityActionsContext } from '../activityContextProvider';
import { environment } from '../../../envirenement/environnement';

export interface Filtter {
    start: string;
    end: string;
}

const SideBar = ({ }) => {
    const { setFiltter } = useActivityActionsContext();

    const { setOpenActivityReportModal } = useActivityActionsContext();

    const { Option } = Select;
    const { RangePicker } = DatePicker;
    const onApplayFiltter = (values) => {
        setFiltter({
            start: values[0],
            end: values[1],
        } as Filtter);
    };
    const onPrintReportActivities = () => {
        const url = `${environment?.BASE_PATH ?? ''}/pdf/reports/activities`;
        window.open(url, '_blank');
        //router.push("notebooks/activities?d=" +);/// day.format("YYYYMMDD"));
    };
    return (
        <>
            <StyledContactSidebarHeader>
                <Button

                    onClick={() => { onPrintReportActivities()}}
                    type='primary'
                >
                    سجل النشاطات اليومية
                </Button>
        

                <StyledSidebarContent>

                    <StyledSidebarTitle>التصفية التاريخ</StyledSidebarTitle>
                    <StyledSidebarItemContent>
                        <RangePicker
                            onChange={(_, dateStrings) => onApplayFiltter(dateStrings)}
                        />

                    </StyledSidebarItemContent>
                </StyledSidebarContent>

            </StyledContactSidebarHeader>



        </>
    );
};

export default SideBar;



