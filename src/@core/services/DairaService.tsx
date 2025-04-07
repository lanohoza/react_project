import { environment } from '../../envirenement/environnement';
import { Daira } from '@core/types/models/daira/DairaTypes';
import jwtAxios from '@crema/services/auth/jwt-auth/index';

const API_URL = `${environment._API}api/v1/dairas`;

// Get all dairas
export const getAllDairas = async (): Promise<Daira[]> => {
  try {
    const response = await jwtAxios.get(`${API_URL}/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching dairas:", error);
    throw error;
  }
};

// Get a daira by ID
export const getDairaById = async (id: number): Promise<Daira | null> => {
  try {
    const response = await jwtAxios.get(`${API_URL}/findById/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching daira with id ${id}:`, error);
    throw error;
  }
};

// Get dairas by idWilaya
export const getDairasByIdWilaya = async (idWilaya: number): Promise<Daira[]> => {
  try {
    const response = await jwtAxios.get(`${API_URL}/findByIdWilaya/${idWilaya}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching dairas with idWilaya ${idWilaya}:`, error);
    throw error;
  }
};

// Create a new daira
export const createDaira = async (daira: Daira): Promise<Daira> => {
  try {
    const response = await jwtAxios.post(`${API_URL}/save`, daira);
    return response.data;
  } catch (error) {
    console.error("Error creating daira:", error);
    throw error;
  }
};

// Update a daira
export const updateDaira = async (id: number, daira: Daira): Promise<Daira> => {
  try {
    const response = await jwtAxios.put(`${API_URL}/update/${id}`, daira);
    return response.data;
  } catch (error) {
    console.error(`Error updating daira with id ${id}:`, error);
    throw error;
  }
};

// Delete a daira
export const deleteDaira = async (id: number): Promise<boolean> => {
  try {
    const response = await jwtAxios.delete(`${API_URL}/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting daira with id ${id}:`, error);
    throw error;
  }
};
