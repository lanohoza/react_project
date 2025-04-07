import axios from '@crema/services/axios/index';
import { environment } from '../../envirenement/environnement';
import { deleteDataApi, getDataApi, postDataApi, putDataApi, useGetDataApi } from '@crema/hooks/APIHooks';
import { InfoViewActions } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { Page } from '@core/types/models/core/models';
import { GetDesireDto, Desire, AddEditDesireDto } from '@core/types/models/desire/DesireTypes';
import jwtAxios from '@crema/services/auth/jwt-auth';

const API_URL = `${environment._API}api/v1/desires`;

// Get all Desires
export const findDesireByStudentAndTrimestre = (idStudent: number, idTrimestre: number, infoViewContext: InfoViewActions,
): Promise<Desire> => {
  try {
    const response = getDataApi<Desire>(`${API_URL}/find/${idStudent}/${idTrimestre}`, infoViewContext);
    return response;
  } catch (error) {
    console.error("Error fetching Desires:", error);
    throw error;
  }
};
export const useGetSearchDesires = () => {
  return useGetDataApi<Page<GetDesireDto>>(`${API_URL}/search`, undefined);
};


export const importFile = (idClasse: number, idTrimestre: number, formData: any, infoViewContext: InfoViewActions,
): Promise<any> => {
  try {
    return postDataApi<any>(`${API_URL}/import/${idClasse}/${idTrimestre}`, infoViewContext, formData, true, {
      'content-type': 'multipart/form-data'
    });
  } catch (error) {
    throw error;
  }
};
// Create a new Desire
export const saveDesire = async (Desire: AddEditDesireDto, infoViewActionsContext: InfoViewActions) => {
  return postDataApi(`${API_URL}/save`, infoViewActionsContext, Desire);
};


// Delete an Desire
export const deleteDesire = async (studentId: number,idGuidanceSpeciality:number, infoViewActionsContext: InfoViewActions): Promise<void> => {
  return  deleteDataApi(`${API_URL}/delete/${studentId}/${idGuidanceSpeciality}`, infoViewActionsContext);
};
export const downloadTemplateFile = async (): Promise<any> => {
  return jwtAxios.get(`${API_URL}/export/template`, {
    responseType: 'blob', // Important to handle binary data
    withCredentials: true,

  })

};