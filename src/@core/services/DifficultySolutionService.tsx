import { DifficultySolution } from '@core/types/models/difficultySolution/DifficultySolutionTypes';
import jwtAxios from '@crema/services/auth/jwt-auth/index';
import { environment } from '../../envirenement/environnement';

const API_URL = `${environment._API}api/v1/difficulty-solutions`;

// Get all difficulty solutions
export const getAllDifficultySolutions = async (): Promise<DifficultySolution[]> => {
  try {
    const response = await jwtAxios.get(`${API_URL}/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching difficulty solutions:", error);
    throw error;
  }
};

// Get a difficulty solution by ID
export const getDifficultySolutionById = async (id: number): Promise<DifficultySolution | null> => {
  try {
    const response = await jwtAxios.get(`${API_URL}/getById/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching difficulty solution with id ${id}:`, error);
    throw error;
  }
};

// Create a new difficulty solution
export const createDifficultySolution = async (difficultySolution: DifficultySolution): Promise<DifficultySolution> => {
  try {
    const response = await jwtAxios.post(`${API_URL}/save`, difficultySolution);
    return response.data;
  } catch (error) {
    console.error("Error creating difficulty solution:", error);
    throw error;
  }
};

// Update a difficulty solution
export const updateDifficultySolution = async (id: number, difficultySolution: DifficultySolution): Promise<DifficultySolution> => {
  try {
    const response = await jwtAxios.put(`${API_URL}/update/${id}`, difficultySolution);
    return response.data;
  } catch (error) {
    console.error(`Error updating difficulty solution with id ${id}:`, error);
    throw error;
  }
};

// Delete a difficulty solution
export const deleteDifficultySolution = async (id: number): Promise<boolean> => {
  try {
    const response = await jwtAxios.delete(`${API_URL}/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting difficulty solution with id ${id}:`, error);
    throw error;
  }
};

// Save multiple difficulty solutions
export const saveAllDifficultySolutions = async (difficultySolutions: DifficultySolution[]): Promise<DifficultySolution[]> => {
  try {
    const response = await jwtAxios.post(`${API_URL}/saveAll`, difficultySolutions);
    return response.data;
  } catch (error) {
    console.error("Error saving difficulty solutions:", error);
    throw error;
  }
};

// Find difficulty solutions by difficultyId
export const findDifficultySolutionsByDifficultyId = async (difficultyId: number): Promise<DifficultySolution[]> => {
  try {
    const response = await jwtAxios.get(`${API_URL}/findByDifficultyId/${difficultyId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching difficulty solutions for difficultyId ${difficultyId}:`, error);
    throw error;
  }
};

// Find difficulty solutions by difficultyId and token
export const findDifficultySolutionsByDifficultyIdAnToken = async (difficultyId: number): Promise<DifficultySolution[]> => {
  try {
    const response = await jwtAxios.get(`${API_URL}/findByDifficultyIdAndToken/${difficultyId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching difficulty solutions for difficultyId ${difficultyId} and user`, error);
    throw error;
  }
};