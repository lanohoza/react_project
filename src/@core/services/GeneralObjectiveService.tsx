import { environment } from "../../envirenement/environnement";
import { GeneralObjective } from '@core/types/models/generalObjective/GeneralObjectiveTypes';
import jwtAxios from "@crema/services/auth/jwt-auth/index";
import { InfoViewActions } from "@crema/context/AppContextProvider/InfoViewContextProvider";
import { deleteDataApi, getDataApi, postDataApi } from "@crema/hooks/APIHooks";

const API_URL = `${environment._API}api/v1/general-objectives`;

// Create a new general objective
export const saveGeneralObjective = (objective: GeneralObjective, infoViewActionsContext: InfoViewActions): Promise<GeneralObjective> => {

  return postDataApi(`${API_URL}/save`, infoViewActionsContext, objective);

};

export const saveFromAdmin = (objective: GeneralObjective, infoViewActionsContext: InfoViewActions): Promise<GeneralObjective> => {

  return postDataApi(`${API_URL}/saveFromAdmin`, infoViewActionsContext, objective);

};


export const deleteGeneralObjective = (id: number, infoViewActionsContext: InfoViewActions): Promise<GeneralObjective> => {

  return deleteDataApi(`${API_URL}/delete/${id}`, infoViewActionsContext);

};


// Get general objectives by CreatedBy (token)
export const getGeneralObjectivesByCreatedBy = async (page: number = 0, size: number = 10): Promise<GeneralObjective[]> => {
  try {
    const response = await jwtAxios.get(`${API_URL}/findByCreatedBy`, {
      params: {
        page,
        size
      }
    });
    return response.data.content;
  } catch (error) {
    console.error(`Error fetching General Objectives by CreatedBy :`, error);
    throw error;
  }
};

export const getAllGeneralObjectivesCreatedBy = (infoViewActionsContext: InfoViewActions): Promise<GeneralObjective[]> => {
  return getDataApi<GeneralObjective[]>(`${API_URL}/allCreatedBy`, infoViewActionsContext)
};

export const getAllGeneralObjectivesCreatedByAdmin = (infoViewActionsContext: InfoViewActions): Promise<GeneralObjective[]> => {
  return getDataApi<GeneralObjective[]>(`${API_URL}/allCreatedByAdmin`, infoViewActionsContext)
};