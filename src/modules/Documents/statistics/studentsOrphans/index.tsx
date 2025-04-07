'use client';
import React, { useEffect, useState } from 'react';
import ActivityReportDocument from '@core/Documents/Reports/ActivityReportDocument';
import DocumnetView from '@core/components/DocumnetView';
import { useSearchParams } from 'next/navigation';
import dayjs from 'dayjs';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { DailyNotebookDto } from '@core/types/models/notebook/DailyNotebookTypes';
import StudentsOrphansDocument from '@core/Documents/Statistics/StudentsOrphansDocument';
import { StudentsNeedsDto } from '@core/types/models/statistics/StatisticsType';
import { getStudentsOrphans } from '@core/services/StudentStatisticsService';


const StudentsOrphans = ({ }) => {
    const infoViewActionsContext = useInfoViewActionsContext();
    const [studentsNeedsDto, setStudentsNeedsDto] = useState<StudentsNeedsDto>({} as StudentsNeedsDto);
    const loadData = () => {
        getStudentsOrphans(infoViewActionsContext).then(datasource => setStudentsNeedsDto(datasource))
    }

    useEffect(() => {
        loadData();
    }, [])
    return (
        <>
            <DocumnetView >
                <StudentsOrphansDocument datasource={studentsNeedsDto}></StudentsOrphansDocument>
            </DocumnetView>
        </>
    );
};

export default StudentsOrphans;
