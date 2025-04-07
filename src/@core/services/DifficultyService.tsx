import { Difficulty } from '@core/types/models/difficulty/DifficultyTypes';
import jwtAxios from '@crema/services/auth/jwt-auth/index';
import { environment } from '../../envirenement/environnement';
import { InfoViewActions } from '../../@crema/context/AppContextProvider/InfoViewContextProvider';
import { deleteDataApi, getDataApi, postDataApi } from '@crema/hooks/APIHooks';

const API_URL = `${environment._API}api/v1/difficulties`;

// Get all difficulties
export const getAllDifficulties = async (infoViewActionsContext: InfoViewActions): Promise<Difficulty[]> => {
  return getDataApi<Difficulty[]>(`${API_URL}/all`, infoViewActionsContext);
};

// Get a difficulty by ID
export const getDifficultyById = async (id: number): Promise<Difficulty | null> => {
  try {
    const response = await jwtAxios.get(`${API_URL}/getById/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching difficulty with id ${id}:`, error);
    throw error;
  }
};

// Create a new difficulty
export const createDifficulty = async (difficulty: Difficulty, infoViewActionsContext: InfoViewActions): Promise<Difficulty> => {
  return postDataApi(`${API_URL}/save`, infoViewActionsContext, difficulty);
};

// Update a difficulty
export const updateDifficulty = async (id: number, difficulty: Difficulty): Promise<Difficulty> => {
  try {
    const response = await jwtAxios.put(`${API_URL}/update/${id}`, difficulty);
    return response.data;
  } catch (error) {
    console.error(`Error updating difficulty with id ${id}:`, error);
    throw error;
  }
};

// Delete a difficulty
export const deleteDifficulty = (id: number, infoViewActionsContext: InfoViewActions): Promise<boolean> => {
  return deleteDataApi(`${API_URL}/delete/${id}`, infoViewActionsContext);
};