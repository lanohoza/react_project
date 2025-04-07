import axios from '@crema/services/axios/index';
import { environment } from '../../envirenement/environnement';
import { deleteDataApi, getDataApi, postDataApi, putDataApi, useGetDataApi } from '@crema/hooks/APIHooks';
import { InfoViewActions } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { Page } from '@core/types/models/core/models';
import { GuidanceGroup, GetGuidanceGroupDto } from '@core/types/models/guidanceGroup/GuidanceGroupTypes';

const API_URL = `${environment._API}api/v1/guidance_groups`;

// Create a new Classe
export const createGuidanceGroup = async (Classe: GuidanceGroup, infoViewActionsContext: InfoViewActions, reCallAPI?: () => void) => {

  postDataApi(`${API_URL}/save`, infoViewActionsContext, Classe).then(() => {
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
export const updateGuidanceGroup = async (Classe: GuidanceGroup, infoViewActionsContext: InfoViewActions, reCallAPI?: () => void) => {


  putDataApi(`${API_URL}/update`, infoViewActionsContext, Classe).then(() => {
    if (reCallAPI) {
      reCallAPI();

    }
  }).catch((error) => {
    infoViewActionsContext.fetchError(error.message);
  });

};

// Delete an Classe
export const deleteGuidanceGroup = async (id: number, infoViewActionsContext: InfoViewActions, reCallAPI?: () => void): Promise<void> => {
  deleteDataApi(`${API_URL}/delete/${id}`, infoViewActionsContext).then(() => {
    if (reCallAPI) {
      reCallAPI();

    }
  }).catch((error) => {
    infoViewActionsContext.fetchError(error.message);
  });

};
export const useGetSearchGuidanceGroups = () => {
  return useGetDataApi<Page<GetGuidanceGroupDto>>(`${API_URL}/search`, {} as Page<GetGuidanceGroupDto>);
};

export const getGuidanceGroupById = async (id: number, infoViewContext: InfoViewActions): Promise<GuidanceGroup | null> => {
  return getDataApi(`${API_URL}/findById/${id}`, infoViewContext);
};


export const getGuidanceGroupByIdToEdit = async (id: number, infoViewContext: InfoViewActions): Promise<GuidanceGroup | null> => {
  return getDataApi(`${API_URL}/findByIdToEdit/${id}`, infoViewContext);
};
export const getAllGuidanceGroupByCurrents = async (infoViewContext: InfoViewActions): Promise<GetGuidanceGroupDto[]> => {
  return getDataApi(`${API_URL}/current-year`, infoViewContext);
};



