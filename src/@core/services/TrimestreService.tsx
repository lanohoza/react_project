import axios from '@crema/services/axios/index';
import { environment } from '../../envirenement/environnement';
import {
  getDataApi,
  postDataApi,
  putDataApi,
  useGetDataApi,
} from '@crema/hooks/APIHooks';
import { InfoViewActions } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { Trimestre } from '@core/types/models/trimestre/TrimestreTypes';

const API_URL = `${environment._API}api/v1/trimestres`;

// Get all Trimestres
export const getAllTrimestresByYear = (
  idYear: number,
  infoViewContext: InfoViewActions,
): Promise<Trimestre[]> => {
  try {
    const response = getDataApi<Trimestre[]>(
      `${API_URL}/by-year/${idYear}`,
      infoViewContext,
    );
    return response;
  } catch (error) {
    console.error('Error fetching Trimestres:', error);
    throw error;
  }
};
export const useGetAllTrimestres = (): Trimestre[] => {
  const [{ apiData: levels }] = useGetDataApi(`${API_URL}/all`, []);
  return levels;
};
// Get an Trimestre by ID

