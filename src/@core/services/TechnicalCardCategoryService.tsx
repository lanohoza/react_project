import jwtAxios from "@crema/services/auth/jwt-auth/index";
import { environment } from "../../envirenement/environnement";
import { getDataApi } from "@crema/hooks/APIHooks";
import { TechnicalCardCategory } from "@core/types/models/TechnicalCardCategory/TechnicalCardCategoryTypes";
import { InfoViewActions } from "@crema/context/AppContextProvider/InfoViewContextProvider";

const API_URL = `${environment._API}api/v1/technical-card-categories`;

// Get all task categories
export const getAllTechnicalCardCategory = async (infoViewActions: InfoViewActions): Promise<TechnicalCardCategory[]> => {
    return getDataApi<TechnicalCardCategory[]>(`${API_URL}/all`, infoViewActions);
};
