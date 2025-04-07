// SupportCounselorService.ts

import { SupportCounselorDto } from '@core/types/models/supportCounselor/SupportCounselorTypes';
import { InfoViewActions } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { deleteDataApi, getDataApi, postDataApi, putDataApi } from '@crema/hooks/APIHooks';
import { environment } from '../../envirenement/environnement';

const API_URL = `${environment._API}api/v1/support-counselors`;


export const getAllSupportCounselors = (
  infoViewActionsContext: InfoViewActions
): Promise<SupportCounselorDto[]> => {
  return getDataApi<SupportCounselorDto[]>(`${API_URL}/all`, infoViewActionsContext);
};

/**
 * Retrieves a single Support Counselor by its ID.
 */
export const getSupportCounselorById = async (
  id: number,
  infoViewActionsContext: InfoViewActions
): Promise<SupportCounselorDto | null> => {
  return getDataApi<SupportCounselorDto>(`${API_URL}/findById/${id}`, infoViewActionsContext);
};

/**
 * Creates a new Support Counselor.
 */
export const createSupportCounselor = async (
  dto: SupportCounselorDto,
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
 * Updates an existing Support Counselor.
 */
export const updateSupportCounselor = async (
  id: number,
  dto: SupportCounselorDto,
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
 * Deletes a Support Counselor by its ID.
 */
export const deleteSupportCounselor = async (
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
