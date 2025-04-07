'use client';
import React, { useEffect, useState } from 'react';
import ActivityReportDocument from '@core/Documents/Reports/ActivityReportDocument';
import DocumnetView from '@core/components/DocumnetView';
import { useSearchParams } from 'next/navigation';
import dayjs from 'dayjs';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { DailyNotebookDto } from '@core/types/models/notebook/DailyNotebookTypes';
import ProfessorsMainsDocument from '@core/Documents/Statistics/ProfessorsMainsDocument';
import { ProfessorsMainsDto } from '@core/types/models/statistics/ProfessorStatisticsType';
import { getProfessorsMains } from '@core/services/ProfessorsStatisticsService';


const ProfessorsMains = ({ }) => {
    const infoViewActionsContext = useInfoViewActionsContext();
   const [professorsMainsDto, setProfessorsMainsDto] = useState<ProfessorsMainsDto>({} as ProfessorsMainsDto);
    const loadData = () => {
        getProfessorsMains(infoViewActionsContext).then(datasource => setProfessorsMainsDto(datasource))
    }

    useEffect(() => {
        loadData();
    }, [])
    return (
        <>
            <DocumnetView >
                <ProfessorsMainsDocument datasource={professorsMainsDto}></ProfessorsMainsDocument>
            </DocumnetView>
        </>
    );
};

export default ProfessorsMains;
