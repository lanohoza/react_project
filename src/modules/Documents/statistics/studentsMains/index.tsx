'use client';
import React, { useEffect, useState } from 'react';
import DocumnetView from '@core/components/DocumnetView';
import { useSearchParams } from 'next/navigation';
import dayjs from 'dayjs';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import StudentsMainsDocument from '@core/Documents/Statistics/StudentsMainsDocument';
import { StudentsMainsDto } from '@core/types/models/statistics/StatisticsType';
import { getStudentsMains } from '@core/services/StudentStatisticsService';


const ProfessorsMains = ({ }) => {
    const infoViewActionsContext = useInfoViewActionsContext();
    const [studentsMainsDto, setStudentsMainsDto] = useState<StudentsMainsDto>({} as StudentsMainsDto);
    const loadData = () => {
        getStudentsMains(infoViewActionsContext).then(datasource => setStudentsMainsDto(datasource))
    }

    useEffect(() => {
        loadData();
    }, [])
    return (
        <>
            <DocumnetView >
                <StudentsMainsDocument datasource={studentsMainsDto}></StudentsMainsDocument>
            </DocumnetView>
        </>
    );
};

export default ProfessorsMains;
