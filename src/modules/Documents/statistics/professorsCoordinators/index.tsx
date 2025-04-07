'use client';
import React, { useEffect, useState } from 'react';
import ActivityReportDocument from '@core/Documents/Reports/ActivityReportDocument';
import DocumnetView from '@core/components/DocumnetView';
import { useSearchParams } from 'next/navigation';
import dayjs from 'dayjs';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { DailyNotebookDto } from '@core/types/models/notebook/DailyNotebookTypes';
import ProfessorsCoordinatorsDocument from '@core/Documents/Statistics/ProfessorsCoordinatorsDocument';
import { getProfessorsCoordinators } from '@core/services/ProfessorsStatisticsService';
import { ProfessorsCoordinatorsDto } from '@core/types/models/statistics/ProfessorStatisticsType';


const ProfessorsCoordinators = ({ }) => {
    const infoViewActionsContext = useInfoViewActionsContext();
    const [professorsCoordinatorsDto, setProfessorsCoordinatorsDto] = useState<ProfessorsCoordinatorsDto>({} as ProfessorsCoordinatorsDto);
    const loadData = () => {
        getProfessorsCoordinators(infoViewActionsContext).then(datasource => setProfessorsCoordinatorsDto(datasource))
    }

    useEffect(() => {
        loadData();
    }, [])
    return (
        <>
            <DocumnetView >
                <ProfessorsCoordinatorsDocument datasource={professorsCoordinatorsDto}></ProfessorsCoordinatorsDocument>
            </DocumnetView>
        </>
    );
};

export default ProfessorsCoordinators;
