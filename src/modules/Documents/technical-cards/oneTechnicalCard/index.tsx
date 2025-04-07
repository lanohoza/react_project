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
import { CurrentYearProgramDto, TechnicalCardDocumentDto } from '@core/types/models/documents/YearProgramDocumentTypes';
import { getCurrentYearProgramData, getTechnicalCardData } from '@core/services/YearProgramDocumentService';
import TechnicalCardDocument from '@core/Documents/TechnicalCard';


const OneTechnicalCard = ({ }) => {
    const infoViewActionsContext = useInfoViewActionsContext();
    const [technicalCardDocumentDto, setTechnicalCardDocumentDto] = useState<TechnicalCardDocumentDto>({} as TechnicalCardDocumentDto);
    const searchParams = useSearchParams();
    const loadData = () => {
        const idTechnicalCard = parseInt(searchParams.get('tc'));
        if (idTechnicalCard)
            getTechnicalCardData(idTechnicalCard,infoViewActionsContext).then(datasource => setTechnicalCardDocumentDto(datasource))
    }

    useEffect(() => {
        loadData();
    }, [])
    return (
        <>
            <DocumnetView >
                <TechnicalCardDocument datasource={technicalCardDocumentDto}></TechnicalCardDocument>
            </DocumnetView>
        </>
    );
};

export default OneTechnicalCard;
