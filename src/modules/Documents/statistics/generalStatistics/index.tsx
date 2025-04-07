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
import GeneralStatisticsDocument from '@core/Documents/Statistics/GeneralStatisticsDocument';
import { GeneralStatisticsDto } from '@core/types/models/statistics/StatisticsType';
import { getGeneralStatistics } from '@core/services/StudentStatisticsService';


const ActivityReport = ({ }) => {
    const infoViewActionsContext = useInfoViewActionsContext();
    const [generalStatisticsDto, setGeneralStatisticsDto] = useState<GeneralStatisticsDto>({} as GeneralStatisticsDto);
    const loadData = () => {
        getGeneralStatistics(infoViewActionsContext).then(datasource => setGeneralStatisticsDto(datasource))
    }

    useEffect(() => {
        loadData();
    }, [])
    return (
        <>
            <DocumnetView >
                <GeneralStatisticsDocument datasource={generalStatisticsDto}></GeneralStatisticsDocument>
            </DocumnetView>
        </>
    );
};

export default ActivityReport;
