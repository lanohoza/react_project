import axios from '@crema/services/axios/index';
import { environment } from '../../envirenement/environnement';
import {
  deleteDataApi,
  getDataApi,
  postDataApi,
  putDataApi,
  useGetDataApi,
} from '@crema/hooks/APIHooks';
import { InfoViewActions } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { Page } from '@core/types/models/core/models';
import {
  Followup,
  FollowupType,
  GetFollowupDto,
} from '@core/types/models/followUp/FollowupTypes';

const API_URL = `${environment._API}api/v1/follow-ups`;

// Create a new Classe
export const createFollowup = async (
  Classe: Followup,
  infoViewActionsContext: InfoViewActions,
  reCallAPI?: () => void,
) => {
  postDataApi(`${API_URL}/save`, infoViewActionsContext, Classe)
    .then(() => {
      if (reCallAPI) {
        reCallAPI();
      }
      //console.log("////////////////////////////");

      //  infoViewActionsContext.fetchSuccess();
    })
    .catch((error) => {
      infoViewActionsContext.fetchError(error.message);
    });
};

// Update an Classe
export const updateFollowup = async (
  Classe: Followup,
  infoViewActionsContext: InfoViewActions,
  reCallAPI?: () => void,
) => {
  putDataApi(`${API_URL}/update`, infoViewActionsContext, Classe)
    .then(() => {
      if (reCallAPI) {
        reCallAPI();
      }
    })
    .catch((error) => {
      infoViewActionsContext.fetchError(error.message);
    });
};

// Delete an Classe
export const deleteFollowup = async (
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
export const useGetSearchFollowups = () => {
  return useGetDataApi<Page<GetFollowupDto>>(
    `${API_URL}/search`,
    {} as Page<GetFollowupDto>,
  );
};

export const getFollowupById = async (
  id: number,
  infoViewContext: InfoViewActions,
): Promise<Followup | null> => {
  return getDataApi(`${API_URL}/findById/${id}`, infoViewContext);
};

export const getAllFollowupByCurrents = async (
  type: any,
  infoViewContext: InfoViewActions,
): Promise<Followup[]> => {
  return getDataApi(`${API_URL}/current-year/${type}`, infoViewContext);
};


export const endFollowup = async (
  id: any,
  infoViewContext: InfoViewActions,
): Promise<Followup[]> => {
  return getDataApi(`${API_URL}/end/${id}`, infoViewContext);
};