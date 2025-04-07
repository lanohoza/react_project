'use client';
import React, { useEffect, useState } from 'react';
import DocumnetView from '@core/components/DocumnetView';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { getActivitiesReportData } from '@core/services/ReportkService';
import { ActivitiesReportDto } from '@core/types/models/reports/AcivirtiesReportTypes';
import TmsReportDocument from '@core/Documents/Reports/TmsReportDocument';


const ActivityReport = ({ }) => {
    const infoViewActionsContext = useInfoViewActionsContext();
    const [activitiesReportDto, setActivitiesReportDto] = useState<ActivitiesReportDto>({} as ActivitiesReportDto);
    const loadData = () => {
        getActivitiesReportData(infoViewActionsContext).then(datasource => setActivitiesReportDto(datasource))
    }

    useEffect(() => {
        loadData();
    }, [])
    return (
        <>
            <DocumnetView >
                <TmsReportDocument datasource={activitiesReportDto}></TmsReportDocument>
            </DocumnetView>
        </>
    );
};

export default ActivityReport;
