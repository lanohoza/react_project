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
import { CurrentYearProgramDto, TechnicalCardDocumentDto } from '@core/types/models/documents/YearProgramDocumentTypes';

const API_URL = `${environment._API}api/v1/year-program/documents`;


export const getCurrentYearProgramData = (infoViewContext: InfoViewActions): Promise<CurrentYearProgramDto> => {
  return getDataApi<CurrentYearProgramDto>(`${API_URL}/current`, infoViewContext).then(response => {
    return response
  });
};

export const getTechnicalCardData = (idTechnicalCard: number, infoViewContext: InfoViewActions): Promise<TechnicalCardDocumentDto> => {
  return getDataApi<TechnicalCardDocumentDto>(`${API_URL}/technical-card/${idTechnicalCard}`, infoViewContext).then(response => {
    return response
  });
};

export const getAllTechnicalCardData = (infoViewContext: InfoViewActions): Promise<TechnicalCardDocumentDto[]> => {
  return getDataApi<TechnicalCardDocumentDto[]>(`${API_URL}/technical-cards`, infoViewContext).then(response => {
    return response
  });
};