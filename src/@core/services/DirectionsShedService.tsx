// DirectionsShedService.ts

import { DirectionsShedDto } from '@core/types/models/directionsShed/DirectionsShedTypes';
import { InfoViewActions } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { deleteDataApi, getDataApi, postDataApi, putDataApi } from '@crema/hooks/APIHooks';
import { environment } from '../../envirenement/environnement';

const API_URL = `${environment._API}api/v1/directions-shed`;


export const getAllDirectionsShed = (
  infoViewActionsContext: InfoViewActions
): Promise<DirectionsShedDto[]> => {
  return getDataApi<DirectionsShedDto[]>(`${API_URL}/all`, infoViewActionsContext);
};

/**
 * Retrieves a single Directions Shed by its ID.
 */
export const getDirectionsShedById = async (
  id: number,
  infoViewActionsContext: InfoViewActions
): Promise<DirectionsShedDto | null> => {
  return getDataApi<DirectionsShedDto>(`${API_URL}/findById/${id}`, infoViewActionsContext);
};

/**
 * Creates a new Directions Shed.
 */
export const createDirectionsShed = async (
  directionsShedDto: DirectionsShedDto,
  infoViewActionsContext: InfoViewActions,
  reCallAPI?: () => void
): Promise<void> => {
  postDataApi(`${API_URL}/create`, infoViewActionsContext, directionsShedDto)
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
 * Updates an existing Directions Shed.
 */
export const updateDirectionsShed = async (
  id: number,
  directionsShedDto: DirectionsShedDto,
  infoViewActionsContext: InfoViewActions,
  reCallAPI?: () => void
): Promise<void> => {
  putDataApi(`${API_URL}/update/${id}`, infoViewActionsContext, directionsShedDto)
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
 * Deletes a Directions Shed by its ID.
 */
export const deleteDirectionsShed = async (
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
