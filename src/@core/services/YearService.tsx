import { Year } from '@core/types/models/year/YearTypes';
import jwtAxios from '@crema/services/auth/jwt-auth/index';
import { environment } from "../../envirenement/environnement";
import { getDataApi, useGetDataApi } from '@crema/hooks/APIHooks';
import { InfoViewActions } from '@crema/context/AppContextProvider/InfoViewContextProvider';


const API_URL = `${environment._API}api/v1/years`;

// Get all years
export const getAllYears = async (): Promise<Year[]> => {
  const response = await jwtAxios.get(`${API_URL}/all`);
  return response.data;
};

export const getCurrentYear = async (infoViewContext: InfoViewActions): Promise<Year> => {
  return getDataApi(`${API_URL}/current`, infoViewContext);
};
export const getAllScholerYears = (infoViewContext: InfoViewActions
): Promise<Year[]> => {
  return getDataApi<Year[]>(`${API_URL}/all`, infoViewContext).then(response => {
    return response
  });
};