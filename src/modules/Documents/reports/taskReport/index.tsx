'use client';
import React, { useEffect, useState } from 'react';
import ActivityReportDocument from '@core/Documents/Reports/ActivityReportDocument';
import DocumnetView from '@core/components/DocumnetView';
import { useSearchParams } from 'next/navigation';
import dayjs from 'dayjs';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { DailyNotebookDto } from '@core/types/models/notebook/DailyNotebookTypes';
import { getActivitiesReportData, getTaskReportData } from '@core/services/ReportkService';
import TaskReportDocument from '@core/Documents/Reports/TaskReportDocument';
import { TaskReportDto } from '@core/types/models/reports/TaskReportTypes';


const TaskReport = ({ }) => {
    const infoViewActionsContext = useInfoViewActionsContext();
  const [taskReportDto, setTaskReportDto] =
    useState<TaskReportDto>({} as TaskReportDto);
  const searchParams = useSearchParams();

  const loadData = () => {
    const idTask = parseInt(searchParams.get('ts'));
    getTaskReportData(idTask, infoViewActionsContext).then((datasource) =>
        setTaskReportDto(datasource),
    );
  };

  useEffect(() => {
    loadData();
  }, []);
    return (
        <>
            <DocumnetView >
                <TaskReportDocument datasource={taskReportDto}></TaskReportDocument>
            </DocumnetView>
        </>
    );
};

export default TaskReport;
