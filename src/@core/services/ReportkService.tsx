import axios from '@crema/services/axios/index';
import { environment } from '../../envirenement/environnement';
import { getDataApi, useGetDataApi } from '@crema/hooks/APIHooks';
import { InfoViewActions } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { ActivitiesReportDto } from '@core/types/models/reports/AcivirtiesReportTypes';
import { TaskReportDto } from '@core/types/models/reports/TaskReportTypes';
import { InterviewReportDto } from '@core/types/models/interview/InterviewTypes';
import { TmsReportDto } from '@core/types/models/reports/TmsReportTypes';
import { FollowupReportDto } from '@core/types/models/followUp/FollowupTypes';

const API_URL = `${environment._API}api/v1/repoerts`;

export const getActivitiesReportData = (
  infoViewContext: InfoViewActions,
): Promise<ActivitiesReportDto> => {
  return getDataApi<ActivitiesReportDto>(
    `${API_URL}/activities`,
    infoViewContext,
  ).then((response) => {
    return response;
  });
};
export const getFollowupsReportData = (
  infoViewContext: InfoViewActions,
): Promise<FollowupReportDto> => {
  return getDataApi<FollowupReportDto>(
    `${API_URL}/followups`,
    infoViewContext,
  ).then((response) => {
    return response;
  });
};
export const geInterviewsReportData = (
  infoViewContext: InfoViewActions,
): Promise<InterviewReportDto> => {
  return getDataApi<InterviewReportDto>(
    `${API_URL}/interviews`,
    infoViewContext,
  ).then((response) => {
    return response;
  });
};
export const getTmsReportData = (
  idTrimestre: number,
  infoViewContext: InfoViewActions,
): Promise<TmsReportDto> => {
  return getDataApi<TmsReportDto>(
    `${API_URL}/tms/${idTrimestre}`,
    infoViewContext,
  ).then((response) => {
    return response;
  });
};

export const getTaskReportData = (
  idTask: number,
  infoViewContext: InfoViewActions,
): Promise<TaskReportDto> => {
  return getDataApi<TaskReportDto>(
    `${API_URL}/task/${idTask}`,
    infoViewContext,
  ).then((response) => {
    return response;
  });
};
