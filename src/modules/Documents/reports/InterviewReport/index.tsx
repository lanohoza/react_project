'use client';
import React, { useEffect, useState } from 'react';
import ActivityReportDocument from '@core/Documents/Reports/ActivityReportDocument';
import DocumnetView from '@core/components/DocumnetView';
import { useSearchParams } from 'next/navigation';
import dayjs from 'dayjs';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { DailyNotebookDto } from '@core/types/models/notebook/DailyNotebookTypes';
import { geInterviewsReportData } from '@core/services/ReportkService';
import TaskReportDocument from '@core/Documents/Reports/TaskReportDocument';
import { TaskReportDto } from '@core/types/models/reports/TaskReportTypes';
import InterviewReportDocument from '@core/Documents/Reports/InterviewReportDocument';
import {  InterviewReportDto } from '@core/types/models/interview/InterviewTypes';


const TaskReport = ({ }) => {
  const infoViewActionsContext = useInfoViewActionsContext();
  const [interviewReportDto, setInterviewReportDto] = useState<InterviewReportDto>({} as InterviewReportDto);
  const loadData = () => {
    geInterviewsReportData(infoViewActionsContext).then(datasource => setInterviewReportDto(datasource))
  }

  useEffect(() => {
      loadData();
  }, [])

  useEffect(() => {
    loadData();
  }, []);
  return (
    <>
      <DocumnetView >
        <InterviewReportDocument datasource={interviewReportDto}></InterviewReportDocument>
      </DocumnetView>
    </>
  );
};

export default TaskReport;
