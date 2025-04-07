import axios from '@crema/services/axios/index';
import { environment } from '../../envirenement/environnement';
import {
  getDataApi,
  postDataApi,
  putDataApi,
  useGetDataApi,
} from '@crema/hooks/APIHooks';
import { InfoViewActions } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { Subject, SubjectShedSettingConditionDto } from '@core/types/models/subject/SubjectsTypes';
import { TypeEstablishment } from '@core/types/enums/TypeEtablissement';
import { Student } from '@core/types/models/student/StudentTypes';

const API_URL = `${environment._API}api/v1/subjects`;

// Get all Subjects
export const getAllSubjectsByClasse = (
  idClasse: number,
  infoViewContext: InfoViewActions,
): Promise<Subject[]> => {
  try {
    const response = getDataApi<Subject[]>(
      `${API_URL}/by-classe/${idClasse}`,
      infoViewContext,
    );
    return response;
  } catch (error) {
    console.error('Error fetching Subjects:', error);
    throw error;
  }
};
export const useGetAllSubjects = (): Subject[] => {
  const [{ apiData: levels }] = useGetDataApi(`${API_URL}/all`, []);
  return levels;
};
// Get an Subject by ID
export const getAllByCurrentEstablishmentType = async (
  infoViewContext: InfoViewActions,
): Promise<Subject[]> => {
  return getDataApi(`${API_URL}/current-type`, infoViewContext);
};

// Create a new Subject
export const createSubject = async (Subject: Subject): Promise<Subject> => {
  try {
    const response = await axios.post(`${API_URL}/save`, Subject);
    return response.data;
  } catch (error) {
    console.error('Error creating Subject:', error);
    throw error;
  }
};

// Update an Subject
export const updateSubject = async (
  id: number,
  Subject: Subject,
): Promise<Subject> => {
  try {
    const response = await axios.put(`${API_URL}/update/${id}`, Subject);
    return response.data;
  } catch (error) {
    console.error(`Error updating Subject with id ${id}:`, error);
    throw error;
  }
};

// Delete an Subject
export const deleteSubject = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/delete/${id}`);
  } catch (error) {
    console.error(`Error deleting Subject with id ${id}:`, error);
    throw error;
  }
};

export const getSubjectsByType = (
  infoViewActionsContext: InfoViewActions
): Promise<SubjectShedSettingConditionDto[]> => {
  return getDataApi<SubjectShedSettingConditionDto[]>(`${API_URL}/by-type`, infoViewActionsContext);
};


export const getAdminSubjectsByType = (type: TypeEstablishment,
  infoViewActionsContext: InfoViewActions
): Promise<SubjectShedSettingConditionDto[]> => {
  return getDataApi<SubjectShedSettingConditionDto[]>(`${API_URL}/admin/by-type/${type}`, infoViewActionsContext);
};



