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
import ProfessorsBreakDocument from '@core/Documents/Statistics/ProfessorsBreakDocument';
import { ProfessorsBreaksDto } from '@core/types/models/statistics/StatisticsType';
import { getProfessorsBreaks } from '@core/services/ProfessorsStatisticsService';

const ProfessorsBreaks = ({}) => {
  const infoViewActionsContext = useInfoViewActionsContext();
  const [professorsBreaksDto, setProfessorsBreaksDto] =
    useState<ProfessorsBreaksDto>({} as ProfessorsBreaksDto);
  const loadData = () => {
    getProfessorsBreaks(infoViewActionsContext).then((datasource) =>
      setProfessorsBreaksDto(datasource),
    );
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <>
      <DocumnetView>
        <ProfessorsBreakDocument
          datasource={professorsBreaksDto}
        ></ProfessorsBreakDocument>
      </DocumnetView>
    </>
  );
};

export default ProfessorsBreaks;
