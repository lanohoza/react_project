import { HumanTool } from '@core/types/models/humanTool/HumanToolTypes';
import jwtAxios from '@crema/services/auth/jwt-auth/index';
import { environment } from "../../envirenement/environnement";
import { deleteDataApi, getDataApi, postDataApi } from '../../@crema/hooks/APIHooks';
import { InfoViewActions, useInfoViewActionsContext } from '../../@crema/context/AppContextProvider/InfoViewContextProvider';

const API_URL = `${environment._API}api/v1/human-tools`;




// Update a human tool
export const SaveHumanTool = async (humanTool: HumanTool, infoViewActionsContext: InfoViewActions): Promise<HumanTool> => {
  return postDataApi(`${API_URL}/save`, infoViewActionsContext, humanTool);
};

export const saveFromAdministration = async (humanTool: HumanTool, infoViewActionsContext: InfoViewActions): Promise<HumanTool> => {
  return postDataApi(`${API_URL}/saveFromAdministration`, infoViewActionsContext, humanTool);

};

// Delete a human tool
export const deleteHumanTool = (id: number, infoViewActionsContext: InfoViewActions): Promise<boolean> => {
  return deleteDataApi(`${API_URL}/delete/${id}`, infoViewActionsContext);
};

// Get human tools by created by user
export const getHumanToolsByCreatedBy = async (page = 0, size = 10): Promise<HumanTool[]> => {
  try {
    const response = await jwtAxios.get(`${API_URL}/created-by`, {
      params: { page, size }
    });
    return response.data.content;
  } catch (error) {
    console.error(`Error fetching Human Tools created by user:`, error);
    throw error;
  }
};

export const getAllHumanToolsCreatedBy = async (infoViewActionsContext: InfoViewActions): Promise<HumanTool[]> => {

  return getDataApi<HumanTool[]>(`${API_URL}/all-created-by`, infoViewActionsContext)

};

export const getAllHumanToolsCreatedByAdmin = async (infoViewActionsContext: InfoViewActions): Promise<HumanTool[]> => {

  return getDataApi<HumanTool[]>(`${API_URL}/all-created-by-admin`, infoViewActionsContext)

};