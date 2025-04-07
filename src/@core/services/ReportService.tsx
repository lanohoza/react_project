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

const API_URL = `${environment._API}api/v1/reports`;


export const getDailyReportData = (infoViewContext: InfoViewActions): Promise<DailyNotebookDto> => {
  return getDataApi<DailyNotebookDto>(`${API_URL}/daily`, infoViewContext).then(response => {
    return response
  });
};


