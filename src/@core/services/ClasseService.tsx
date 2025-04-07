import axios from '@crema/services/axios/index';
import { environment } from '../../envirenement/environnement';
import { deleteDataApi, getDataApi, postDataApi, putDataApi, useGetDataApi } from '@crema/hooks/APIHooks';
import { InfoViewActions } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { Classe, GetClasseDto } from '@core/types/models/classe/ClasseTypes';
import { Page } from '@core/types/models/core/models';

const API_URL = `${environment._API}api/v1/classes`;

// Get all Classes
export const getAllClassesByYear = (idYear: number, infoViewContext: InfoViewActions
): Promise<GetClasseDto[]> => {
  return getDataApi<GetClasseDto[]>(`${API_URL}/all-by-year/${idYear}`, infoViewContext).then(response => {
    return response
  });
};
export const useGetSearchClasses = () => {
  return useGetDataApi<Page<GetClasseDto>>(`${API_URL}/search`, {} as Page<GetClasseDto>);
};
// Get an Classe by ID
export const getClasseById = async (id: number, infoViewContext: InfoViewActions): Promise<Classe | null> => {
  return getDataApi(`${API_URL}/findById/${id}`,infoViewContext);
};

// Create a new Classe
export const createClasse = async (Classe: Classe, infoViewActionsContext: InfoViewActions, reCallAPI?: () => void) => {

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
export const updateClasse = async (Classe: Classe, infoViewActionsContext: InfoViewActions, reCallAPI?: () => void) => {


  putDataApi(`${API_URL}/update`, infoViewActionsContext, Classe).then(() => {
    if (reCallAPI) {
      reCallAPI();

    }
  }).catch((error) => {
    infoViewActionsContext.fetchError(error.message);
  });

};

// Delete an Classe
export const deleteClasse = async (id: number, infoViewActionsContext: InfoViewActions, reCallAPI?: () => void): Promise<void> => {
  deleteDataApi(`${API_URL}/delete/${id}`, infoViewActionsContext).then(() => {
    if (reCallAPI) {
      reCallAPI();

    }
  }).catch((error) => {
    infoViewActionsContext.fetchError(error.message);
  });

};

// Get all Classes by current year
export const getAllClassesByCurrentYear = (infoViewContext: InfoViewActions
): Promise<GetClasseDto[]> => {
  return getDataApi<GetClasseDto[]>(`${API_URL}/all-by-currentYear`, infoViewContext).then(response => {
    return response
  });
};