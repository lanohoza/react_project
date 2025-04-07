import { TaskWithActionsDto } from '@core/types/models/task/TaskTypes';
import { InfoViewActions } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { environment } from "../../envirenement/environnement";
import { getDataApi, postDataApi } from '@crema/hooks/APIHooks';


const API_URL = `${environment._API}api/v1/cards`;

// Create a new scolar year task
export const getStudentCardData = async (idStudent: number, idYear: any, infoViewActions: InfoViewActions): Promise<[]> => {
  return getDataApi(`${API_URL}/student/${idStudent}/${idYear}`, infoViewActions);
};

// Create a new scolar year task
export const getClasseCardData = async (idClasse: number, idYear: any, infoViewActions: InfoViewActions): Promise<[]> => {
  return getDataApi(`${API_URL}/classe/${idClasse}/${idYear}`, infoViewActions);
};


// Create a new scolar year task
export const getLevelCardData = async (idLevel: any, idYear: any, infoViewActions: InfoViewActions): Promise<[]> => {
  return getDataApi(`${API_URL}/level/${idLevel}/${idYear}`, infoViewActions);
};

export const getSubjectCardData = async (idSubject: any, idYear: any, infoViewActions: InfoViewActions): Promise<[]> => {
  return getDataApi(`${API_URL}/subject/${idSubject}/${idYear}`, infoViewActions);
};

export const getSpecialtyeCardData = async (idLevel: any, idSpecialty: any, idYear: any, infoViewActions: InfoViewActions): Promise<[]> => {
  return getDataApi(`${API_URL}/specialty/${idLevel}/${idSpecialty}/${idYear}`, infoViewActions);
};


export const getEstablishmentCardData = async ( idYear: any, infoViewActions: InfoViewActions): Promise<[]> => {
  return getDataApi(`${API_URL}/establishment/${idYear}`, infoViewActions);
};

