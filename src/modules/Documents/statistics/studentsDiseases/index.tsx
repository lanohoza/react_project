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
import StudentsDiseaseDocument from '@core/Documents/Statistics/StudentsDiseaseDocument';
import { StudentsDiseasesDto } from '@core/types/models/statistics/StatisticsType';
import { getStudentsDiseases } from '@core/services/StudentStatisticsService';


const StudentsDiseases = ({ }) => {
    const infoViewActionsContext = useInfoViewActionsContext();
     const [studentsDiseasesDto, setStudentsDiseasesDto] = useState<StudentsDiseasesDto>({} as StudentsDiseasesDto);
    const loadData = () => {
        getStudentsDiseases(infoViewActionsContext).then(datasource => setStudentsDiseasesDto(datasource))
    }

    useEffect(() => {
        loadData();
    }, [])
    return (
        <>
            <DocumnetView >
                <StudentsDiseaseDocument datasource={studentsDiseasesDto}></StudentsDiseaseDocument>
            </DocumnetView>
        </>
    );
};

export default StudentsDiseases;
