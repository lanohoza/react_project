import { GetStudentDto } from '@core/types/models/student/StudentTypes';
import { TechnicalCard, TechnicalCardYearDto } from '@core/types/models/technicalCards/TechnicalCardTypes';
import { InfoViewActions } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { deleteDataApi, getDataApi, postDataApi, putDataApi, useGetDataApi } from '@crema/hooks/APIHooks';
import jwtAxios from '@crema/services/auth/jwt-auth/index';
import { environment } from "../../envirenement/environnement";
import { Page } from '@core/types/models/core/models';


const API_URL = `${environment._API}api/v1/technical-cards`;

// Create a new task
export const createTechnicalCard = async (technicalCard: TechnicalCard, infoViewActionsContext: InfoViewActions): Promise<boolean> => {
  return postDataApi(`${API_URL}/save`, infoViewActionsContext, technicalCard);
};


// Get all tasks
export const updateTechnicalCard = async (id: number, technicalCard: TechnicalCard, infoViewActionsContext: InfoViewActions): Promise<boolean> => {
  return putDataApi(`${API_URL}/update/${id}`, infoViewActionsContext, technicalCard);
};

// Read tasks by createdBy with pagination
export const getTechnicalCardById = async (id: number, infoViewActionsContext: InfoViewActions): Promise<TechnicalCard> => {
  return getDataApi(`${API_URL}/findById/${id}`, infoViewActionsContext);
};

export const useGetAllTechnicalCardsByUser = () => {
  return useGetDataApi<Page<TechnicalCard>>(
    `${API_URL}/search`,
    {} as Page<TechnicalCard>,
  );
};
export const getListTechnicalCardWithTasks = (infoViewActionsContext: InfoViewActions) => {
  return getDataApi<TechnicalCardYearDto[]>(
    `${API_URL}/allWithTasks`, infoViewActionsContext
  );
};

// Delete an TechnicalCard
export const deleteTechnicalCard = async (
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