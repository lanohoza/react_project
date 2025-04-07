import { environment } from '../../envirenement/environnement';
import { Wilaya } from '@core/types/models/wilaya/WilayaTypes';
import jwtAxios from '@crema/services/auth/jwt-auth/index';
import axios from 'axios';

const API_URL = `${environment._API}api/v1/wilayas`;

// Get all wilayas
export const getAllWilayas = async (): Promise<Wilaya[]> => {
  try {
    const response = await axios.get(`${API_URL}/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching wilayas:", error);
    throw error;
  }
};

// Get a wilaya by ID
export const getWilayaById = async (id: number): Promise<Wilaya | null> => {
  try {
    const response = await axios.get(`${API_URL}/findById/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching wilaya with id ${id}:`, error);
    throw error;
  }
};

// Create a new wilaya
export const createWilaya = async (wilaya: Wilaya): Promise<Wilaya> => {
  try {
    const response = await jwtAxios.post(`${API_URL}/save`, wilaya);
    return response.data;
  } catch (error) {
    console.error("Error creating wilaya:", error);
    throw error;
  }
};

// Update a wilaya
export const updateWilaya = async (id: number, wilaya: Wilaya): Promise<Wilaya> => {
  try {
    const response = await jwtAxios.put(`${API_URL}/update/${id}`, wilaya);
    return response.data;
  } catch (error) {
    console.error(`Error updating wilaya with id ${id}:`, error);
    throw error;
  }
};

// Delete a wilaya
export const deleteWilaya = async (id: number): Promise<boolean> => {
  try {
    const response = await jwtAxios.delete(`${API_URL}/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting wilaya with id ${id}:`, error);
    throw error;
  }
};
