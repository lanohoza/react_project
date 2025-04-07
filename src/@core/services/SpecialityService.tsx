import axios from '@crema/services/axios/index';
import { environment } from '../../envirenement/environnement';
import { getDataApi, postDataApi, putDataApi, useGetDataApi } from '@crema/hooks/APIHooks';
import { InfoViewActions } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { Speciality } from '@core/types/models/speciality/LevelTypes';

const API_URL = `${environment._API}api/v1/specialities`;

// Get all Specialitys
export const getAllSpecialitys = (infoViewContext: InfoViewActions,
): Promise<Speciality[]> => {
  return getDataApi<Speciality[]>(`${API_URL}/all`, infoViewContext);

};
export const getAllByIdLevel = (idLevel: Number, infoViewContext: InfoViewActions,
): Promise<Speciality[]> => {
  try {
    const response = getDataApi<Speciality[]>(`${API_URL}/getAllByIdLevel/${idLevel}`, infoViewContext);
    return response;
  } catch (error) {
    console.error("Error fetching Specialitys:", error);
    throw error;
  }
};
export const getSpecialtyForDesire = (infoViewContext: InfoViewActions,
): Promise<Speciality[]> => {
  try {
    const response = getDataApi<Speciality[]>(`${API_URL}/get-for-desires`, infoViewContext);
    return response;
  } catch (error) {
    console.error("Error fetching Specialitys:", error);
    throw error;
  }
};
export const useGetAllSpecialitys = (): Speciality[] => {
  const [{ apiData: Specialitys }] = useGetDataApi(`${API_URL}/all`, []);
  return Specialitys;
};
// Get an Speciality by ID
export const getSpecialityById = async (id: number): Promise<Speciality | null> => {
  try {
    const response = await axios.get(`${API_URL}/findById/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching Speciality with id ${id}:`, error);
    throw error;
  }
};

// Create a new Speciality
export const createSpeciality = async (Speciality: Speciality): Promise<Speciality> => {
  try {
    const response = await axios.post(`${API_URL}/save`, Speciality);
    return response.data;
  } catch (error) {
    console.error("Error creating Speciality:", error);
    throw error;
  }
};

// Update an Speciality
export const updateSpeciality = async (id: number, Speciality: Speciality): Promise<Speciality> => {
  try {
    const response = await axios.put(`${API_URL}/update/${id}`, Speciality);
    return response.data;
  } catch (error) {
    console.error(`Error updating Speciality with id ${id}:`, error);
    throw error;
  }
};

// Delete an Speciality
export const deleteSpeciality = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/delete/${id}`);
  } catch (error) {
    console.error(`Error deleting Speciality with id ${id}:`, error);
    throw error;
  }
};
