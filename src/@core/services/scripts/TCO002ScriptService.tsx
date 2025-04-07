import { InfoViewActions } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { deleteDataApi, getDataApi, postDataApi, putDataApi, useGetDataApi } from '@crema/hooks/APIHooks';
import { environment } from '../../../envirenement/environnement';
import { Page } from '@core/types/models/core/models';


const API_URL = `${environment._API}api/v1/scripts/settings/tco001`;
const API_URL_student = `${API_URL}/student/condition`
const API_URL_classe = `${API_URL}/classe/condition`
const API_URL_subject = `${API_URL}/subject/condition`
const API_URL_level = `${API_URL}/level/condition`
const API_URL_speciality = `${API_URL}/speciality/condition`
const API_URL_establishment = `${API_URL}/establishment/condition`
const API_URL_guidanceSpecialityConfig = `${API_URL}/guidanceSpecialityConfig/condition`


export const useGetSearchTCO002StudentConditions = () => {
  return useGetDataApi<Page<any>>(`${API_URL_student}/search`, {} as Page<any>);
};
export const getTCO002StudentConditions = (idCondition: any, infoViewContext: InfoViewActions) => {
  return getDataApi<any>(`${API_URL_student}/findById/${idCondition}`, infoViewContext);
};

export const createTCO002StudentConditions = (condition: any, infoViewContext: InfoViewActions) => {
  return postDataApi<any>(`${API_URL_student}/create`, infoViewContext, condition);
};

export const updateTCO002StudentConditions = (idCondition: any, condition: any, infoViewContext: InfoViewActions) => {
  return putDataApi<any>(`${API_URL_student}/update/${idCondition}`, infoViewContext, condition);
};
export const deleteTCO002StudentConditions = (idCondition: any, infoViewContext: InfoViewActions) => {
  return deleteDataApi<any>(`${API_URL_student}/delete/${idCondition}`, infoViewContext);
};

/**
 * Classe
 */
export const useGetSearchTCO002ClasseConditions = () => {
  return useGetDataApi<Page<any>>(`${API_URL_classe}/search`, {} as Page<any>);
};
export const getTCO002ClasseConditions = (idCondition: any, infoViewContext: InfoViewActions) => {
  return getDataApi<any>(`${API_URL_classe}/findById/${idCondition}`, infoViewContext);
};

export const createTCO002ClasseConditions = (condition: any, infoViewContext: InfoViewActions) => {
  return postDataApi<any>(`${API_URL_classe}/create`, infoViewContext, condition);
};

export const updateTCO002ClasseConditions = (idCondition: any, condition: any, infoViewContext: InfoViewActions) => {
  return putDataApi<any>(`${API_URL_classe}/update/${idCondition}`, infoViewContext, condition);
};
export const deleteTCO002ClasseConditions = (idCondition: any, infoViewContext: InfoViewActions) => {
  return deleteDataApi<any>(`${API_URL_classe}/delete/${idCondition}`, infoViewContext);
};

/**
 * Subject
 */
export const useGetSearchTCO002SubjectConditions = () => {
  return useGetDataApi<Page<any>>(`${API_URL_subject}/search`, {} as Page<any>);
};
export const getTCO002SubjectConditions = (idCondition: any, infoViewContext: InfoViewActions) => {
  return getDataApi<any>(`${API_URL_subject}/findById/${idCondition}`, infoViewContext);
};

export const createTCO002SubjectConditions = (condition: any, infoViewContext: InfoViewActions) => {
  return postDataApi<any>(`${API_URL_subject}/create`, infoViewContext, condition);
};

export const updateTCO002SubjectConditions = (idCondition: any, condition: any, infoViewContext: InfoViewActions) => {
  return putDataApi<any>(`${API_URL_subject}/update/${idCondition}`, infoViewContext, condition);
};
export const deleteTCO002SubjectConditions = (idCondition: any, infoViewContext: InfoViewActions) => {
  return deleteDataApi<any>(`${API_URL_subject}/delete/${idCondition}`, infoViewContext);
};

/**
 * Level
 */
export const useGetSearchTCO002LevelConditions = () => {
  return useGetDataApi<Page<any>>(`${API_URL_level}/search`, {} as Page<any>);
};
export const getTCO002LevelConditions = (idCondition: any, infoViewContext: InfoViewActions) => {
  return getDataApi<any>(`${API_URL_level}/findById/${idCondition}`, infoViewContext);
};

export const createTCO002LevelConditions = (condition: any, infoViewContext: InfoViewActions) => {
  return postDataApi<any>(`${API_URL_level}/create`, infoViewContext, condition);
};

export const updateTCO002LevelConditions = (idCondition: any, condition: any, infoViewContext: InfoViewActions) => {
  return putDataApi<any>(`${API_URL_level}/update/${idCondition}`, infoViewContext, condition);
};
export const deleteTCO002LevelConditions = (idCondition: any, infoViewContext: InfoViewActions) => {
  return deleteDataApi<any>(`${API_URL_level}/delete/${idCondition}`, infoViewContext);
};

/**
 * Speciality
 */
export const useGetSearchTCO002SpecialityConditions = () => {
  return useGetDataApi<Page<any>>(`${API_URL_speciality}/search`, {} as Page<any>);
};
export const getTCO002SpecialityConditions = (idCondition: any, infoViewContext: InfoViewActions) => {
  return getDataApi<any>(`${API_URL_speciality}/findById/${idCondition}`, infoViewContext);
};

export const createTCO002SpecialityConditions = (condition: any, infoViewContext: InfoViewActions) => {
  return postDataApi<any>(`${API_URL_speciality}/create`, infoViewContext, condition);
};

export const updateTCO002SpecialityConditions = (idCondition: any, condition: any, infoViewContext: InfoViewActions) => {
  return putDataApi<any>(`${API_URL_speciality}/update/${idCondition}`, infoViewContext, condition);
};
export const deleteTCO002SpecialityConditions = (idCondition: any, infoViewContext: InfoViewActions) => {
  return deleteDataApi<any>(`${API_URL_speciality}/delete/${idCondition}`, infoViewContext);
};

/**
 * Establishment
 */
export const useGetSearchTCO002EstablishmentConditions = () => {
  return useGetDataApi<Page<any>>(`${API_URL_establishment}/search`, {} as Page<any>);
};
export const getTCO002EstablishmentConditions = (idCondition: any, infoViewContext: InfoViewActions) => {
  return getDataApi<any>(`${API_URL_establishment}/findById/${idCondition}`, infoViewContext);
};

export const createTCO002EstablishmentConditions = (condition: any, infoViewContext: InfoViewActions) => {
  return postDataApi<any>(`${API_URL_establishment}/create`, infoViewContext, condition);
};

export const updateTCO002EstablishmentConditions = (idCondition: any, condition: any, infoViewContext: InfoViewActions) => {
  return putDataApi<any>(`${API_URL_establishment}/update/${idCondition}`, infoViewContext, condition);
};
export const deleteTCO002EstablishmentConditions = (idCondition: any, infoViewContext: InfoViewActions) => {
  return deleteDataApi<any>(`${API_URL_establishment}/delete/${idCondition}`, infoViewContext);
};

/**
 * GuidanceSpecialityConfig
 */
export const useGetSearchTCO002GuidanceSpecialityConfigs = () => {
  return useGetDataApi<Page<any>>(`${API_URL_guidanceSpecialityConfig}/search`, {} as Page<any>);
};
export const getTCO002GuidanceSpecialityConfigs = (idCondition: any, infoViewContext: InfoViewActions) => {
  return getDataApi<any>(`${API_URL_guidanceSpecialityConfig}/findById/${idCondition}`, infoViewContext);
};

export const createTCO002GuidanceSpecialityConfigs = (condition: any, infoViewContext: InfoViewActions) => {
  return postDataApi<any>(`${API_URL_guidanceSpecialityConfig}/create`, infoViewContext, condition);
};

export const updateTCO002GuidanceSpecialityConfigs = (idCondition: any, condition: any, infoViewContext: InfoViewActions) => {
  return putDataApi<any>(`${API_URL_guidanceSpecialityConfig}/update/${idCondition}`, infoViewContext, condition);
};
export const deleteTCO002GuidanceSpecialityConfigs = (idCondition: any, infoViewContext: InfoViewActions) => {
  return deleteDataApi<any>(`${API_URL_guidanceSpecialityConfig}/delete/${idCondition}`, infoViewContext);
};