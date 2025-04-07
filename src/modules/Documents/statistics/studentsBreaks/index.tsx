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
import StudentsBreakDocuments from '@core/Documents/Statistics/StudentsBreakDocument';
import { StudentsBreaksDto } from '@core/types/models/statistics/StatisticsType';
import { getStudentsBreaks } from '@core/services/StudentStatisticsService';


const ActivityReport = ({ }) => {
    const infoViewActionsContext = useInfoViewActionsContext();
    const [studentsBreaksDto, setStudentsBreaksDto] = useState<StudentsBreaksDto>({} as StudentsBreaksDto);
    const loadData = () => {
        getStudentsBreaks(infoViewActionsContext).then(datasource => setStudentsBreaksDto(datasource))
    }

    useEffect(() => {
        loadData();
    }, [])
    return (
        <>
            <DocumnetView >
                <StudentsBreakDocuments datasource={studentsBreaksDto}></StudentsBreakDocuments>
            </DocumnetView>
        </>
    );
};

export default ActivityReport;
