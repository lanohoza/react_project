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
  GetStudentDto,
  Student,
  StudentDesireDto,
  StudentNoteDto,
} from '@core/types/models/student/StudentTypes';
import jwtAxios from '@crema/services/auth/jwt-auth';

const API_URL = `${environment._API}api/v1/students`;

// Get all Students
export const getAllStudents = (
  infoViewContext: InfoViewActions,
): Promise<GetStudentDto[]> => {
  try {
    const response = getDataApi<GetStudentDto[]>(
      `${API_URL}/all`,
      infoViewContext,
    );
    return response;
  } catch (error) {
    console.error('Error fetching Students:', error);
    throw error;
  }
};
export const getAllStudentByClasse = (idClasse: number,
  infoViewContext: InfoViewActions,
): Promise<GetStudentDto[]> => {
  try {
    const response = getDataApi<GetStudentDto[]>(
      `${API_URL}/by-classe/${idClasse}`,
      infoViewContext,
    );
    return response;
  } catch (error) {
    console.error('Error fetching Students:', error);
    throw error;
  }
};



export const getAllStudentsWithDesires = (
  idClasse: number, page: number, pageSize: number, infoViewContext: InfoViewActions,
): Promise<Page<StudentDesireDto>> => {
  try {
    const response = getDataApi<Page<StudentDesireDto>>(
      `${API_URL}/all-with-desires/${idClasse}?page=${page}&size=${pageSize}`,
      infoViewContext,
    );
    return response;
  } catch (error) {
    console.error('Error fetching Students:', error);
    throw error;
  }
};
export const getOneStudentWithDesires = (
  idStudent: number, infoViewContext: InfoViewActions,
): Promise<StudentDesireDto> => {
  try {
    const response = getDataApi<StudentDesireDto>(
      `${API_URL}/one-with-desires/${idStudent}`,
      infoViewContext,
    );
    return response;
  } catch (error) {
    console.error('Error fetching Students:', error);
    throw error;
  }
};
export const useGetSearchStudents = () => {
  return useGetDataApi<Page<GetStudentDto>>(
    `${API_URL}/search`,
    {} as Page<GetStudentDto>,
  );
};

export const useGetSearchCurrentYearStudents = () => {
  return useGetDataApi<Page<GetStudentDto>>(
    `${API_URL}/current/search`,
    {} as Page<GetStudentDto>,
  );
};

export const getRemovedStudent = (search: string, page: number, size: number, InfoViewActions: InfoViewActions) => {
  return getDataApi<Page<Student>>(
    `${API_URL}/removed-students?search=${search}&page=${page}&size=${size}`, InfoViewActions
  );
};

export const restoreStudent = async (
  idStudentClass: number,
  infoViewActionsContext: InfoViewActions,
  reCallAPI?: () => void,
) => {
  postDataApi(
    `${API_URL}/restore/${idStudentClass}`,
    infoViewActionsContext,
    {},
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

export const useGetSearchStudentsWithNotes = () => {
  return useGetDataApi<Page<StudentNoteDto>>(
    `${API_URL}/search-with-note`,
    {} as Page<StudentNoteDto>
  );
};

export const useGetSearchStudentsWithDesires = () => {
  return useGetDataApi<Page<StudentDesireDto>>(
    `${API_URL}/search-with-desires`,
    {} as Page<StudentDesireDto>
  );
};

// Get an Student by ID
// Create a new Student
export const createStudent = async (
  Student: Student,
  infoViewActionsContext: InfoViewActions,
  reCallAPI?: () => void,
) => {
  postDataApi(`${API_URL}/save`, infoViewActionsContext, Student)
    .then(() => {
      if (reCallAPI) {
        reCallAPI();
      }

      infoViewActionsContext.fetchSuccess();
    })
    .catch((error) => {
      infoViewActionsContext.fetchError(error.message);
    });
};

export const changeClass = async (
  idStudent: number,
  idOldCasse: number,
  idNewClasse: number,
  infoViewActionsContext: InfoViewActions,
  reCallAPI?: () => void,
) => {
  postDataApi(
    `${API_URL}/change-class/${idStudent}/${idOldCasse}/${idNewClasse}`,
    infoViewActionsContext,
    {},
  )
    .then(() => {
      if (reCallAPI) {
        reCallAPI();
      }

      infoViewActionsContext.fetchSuccess();
    })
    .catch((error) => {
      infoViewActionsContext.fetchError(error.message);
    });
};

// Update an Student
export const updateStudent = async (
  Student: Student,
  infoViewActionsContext: InfoViewActions,
  reCallAPI?: () => void,
) => {
  putDataApi(
    `${API_URL}/update/${Student.id}/${Student.idClasse}`,
    infoViewActionsContext,
    Student,
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

// Delete an Student 
export const deleteStudent = async (
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

export const removeStudent = async (
  id: number,
  selcetedIdClass: number,
  infoViewActionsContext: InfoViewActions,
  reCallAPI?: () => void,
): Promise<void> => {
  deleteDataApi(`${API_URL}/remove/${id}/${selcetedIdClass}`, infoViewActionsContext)
    .then(() => {
      if (reCallAPI) {
        reCallAPI();
      }
    })
    .catch((error) => {
      infoViewActionsContext.fetchError(error.message);
    });
};
export const importFile = (idYear: number, formData: any, infoViewContext: InfoViewActions,
): Promise<any> => {
  try {
    return postDataApi<any>(`${API_URL}/import/${idYear}`, infoViewContext, formData, true, {
      'content-type': 'multipart/form-data'
    });
  } catch (error) {
    throw error;
  }
};

export const downloadStudentTemplateFile = async (): Promise<any> => {
  return jwtAxios.get(`${API_URL}/export/template`, {
    responseType: 'blob', // Important to handle binary data
    withCredentials: true,

  })

};

export const getAllStudentByCurrents = (
  infoViewContext: InfoViewActions,
): Promise<Student[]> => {
  const response = getDataApi<Student[]>(
    `${API_URL}/current-year`,
    infoViewContext,
  );
  return response;

};

export const findStudentById = (idStudent: number,
  infoViewActionsContext: InfoViewActions
): Promise<Student> => {
  return getDataApi<Student>(`${API_URL}/findByIdCurrent/${idStudent}`, infoViewActionsContext);
};