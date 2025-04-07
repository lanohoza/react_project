// RequiredProceduresService.ts

import { RequiredProceduresDto } from '@core/types/models/requiredProcedures/RequiredProceduresTypes';
import { InfoViewActions } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { deleteDataApi, getDataApi, postDataApi, putDataApi } from '@crema/hooks/APIHooks';
import { environment } from '../../envirenement/environnement';

const API_URL = `${environment._API}api/v1/required-procedures`;


export const getAllRequiredProcedures = (
  infoViewActionsContext: InfoViewActions
): Promise<RequiredProceduresDto[]> => {
  return getDataApi<RequiredProceduresDto[]>(`${API_URL}/all`, infoViewActionsContext);
};

/**
 * Retrieves a single Required Procedure by ID.
 */
export const getRequiredProceduresById = async (
  id: number,
  infoViewActionsContext: InfoViewActions
): Promise<RequiredProceduresDto | null> => {
  return getDataApi<RequiredProceduresDto>(`${API_URL}/findById/${id}`, infoViewActionsContext);
};

/**
 * Creates a new Required Procedure.
 */
export const createRequiredProcedures = async (
  dto: RequiredProceduresDto,
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
 * Updates an existing Required Procedure.
 */
export const updateRequiredProcedures = async (
  id: number,
  dto: RequiredProceduresDto,
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
 * Deletes a Required Procedure by its ID.
 */
export const deleteRequiredProcedures = async (
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
