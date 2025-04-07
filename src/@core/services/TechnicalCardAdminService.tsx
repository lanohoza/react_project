import { GetStudentDto } from '@core/types/models/student/StudentTypes';
import { TechnicalCard, TechnicalCardYearDto } from '@core/types/models/technicalCards/TechnicalCardTypes';
import { InfoViewActions } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { deleteDataApi, getDataApi, postDataApi, putDataApi, useGetDataApi } from '@crema/hooks/APIHooks';
import jwtAxios from '@crema/services/auth/jwt-auth/index';
import { environment } from "../../envirenement/environnement";
import { Page } from '@core/types/models/core/models';


const API_URL = `${environment._API}api/v1/technical-cards-admin`;

// Create a new task from administration
export const createTechnicalCardFromAdministration = async (technicalCard: TechnicalCard, infoViewActionsContext: InfoViewActions): Promise<boolean> => {
  return postDataApi(`${API_URL}/saveFromAdministration`, infoViewActionsContext, technicalCard);
};

export const updateTechnicalCardFromAdmin = async (id: number, technicalCard: TechnicalCard, infoViewActionsContext: InfoViewActions): Promise<boolean> => {
  return putDataApi(`${API_URL}/updateFromAdmin/${id}`, infoViewActionsContext, technicalCard);
};

// Read tasks by createdBy with pagination
export const getTechnicalCardAdminById = async (id: number, infoViewActionsContext: InfoViewActions): Promise<TechnicalCard> => {
  return getDataApi(`${API_URL}/findById/${id}`, infoViewActionsContext);
};

export const useGetAllTechnicalCardsByAdmin = () => {
  return useGetDataApi<Page<TechnicalCard>>(
    `${API_URL}/search`,
    {} as Page<TechnicalCard>,
  );
};

// Delete an TechnicalCard
export const deleteTechnicalCardAdmin = async (
  id: number,
  infoViewActionsContext: InfoViewActions,
  reCallAPI?: () => void,
): Promise<void> => {
  deleteDataApi(`${API_URL}/delete/${id}`, infoViewActionsContext)
    .then(() => {
      if (reCallAPI) {
        reCallAPI();
      }
    })
    .catch((error) => {
      infoViewActionsContext.fetchError(error.message);
    });
};

export const saveTcFromAdministrationToUser = async (idTechnicalCard: number, infoViewActionsContext: InfoViewActions): Promise<boolean> => {
  console.log(idTechnicalCard);
  const url = `${API_URL}/saveTcFromAdministrationToUser?idTechnicalCard=${idTechnicalCard}`;
  return postDataApi(url, infoViewActionsContext, null);
};
