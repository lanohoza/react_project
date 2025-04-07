import { TaskWithActionsDto } from '@core/types/models/task/TaskTypes';
import { InfoViewActions } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { environment } from "../../envirenement/environnement";
import { postDataApi } from '@crema/hooks/APIHooks';
import jwtAxios from '@crema/services/auth/jwt-auth';


const API_URL = `${environment._API}api/v1/action-tasks`;

// Create a new scolar year task
export const executeAction = async (id: number, infoViewActions: InfoViewActions): Promise<TaskWithActionsDto> => {
  return postDataApi(`${API_URL}/${id}/execute`, infoViewActions, {})
};

export const executeActionTest = async (): Promise<TaskWithActionsDto> => {
  return jwtAxios.get(`${environment._API}api/v1/actions/execute`);
};

export const actionDownloadFile = async (url: string): Promise<any> => {
  return jwtAxios.get(url, {
    responseType: 'blob', // Important to handle binary data
    withCredentials: true,
  })

};

