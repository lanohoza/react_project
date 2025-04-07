import { OfficialTxt } from '@core/types/models/officialTxt/OfficialTxtTypes';
import jwtAxios from '@crema/services/auth/jwt-auth/index';
import { environment } from '../../envirenement/environnement';
import { deleteDataApi, getDataApi, postDataApi } from '@crema/hooks/APIHooks';
import { InfoViewActions } from '@crema/context/AppContextProvider/InfoViewContextProvider';

const API_URL = `${environment._API}api/v1/official-txts`;

// Get all official texts
export const getAllOfficialTxts = async (infoViewActionsContext: InfoViewActions): Promise<OfficialTxt[]> => {
  return getDataApi<OfficialTxt[]>(`${API_URL}/all`, infoViewActionsContext);
};

// Get an official text by ID
export const getOfficialTxtById = async (id: number): Promise<OfficialTxt | null> => {
  try {
    const response = await jwtAxios.get(`${API_URL}/getById/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching official text with id ${id}:`, error);
    throw error;
  }
};

// Create a new official text
export const SaveOfficialTxt = async (officialTxt: OfficialTxt, infoViewActionsContext: InfoViewActions): Promise<OfficialTxt> => {
  return postDataApi(`${API_URL}/save`, infoViewActionsContext, officialTxt);
};

// Update an official text
export const updateOfficialTxt = async (id: number, officialTxt: OfficialTxt): Promise<OfficialTxt> => {
  try {
    const response = await jwtAxios.put(`${API_URL}/update/${id}`, officialTxt);
    return response.data;
  } catch (error) {
    console.error(`Error updating official text with id ${id}:`, error);
    throw error;
  }
};

export const deleteOfficialTxt = (id: number, infoViewActionsContext: InfoViewActions): Promise<boolean> => {
  return deleteDataApi(`${API_URL}/delete/${id}`, infoViewActionsContext);
};