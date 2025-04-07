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
import { getAllTechnicalCardData, getCurrentYearProgramData, getTechnicalCardData } from '@core/services/YearProgramDocumentService';
import TechnicalCardDocuments from '@core/Documents/TechnicalCards';


const AllTechnicalCard = ({ }) => {
    const infoViewActionsContext = useInfoViewActionsContext();
    const [technicalCardsDocumentDto, setTechnicalCardsDocumentDto] = useState<TechnicalCardDocumentDto[]>([]);
    const loadData = () => {
            getAllTechnicalCardData(infoViewActionsContext).then(datasource => setTechnicalCardsDocumentDto(datasource))
    }

    useEffect(() => {
        loadData();
    }, [])
    return (
        <>
            <DocumnetView >
                <TechnicalCardDocuments datasources={technicalCardsDocumentDto}></TechnicalCardDocuments>
            </DocumnetView>
        </>
    );
};

export default AllTechnicalCard;
