// ShedCategoryService.ts

import { ShedCategoryDto } from '@core/types/models/shedCategory/ShedCategoryTypes';
import { InfoViewActions } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { deleteDataApi, getDataApi, postDataApi, putDataApi } from '@crema/hooks/APIHooks';
import { environment } from '../../envirenement/environnement';

const API_URL = `${environment._API}api/v1/shed-categories`;


export const getAllShedCategories = (
  infoViewActionsContext: InfoViewActions
): Promise<ShedCategoryDto[]> => {
  return getDataApi<ShedCategoryDto[]>(`${API_URL}/all`, infoViewActionsContext);
};

/**
 * Retrieves a single Shed Category by its ID.
 */
export const getShedCategoryById = async (
  id: number,
  infoViewActionsContext: InfoViewActions
): Promise<ShedCategoryDto | null> => {
  return getDataApi<ShedCategoryDto>(`${API_URL}/findById/${id}`, infoViewActionsContext);
};

/**
 * Creates a new Shed Category.
 */
export const createShedCategory = async (
  dto: ShedCategoryDto,
  infoViewActionsContext: InfoViewActions,
  reCallAPI?: () => void
): Promise<void> => {
  postDataApi(`${API_URL}/create`, infoViewActionsContext, dto)
    .then(() => {
      if (reCallAPI) {
        reCallAPI();
      }
    })
    .catch((error) => {
      infoViewActionsContext.fetchError("حدثت مشكلة , يرجى إعادة المحاولة لاحقا");
    });
};

/**
 * Updates an existing Shed Category.
 */
export const updateShedCategory = async (
  id: number,
  dto: ShedCategoryDto,
  infoViewActionsContext: InfoViewActions,
  reCallAPI?: () => void
): Promise<void> => {
  putDataApi(`${API_URL}/update/${id}`, infoViewActionsContext, dto)
    .then(() => {
      if (reCallAPI) {
        reCallAPI();
      }
    })
    .catch((error) => {
      infoViewActionsContext.fetchError("حدثت مشكلة , يرجى إعادة المحاولة لاحقا");
    });
};

/**
 * Deletes a Shed Category by its ID.
 */
export const deleteShedCategory = async (
  id: number,
  infoViewActionsContext: InfoViewActions,
  reCallAPI?: () => void
): Promise<void> => {
  deleteDataApi(`${API_URL}/delete/${id}`, infoViewActionsContext)
    .then(() => {
      if (reCallAPI) {
        reCallAPI();
      }
    })
    .catch((error) => {
      infoViewActionsContext.fetchError("حدثت مشكلة , يرجى إعادة المحاولة لاحقا");
    });
};
