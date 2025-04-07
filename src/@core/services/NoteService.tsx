import axios from '@crema/services/axios/index';
import { environment } from '../../envirenement/environnement';
import { deleteDataApi, getDataApi, postDataApi, putDataApi, useGetDataApi } from '@crema/hooks/APIHooks';
import { InfoViewActions } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { Page } from '@core/types/models/core/models';
import { GetNoteDto, Note } from '@core/types/models/note/NoteTypes';
import jwtAxios from '@crema/services/auth/jwt-auth';

const API_URL = `${environment._API}api/v1/notes`;

// Get all Notes
export const findNoteByStudentAndTrimestre = (idStudent: number, idTrimestre: number, infoViewContext: InfoViewActions,
): Promise<Note> => {
  try {
    const response = getDataApi<Note>(`${API_URL}/find/${idStudent}/${idTrimestre}`, infoViewContext);
    return response;
  } catch (error) {
    console.error("Error fetching Notes:", error);
    throw error;
  }
};
export const useGetSearchNotes = () => {
  return useGetDataApi<Page<GetNoteDto>>(`${API_URL}/search`, undefined);
};

// Get an Note by ID
/*export const downloadTemplateFile = async (selectedIdClasse: number): Promise<any> => {
  try {
    return axios.get(`/template/${selectedIdClasse}`, {
      responseType: 'blob'
    })

  } catch (error) {
    console.error(`Error fetching Note with id ${selectedIdClasse}:`, error);
    throw error;
  }
};*/
export const importFile = (idClasse: number, idTrimestre: number, formData: any, infoViewContext: InfoViewActions,
): Promise<any> => {
  try {
    return postDataApi<any>(`${API_URL}/import/${idClasse}/${idTrimestre}`, infoViewContext, formData, true, {
      'content-type': 'multipart/form-data'
    });
  } catch (error) {
    throw error;
  }
};
// Create a new Note
export const saveNote = async (Note: Note, infoViewActionsContext: InfoViewActions, reCallAPI?: () => void) => {

  postDataApi(`${API_URL}/save`, infoViewActionsContext, Note).then(() => {
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


// Delete an Note
export const deleteNote = async (id: number, infoViewActionsContext: InfoViewActions, reCallAPI?: () => void): Promise<void> => {
  deleteDataApi(`${API_URL}/delete/${id}`, infoViewActionsContext).then(() => {
    if (reCallAPI) {
      reCallAPI();
    }
  }).catch((error) => {
    infoViewActionsContext.fetchError(error.message);
  });

};
export const downloadTemplateFile = async (): Promise<any> => {
  return jwtAxios.get(`${API_URL}/export/template`, {
    responseType: 'blob', // Important to handle binary data
    withCredentials: true,

  })

};