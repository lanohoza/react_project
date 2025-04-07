import { Task } from '@core/types/models/task/TaskTypes';
import { TaskWithActionsDto } from '@core/types/models/task/TaskTypes';
import { InfoViewActions } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { environment } from "../../envirenement/environnement";
import { getDataApi, useGetDataApi } from '@crema/hooks/APIHooks';
import { Page } from '@core/types/models/core/models';
import { TechnicalCardYearDto } from '@core/types/models/technicalCards/TechnicalCardTypes';


const API_URL = `${environment._API}api/v1/tasks`;

// Create a new scolar year task
export const getTaskWithActions = async (id: string | string[], infoViewActions: InfoViewActions): Promise<TaskWithActionsDto> => {
  return getDataApi(`${API_URL}/${id}/actions`, infoViewActions)
};

export const useGetSearchDonneTasks =  () => {
  return useGetDataApi<Page<TechnicalCardYearDto>>(
    `${API_URL}/donne-search`
  );
};
