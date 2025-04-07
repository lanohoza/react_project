'use client';
import React, { useEffect, useState } from 'react';
import DocumnetView from '@core/components/DocumnetView';
import dayjs from 'dayjs';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { DailyNotebookDto } from '@core/types/models/notebook/DailyNotebookTypes';
import StudentsNeedsDocument from '@core/Documents/Statistics/StudentsNeedsDocument';
import { StudentsNeedsDto } from '@core/types/models/statistics/StatisticsType';
import { getStudentsNeeds } from '@core/services/StudentStatisticsService';


const StudentsNeeds = ({ }) => {
    const infoViewActionsContext = useInfoViewActionsContext();
    const [studentsNeedsDto, setStudentsNeedsDto] = useState<StudentsNeedsDto>({} as StudentsNeedsDto);
    const loadData = () => {
        getStudentsNeeds(infoViewActionsContext).then(datasource => setStudentsNeedsDto(datasource))
    }

    useEffect(() => {
        loadData();
    }, [])
    return (
        <>
            <DocumnetView >
                <StudentsNeedsDocument datasource={studentsNeedsDto}></StudentsNeedsDocument>
            </DocumnetView>
        </>
    );
};

export default StudentsNeeds;
