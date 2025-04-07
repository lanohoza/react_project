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
import { Professor } from '@core/types/models/professor/ProfessorTypes';
import { Page } from '@core/types/models/core/models';

const API_URL = `${environment._API}api/v1/professors`;

// Get all Professors
export const getAllProfessors = (
  infoViewContext: InfoViewActions,
): Promise<Professor[]> => {
  return getDataApi<Professor[]>(
    `${API_URL}/all`,
    infoViewContext,
  ).then((response) => {
    return response;
  });
};
export const useGetSearchProfessors = () => {
  return useGetDataApi<Page<Professor>>(
    `${API_URL}/search`,
    {} as Page<Professor>,
  );
};
// Get an Professor by ID


// Create a new Professor
export const createProfessor = async (
  Professor: Professor,
  infoViewActionsContext: InfoViewActions,
  reCallAPI?: () => void,
) => {
  postDataApi(`${API_URL}/save`, infoViewActionsContext, Professor)
    .then(() => {
      if (reCallAPI) {
        reCallAPI();
      }
    })
    .catch((error) => {
      infoViewActionsContext.fetchError(error.message);
    });
};

// Update an Professor
export const updateProfessor = async (
  Professor: Professor,
  infoViewActionsContext: InfoViewActions,
  reCallAPI?: () => void,
) => {
  putDataApi(
    `${API_URL}/update/${Professor.id}`,
    infoViewActionsContext,
    Professor,
  )
    .then(() => {
      if (reCallAPI) {
        reCallAPI();
      }
    })
    .catch((error) => {
      infoViewActionsContext.fetchError(error.message);
    });
};

// Delete an Professor
export const deleteProfessor = async (
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
export const getProfessorById = async (id: number, infoViewContext: InfoViewActions): Promise<Professor | null> => {
  return getDataApi(`${API_URL}/findById/${id}`,infoViewContext);
};