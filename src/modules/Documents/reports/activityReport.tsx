'use client';
import React, { useEffect, useState } from 'react';
import ActivityReportDocument from '@core/Documents/Reports/ActivityReportDocument';
import DocumnetView from '@core/components/DocumnetView';
import { useSearchParams } from 'next/navigation';
import dayjs from 'dayjs';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { DailyNotebookDto } from '@core/types/models/notebook/DailyNotebookTypes';
import { getActivitiesReportData } from '@core/services/ReportkService';
import { ActivitiesReportDto } from '@core/types/models/reports/AcivirtiesReportTypes';


const ActivityReport = ({ }) => {
    const infoViewActionsContext = useInfoViewActionsContext();
    const [activitiesReportDto, setActivitiesReportDto] = useState<ActivitiesReportDto>({} as ActivitiesReportDto);
    const loadData = () => {
        getActivitiesReportData(infoViewActionsContext).then(datasource => setActivitiesReportDto(datasource))
    }

    useEffect(() => {
        loadData();
    }, [])
    return (
        <>
            <DocumnetView >
                <ActivityReportDocument datasource={activitiesReportDto}></ActivityReportDocument>
            </DocumnetView>
        </>
    );
};

export default ActivityReport;
