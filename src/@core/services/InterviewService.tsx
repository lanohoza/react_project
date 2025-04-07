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
  Interview,
  GetInterviewDto,
  DoInterviewDto,
} from '@core/types/models/interview/InterviewTypes';

const API_URL = `${environment._API}api/v1/interviews`;

// Create a new Classe
export const createInterview = async (
  Classe: Interview,
  infoViewActionsContext: InfoViewActions,
) => {
 return postDataApi(`${API_URL}/save`, infoViewActionsContext, Classe);
    
};

// Update an Classe
export const updateInterview = async (
  Classe: Interview,
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
export const deleteInterview = async (
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
export const useGetSearchInterviews = () => {
  return useGetDataApi<Page<GetInterviewDto>>(
    `${API_URL}/search`,
    {} as Page<GetInterviewDto>,
  );
};

export const getInterviewById = async (
  id: number,
  infoViewContext: InfoViewActions,
): Promise<Interview | null> => {
  return getDataApi(`${API_URL}/findById/${id}`, infoViewContext);
};

export const getInterviewDetailsById = async (
  id: number,
  infoViewContext: InfoViewActions,
): Promise<Interview | null> => {
  return getDataApi(`${API_URL}/getDetailsById/${id}`, infoViewContext);
};
export const doInterview = async (
  doInterviewDto: DoInterviewDto,
  infoViewContext: InfoViewActions,
): Promise<Interview | null> => {
  return postDataApi(`${API_URL}/doInterview`, infoViewContext, doInterviewDto);
};
export const endInterview = async (
  endInterviewDto: any,
  infoViewContext: InfoViewActions,
): Promise<Interview | null> => {
  return postDataApi(`${API_URL}/endInterview`, infoViewContext, endInterviewDto);
};

