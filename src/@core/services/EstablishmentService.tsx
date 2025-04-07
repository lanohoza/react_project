import { Establishment } from '@core/types/models/etablissement/EstablishmentTypes';
import { environment } from '../../envirenement/environnement';
import jwtAxios from '@crema/services/auth/jwt-auth/index';
import axios from 'axios';

const API_URL = `${environment._API}api/v1/establishments`;

// Get all etablissements
export const getAllEstablishments = async (): Promise<Establishment[]> => {
  try {
    const response = await jwtAxios.get(`${API_URL}/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching etablissements:", error);
    throw error;
  }
};

// Get an etablissement by ID
export const getEstablishmentById = async (id: number): Promise<Establishment | null> => {
  try {
    const response = await jwtAxios.get(`${API_URL}/findById/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching etablissement with id ${id}:`, error);
    throw error;
  }
};

// Create a new etablissement
export const createEstablishment = async (etablissement: Establishment): Promise<Establishment> => {
  try {
    const response = await jwtAxios.post(`${API_URL}/save`, etablissement);
    return response.data;
  } catch (error) {
    console.error("Error creating etablissement:", error);
    throw error;
  }
};

// Update an etablissement
export const updateEstablishment = async (id: number, etablissement: Establishment): Promise<Establishment> => {
  try {
    const response = await jwtAxios.put(`${API_URL}/update/${id}`, etablissement);
    return response.data;
  } catch (error) {
    console.error(`Error updating etablissement with id ${id}:`, error);
    throw error;
  }
};

// Delete an etablissement
export const deleteEstablishment = async (id: number): Promise<boolean> => {
  try {
    const response = await jwtAxios.delete(`${API_URL}/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting etablissement with id ${id}:`, error);
    throw error;
  }
};

// Find etablissements by commune ID
export const findEstablishmentsByCommuneId = async (idCommune: number): Promise<Establishment[]> => {
  try {
    const response = await axios.get(`${API_URL}/findByIdCommune/${idCommune}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching etablissements for commune with id ${idCommune}:`, error);
    throw error;
  }
};
