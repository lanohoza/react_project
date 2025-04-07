import { environment } from '../../envirenement/environnement';
import { Commune } from '@core/types/models/commune/CommuneTypes';
import jwtAxios from '@crema/services/auth/jwt-auth/index';
import axios from '@crema/services/axios';

const API_URL = `${environment._API}api/v1/communes`;

// Get all communes
export const getAllCommunes = async (): Promise<Commune[]> => {
  try {
    const response = await axios.get(`${API_URL}/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching communes:", error);
    throw error;
  }
};

// Get a commune by ID
export const getCommuneById = async (id: number): Promise<Commune | null> => {
  try {
    const response = await axios.get(`${API_URL}/findById/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching commune with id ${id}:`, error);
    throw error;
  }
};

// Get communes by idDaira
export const getCommunesByIdWilaya= async (idWilaya: number): Promise<Commune[]> => {
  try {
    const response = await axios.get(`${API_URL}/findByIdWilaya/${idWilaya}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching communes with idDaira ${idWilaya}:`, error);
    throw error;
  }
};

// Create a new commune
export const createCommune = async (commune: Commune): Promise<Commune> => {
  try {
    const response = await jwtAxios.post(`${API_URL}/save`, commune);
    return response.data;
  } catch (error) {
    console.error("Error creating commune:", error);
    throw error;
  }
};

// Update a commune
export const updateCommune = async (id: number, commune: Commune): Promise<Commune> => {
  try {
    const response = await jwtAxios.put(`${API_URL}/update/${id}`, commune);
    return response.data;
  } catch (error) {
    console.error(`Error updating commune with id ${id}:`, error);
    throw error;
  }
};

// Delete a commune
export const deleteCommune = async (id: number): Promise<boolean> => {
  try {
    const response = await jwtAxios.delete(`${API_URL}/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting commune with id ${id}:`, error);
    throw error;
  }
};
