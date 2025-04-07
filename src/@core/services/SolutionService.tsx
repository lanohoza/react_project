import { Solution } from '@core/types/models/solution/SolutionTypes';
import jwtAxios from '@crema/services/auth/jwt-auth/index';
import { environment } from '../../envirenement/environnement';
import { getDataApi } from '@crema/hooks/APIHooks';
import { InfoViewActions } from '@crema/context/AppContextProvider/InfoViewContextProvider';

const API_URL = `${environment._API}api/v1/solutions`;

// Get all solutions
export const getAllSolutions = (
  infoViewContext: InfoViewActions,
): Promise<Solution[]> => {
  const response = getDataApi<Solution[]>(
    `${API_URL}/all`,
    infoViewContext,
  );
  return response;

};
// Get a solution by ID
export const getSolutionById = async (id: number): Promise<Solution | null> => {
  try {
    const response = await jwtAxios.get(`${API_URL}/findById/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching solution with id ${id}:`, error);
    throw error;
  }
};

// Create a new solution
export const createSolution = async (solution: Solution): Promise<Solution> => {
  try {
    const response = await jwtAxios.post(`${API_URL}/save`, solution);
    return response.data;
  } catch (error) {
    console.error("Error creating solution:", error);
    throw error;
  }
};

// Update a solution
export const updateSolution = async (id: number, solution: Solution): Promise<Solution> => {
  try {
    const response = await jwtAxios.put(`${API_URL}/update/${id}`, solution);
    return response.data;
  } catch (error) {
    console.error(`Error updating solution with id ${id}:`, error);
    throw error;
  }
};

// Delete a solution
export const deleteSolution = async (id: number): Promise<boolean> => {
  try {
    const response = await jwtAxios.delete(`${API_URL}/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting solution with id ${id}:`, error);
    throw error;
  }
};
