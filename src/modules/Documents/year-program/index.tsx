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
import YearProgramDocument from '@core/Documents/YearProgram';
import { CurrentYearProgramDto } from '@core/types/models/documents/YearProgramDocumentTypes';
import { getCurrentYearProgramData } from '@core/services/YearProgramDocumentService';
import ErrorBoundary from 'antd/es/alert/ErrorBoundary';


const YearProgramPrint = ({ }) => {
    const infoViewActionsContext = useInfoViewActionsContext();
    const [currentYearProgramDto, setCurrentYearProgramDto] = useState<CurrentYearProgramDto>({} as CurrentYearProgramDto);
    const loadData = () => {
        getCurrentYearProgramData(infoViewActionsContext).then(datasource => setCurrentYearProgramDto(datasource))
    }

    useEffect(() => {
        loadData();
    }, [])
    return (
        <>
            <DocumnetView >
                <ErrorBoundary>
                    <YearProgramDocument datasource={currentYearProgramDto}></YearProgramDocument>
                </ErrorBoundary>
            </DocumnetView>
        </>
    );
};

export default YearProgramPrint;
