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
import { ProfessorClassesDto } from '@core/types/models/professorClasses/professorClassesTypes';

const API_URL = `${environment._API}api/v1/professor-classes`;

// Get all ProfessorClasses
export const getAllProfessorClasses = (
  infoViewContext: InfoViewActions,
): Promise<ProfessorClassesDto[]> => {
  return getDataApi<ProfessorClassesDto[]>(
    `${API_URL}/all`,
    infoViewContext,
  ).then((response) => response);
};

// Get ProfessorClasse by ID
export const getProfessorClasseById = async (
  id: number,
  infoViewContext: InfoViewActions,
): Promise<ProfessorClassesDto | null> => {
  return getDataApi(`${API_URL}/findById/${id}`, infoViewContext);
};

// Create a new ProfessorClasse
export const createProfessorClasse = async (
  professorClasse: ProfessorClassesDto,
  infoViewActionsContext: InfoViewActions,
  reCallAPI?: () => void,
) => {
  postDataApi(`${API_URL}/create`, infoViewActionsContext, professorClasse)
    .then(() => {
      if (reCallAPI) {
        reCallAPI();
      }
    })
    .catch((error) => {
      infoViewActionsContext.fetchError(error.message);
    });
};

// Save multiple ProfessorClasses
export const saveAllProfessorClasses = async (
  professorClasses: ProfessorClassesDto[],
  infoViewActionsContext: InfoViewActions,
  reCallAPI?: () => void,
) => {
  postDataApi(`${API_URL}/saveAll`, infoViewActionsContext, professorClasses)
    .then(() => {
      if (reCallAPI) {
        reCallAPI();
      }
    })
    .catch((error) => {
      infoViewActionsContext.fetchError(error.message);
    });
};

// Update a ProfessorClasse
export const updateProfessorClasse = async (
  professorClasse: ProfessorClassesDto,
  infoViewActionsContext: InfoViewActions,
  reCallAPI?: () => void,
) => {
  putDataApi(
    `${API_URL}/update/${professorClasse.id}`,
    infoViewActionsContext,
    professorClasse,
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

// Delete a ProfessorClasse
export const deleteProfessorClasse = async (
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
