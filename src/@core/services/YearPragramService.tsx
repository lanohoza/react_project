import { Task } from '@core/types/models/task/TaskTypes';
import { InfoViewActions } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { deleteDataApi, getDataApi, postDataApi, useGetDataApi } from '@crema/hooks/APIHooks';
import { environment } from "../../envirenement/environnement";
import { Page } from '@core/types/models/core/models';
import { TechnicalCard, TechnicalCardYearDto } from '@core/types/models/technicalCards/TechnicalCardTypes';
import { getDairaById } from './DairaService';


const API_URL = `${environment._API}api/v1/year-programs`;


// Function to get Tasks for current year by user
export const useGetYearProgramTasks = () => {
  return useGetDataApi<Page<TechnicalCardYearDto>>(
    `${API_URL}/search`
  );
};


// Function to get Tasks for current year by user
export const getNotImplementedTechnicalCard = (search: string, page: number, size: number, InfoViewActions: InfoViewActions) => {
  return getDataApi<Page<TechnicalCard>>(
    `${API_URL}/tc-search?search=${search}&page=${page}&size=${size}`, InfoViewActions
  );
};
// Function to get Tasks for current year by user
export const implementTechnicalCards = (ids: number[], InfoViewActions: InfoViewActions) => {
  return postDataApi<boolean>(`${API_URL}/implement`, InfoViewActions, ids);
};

export const deleteTaskYearProgram = (id: number, InfoViewActions: InfoViewActions) => {
  return deleteDataApi<boolean>(`${API_URL}/delete-task/${id}`, InfoViewActions);
};
// Function to get Tasks for current year by user
export const getCurrentWeekTasks = (InfoViewActions: InfoViewActions) => {
  return getDataApi<TechnicalCardYearDto[]>(
    `${API_URL}/current-week-tasks`, InfoViewActions
  );
};

// Function to get Tasks for current year by user
export const executeTask = (id: number, InfoViewActions: InfoViewActions) => {
  return postDataApi<boolean>(`${API_URL}/task/${id}/execute`, InfoViewActions, {});
};

export const getAllByUserAndYear = (InfoViewActions: InfoViewActions) => {
  return getDataApi<TechnicalCardYearDto[]>(
    `${API_URL}/getAllByUserAndYear`,
    InfoViewActions
  );
};

export const getAllPermanentByUserAndYear = (InfoViewActions: InfoViewActions) => {
  return getDataApi<TechnicalCardYearDto[]>(
    `${API_URL}/getAllPermanentByUserAndYear`,
    InfoViewActions
  );
};

export const getAllTaskByUserAndYear = (InfoViewActions: InfoViewActions) => {
  return getDataApi<TechnicalCardYearDto[]>(
    `${API_URL}/getAllTaskByUserAndYear`, InfoViewActions
  );
};