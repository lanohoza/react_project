// SupportStudentService.ts

import { SupportStudentDto } from '@core/types/models/supportStudent/SupportStudentTypes';
import { InfoViewActions } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { deleteDataApi, getDataApi, postDataApi, putDataApi } from '@crema/hooks/APIHooks';
import { environment } from '../../envirenement/environnement';

const API_URL = `${environment._API}api/v1/support-students`;


export const getAllSupportStudents = (
  infoViewActionsContext: InfoViewActions
): Promise<SupportStudentDto[]> => {
  return getDataApi<SupportStudentDto[]>(`${API_URL}/all`, infoViewActionsContext);
};

/**
 * Retrieves a single Support Student by its ID.
 */
export const getSupportStudentById = async (
  id: number,
  infoViewActionsContext: InfoViewActions
): Promise<SupportStudentDto | null> => {
  return getDataApi<SupportStudentDto>(`${API_URL}/findById/${id}`, infoViewActionsContext);
};

/**
 * Creates a new Support Student.
 */
export const createSupportStudent = async (
  dto: SupportStudentDto,
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
 * Updates an existing Support Student.
 */
export const updateSupportStudent = async (
  id: number,
  dto: SupportStudentDto,
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
 * Deletes a Support Student by its ID.
 */
export const deleteSupportStudent = async (
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
