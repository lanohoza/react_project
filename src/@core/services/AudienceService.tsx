import { environment } from '../../envirenement/environnement';
import { Audience } from '@core/types/models/audience/AudienceTypes';
import { InfoViewActions } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { getDataApi } from '@crema/hooks/APIHooks';
import jwtAxios from '@crema/services/auth/jwt-auth/index';

const API_URL = `${environment._API}api/v1/audiences`;

// Get all audiences
export const getAllAudiences = (infoViewContext: InfoViewActions): Promise<Audience[]> => {

  return getDataApi(`${API_URL}/all`, infoViewContext);
};

// Get an audience by ID
export const getAudienceById = async (id: number): Promise<Audience | null> => {
  try {
    const response = await jwtAxios.get(`${API_URL}/findById/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching audience with id ${id}:`, error);
    throw error;
  }
};

// Create a new audience
export const createAudience = async (audience: Audience): Promise<Audience> => {
  try {
    const response = await jwtAxios.post(`${API_URL}/save`, audience);
    return response.data;
  } catch (error) {
    console.error("Error creating audience:", error);
    throw error;
  }
};

// Update an audience
export const updateAudience = async (id: number, audience: Audience): Promise<Audience> => {
  try {
    const response = await jwtAxios.put(`${API_URL}/update/${id}`, audience);
    return response.data;
  } catch (error) {
    console.error(`Error updating audience with id ${id}:`, error);
    throw error;
  }
};

// Delete an audience
export const deleteAudience = async (id: number): Promise<boolean> => {
  try {
    const response = await jwtAxios.delete(`${API_URL}/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting audience with id ${id}:`, error);
    throw error;
  }
};
