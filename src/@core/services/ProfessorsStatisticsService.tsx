import axios from '@crema/services/axios/index';
import { environment } from '../../envirenement/environnement';
import { getDataApi, useGetDataApi } from '@crema/hooks/APIHooks';
import { Page } from '@core/types/models/core/models';
import { GetActivityDto } from '@core/types/models/activitity/ActivitityTypes';
import { DailyNotebookDto } from '@core/types/models/notebook/DailyNotebookTypes';
import { InfoViewActions } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import {
  GeneralStatisticsDto,
  ProfessorsBreaksDto,
  StudentsBreaksDto,
  StudentsDiseasesDto,
  StudentsNeedsDto,
} from '@core/types/models/statistics/StatisticsType';
import { ProfessorsCoordinatorsDto, ProfessorsMainsDto } from '@core/types/models/statistics/ProfessorStatisticsType';

const API_URL = `${environment._API}api/v1/statistics`;

export const getProfessorsBreaks = (
  infoViewContext: InfoViewActions,
): Promise<ProfessorsBreaksDto> => {
  return getDataApi<ProfessorsBreaksDto>(
    `${API_URL}/professors/breaks`,
    infoViewContext,
  ).then((response) => {
    return response;
  });
};

export const getProfessorsCoordinators = (
  infoViewContext: InfoViewActions,
): Promise<ProfessorsCoordinatorsDto> => {
  return getDataApi<ProfessorsCoordinatorsDto>(
    `${API_URL}/professors/coordinators`,
    infoViewContext,
  ).then((response) => {
    return response;
  });
};

export const getProfessorsMains = (
  infoViewContext: InfoViewActions,
): Promise<ProfessorsMainsDto> => {
  return getDataApi<ProfessorsMainsDto>(
    `${API_URL}/professors/mains`,
    infoViewContext,
  ).then((response) => {
    return response;
  });
};
