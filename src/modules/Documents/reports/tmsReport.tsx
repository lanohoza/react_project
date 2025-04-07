'use client';
import React, { useEffect, useState } from 'react';
import DocumnetView from '@core/components/DocumnetView';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import {
  getActivitiesReportData,
  getTmsReportData,
} from '@core/services/ReportkService';
import { ActivitiesReportDto } from '@core/types/models/reports/AcivirtiesReportTypes';
import TmsReportDocument from '@core/Documents/Reports/TmsReportDocument';

import { useSearchParams } from 'next/navigation';
import { TmsReportDto } from '@core/types/models/statistics/StatisticsType';

const ActivityReport = ({}) => {
  const infoViewActionsContext = useInfoViewActionsContext();
  const [tmsReportDto, setTmsReportDto] =
    useState<TmsReportDto>({} as TmsReportDto);
  const searchParams = useSearchParams();

  const loadData = () => {
    const idTms = parseInt(searchParams.get('trm'));
    console.log(idTms);
    
    getTmsReportData(idTms, infoViewActionsContext).then((datasource) =>
      setTmsReportDto(datasource),
    );
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <>
      <DocumnetView>
        <TmsReportDocument datasource={tmsReportDto}></TmsReportDocument>
      </DocumnetView>
    </>
  );
};

export default ActivityReport;
