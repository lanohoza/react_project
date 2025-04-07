import axios from '@crema/services/axios/index';
import { environment } from '../../envirenement/environnement';
import { getDataApi, postDataApi, putDataApi, useGetDataApi } from '@crema/hooks/APIHooks';
import { Level } from '@core/types/models/level/LevelTypes';
import { InfoViewActions } from '@crema/context/AppContextProvider/InfoViewContextProvider';

const API_URL = `${environment._API}api/v1/levels`;

// Get all Levels
export const getAllLevels = (infoViewContext: InfoViewActions,
): Promise<Level[]> => {
  try {
    const response = getDataApi<Level[]>(`${API_URL}/all`, infoViewContext);
    return response;
  } catch (error) {
    console.error("Error fetching Levels:", error);
    throw error;
  }
};
export const useGetAllLevels = (): Level[] => {
  const [{ apiData: levels }] = useGetDataApi(`${API_URL}/all`, undefined);
  return levels;
};
// Get an Level by ID
export const getLevelById = async (id: number): Promise<Level | null> => {
  try {
    const response = await axios.get(`${API_URL}/findById/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching Level with id ${id}:`, error);
    throw error;
  }
};

// Create a new Level
export const createLevel = async (Level: Level): Promise<Level> => {
  try {
    const response = await axios.post(`${API_URL}/save`, Level);
    return response.data;
  } catch (error) {
    console.error("Error creating Level:", error);
    throw error;
  }
};

// Update an Level
export const updateLevel = async (id: number, Level: Level): Promise<Level> => {
  try {
    const response = await axios.put(`${API_URL}/update/${id}`, Level);
    return response.data;
  } catch (error) {
    console.error(`Error updating Level with id ${id}:`, error);
    throw error;
  }
};

// Delete an Level
export const deleteLevel = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/delete/${id}`);
  } catch (error) {
    console.error(`Error deleting Level with id ${id}:`, error);
    throw error;
  }
};


export const getAllAdminLevels = (infoViewContext: InfoViewActions,
): Promise<Level[]> => {
  return getDataApi<Level[]>(`${API_URL}/admin/all`, infoViewContext);;
};