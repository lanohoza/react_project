import axios from '@crema/services/axios/index';
import { environment } from '../../envirenement/environnement';
import {
  getDataApi,
  useGetDataApi,
} from '@crema/hooks/APIHooks';
import { Page } from '@core/types/models/core/models';
import { GetActivityDto } from '@core/types/models/activitity/ActivitityTypes';
import { DailyNotebookDto } from '@core/types/models/notebook/DailyNotebookTypes';
import { InfoViewActions } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { GeneralStatisticsDto, ProfessorsBreaksDto, StudentsBreaksDto, StudentsDiseasesDto, StudentsMainsDto, StudentsNeedsDto } from '@core/types/models/statistics/StatisticsType';

const API_URL = `${environment._API}api/v1/statistics`;


export const getGeneralStatistics = (infoViewContext: InfoViewActions): Promise<GeneralStatisticsDto> => {
  return getDataApi<GeneralStatisticsDto>(`${API_URL}/general`, infoViewContext).then(response => {
    return response
  });
};

export const getStudentsBreaks = (infoViewContext: InfoViewActions): Promise<StudentsBreaksDto> => {
  return getDataApi<StudentsBreaksDto>(`${API_URL}/students/breaks`, infoViewContext).then(response => {
    return response
  });
};



export const getStudentsDiseases = (infoViewContext: InfoViewActions): Promise<StudentsDiseasesDto> => {
  return getDataApi<StudentsDiseasesDto>(`${API_URL}/students/diseases`, infoViewContext).then(response => {
    return response
  });
};

export const getStudentsNeeds = (infoViewContext: InfoViewActions): Promise<StudentsNeedsDto> => {
  return getDataApi<StudentsNeedsDto>(`${API_URL}/students/needs`, infoViewContext).then(response => {
    return response
  });
};

export const getStudentsOrphans = (infoViewContext: InfoViewActions): Promise<StudentsNeedsDto> => {
  return getDataApi<StudentsNeedsDto>(`${API_URL}/students/orphans`, infoViewContext).then(response => {
    return response
  });
};


export const getStudentsMains = (infoViewContext: InfoViewActions): Promise<StudentsMainsDto> => {
  return getDataApi<StudentsMainsDto>(`${API_URL}/students/mains`, infoViewContext).then(response => {
    return response
  });
};