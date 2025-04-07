import axios from '@crema/services/axios/index';
import { environment } from '../../envirenement/environnement';
import { deleteDataApi, getDataApi, postDataApi, putDataApi, useGetDataApi } from '@crema/hooks/APIHooks';
import { InfoViewActions } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { AddEditWeekProgramTaskDto } from '@core/types/models/weekProgramTasks/WeekProgramTasksTypes';
import { AddEditWeekProgramDto } from '@core/types/models/weekProgram/WeekProgramTypes';
import { AddEditTasksWeekProgramDto } from '@core/types/models/addEditTasksWeekProgramDto/AddEditTasksWeekProgramDtoTypes';
import { WeekProgramTaskUserDto } from '@core/types/models/weekProgramTasks/WeekProgramTaskUserDto';

const API_URL = `${environment._API}api/v1/week-program-tasks`;

// Get all Week Program Tasks
export const getAllWeekProgramTasks = (infoViewContext: InfoViewActions): Promise<AddEditWeekProgramTaskDto[]> => {
  return getDataApi<AddEditWeekProgramTaskDto[]>(`${API_URL}/all`, infoViewContext).then(response => {
    return response;
  });
};

// Get a Week Program Task by ID
export const getWeekProgramTaskById = async (id: number, infoViewContext: InfoViewActions): Promise<AddEditWeekProgramTaskDto | null> => {
  return getDataApi<AddEditWeekProgramTaskDto>(`${API_URL}/getById/${id}`, infoViewContext);
};

// Create a new Week Program Task
export const createWeekProgramTask = async (weekProgramTask: AddEditWeekProgramTaskDto, infoViewActionsContext: InfoViewActions, reCallAPI?: () => void) => {
  postDataApi(`${API_URL}/save`, infoViewActionsContext, weekProgramTask).then(() => {
    if (reCallAPI) {
      reCallAPI();
    }
  })
    .catch((error) => {
      infoViewActionsContext.fetchError("حدثت مشكلة , يرجى إعادة المحاولة لاحقا");
    });
};

// Create multiple Week Program Tasks
export const createMultipleWeekProgramTasks = async (
  tasksWeekProgramDto: AddEditTasksWeekProgramDto, infoViewActionsContext: InfoViewActions, reCallAPI?: () => void, p0?: () => void) => {
  return postDataApi(`${API_URL}/saveAll`, infoViewActionsContext, tasksWeekProgramDto);
};

// Update a Week Program Task
export const updateWeekProgramTask = async (idWeekProgram: number, weekProgramTask: AddEditWeekProgramTaskDto, infoViewActionsContext: InfoViewActions, reCallAPI?: () => void) => {
  putDataApi(`${API_URL}/update/${idWeekProgram}`, infoViewActionsContext, weekProgramTask).then(() => {
    if (reCallAPI) {
      reCallAPI();
    }
  })
    .catch((error) => {
      infoViewActionsContext.fetchError("حدثت مشكلة , يرجى إعادة المحاولة لاحقا");
    });
};

// Delete a Week Program Task
export const deleteWeekProgramTask = async (id: number, infoViewActionsContext: InfoViewActions, reCallAPI?: () => void): Promise<void> => {
  deleteDataApi(`${API_URL}/delete/${id}`, infoViewActionsContext).then(() => {
    if (reCallAPI) {
      reCallAPI();
    }
  })
    .catch((error) => {
      infoViewActionsContext.fetchError("حدثت مشكلة , يرجى إعادة المحاولة لاحقا");
    });
};

// Hook to get all Week Program Tasks
export const useGetWeekProgramTasks = () => {
  return useGetDataApi<AddEditWeekProgramTaskDto[]>(`${API_URL}/all`, [] as AddEditWeekProgramTaskDto[]);
};

// Fetch Week Program Tasks by idWeekProgram
export const getWeekProgramTasksByIdWeekProgram = async (idWeekProgram: number, infoViewContext: InfoViewActions): Promise<AddEditTasksWeekProgramDto> => {
  return getDataApi<AddEditTasksWeekProgramDto>(`${API_URL}/findByIdWeekProgram/${idWeekProgram}`, infoViewContext)
    .then(response => {
      return response;
    })
    .catch(error => {
      infoViewContext.fetchError("حدثت مشكلة , يرجى إعادة المحاولة لاحقا");
      throw error;
    });
};

export const getWeekProgramTasksByIdWeekProgramForDocument = async (idWeekProgram: number, infoViewContext: InfoViewActions): Promise<WeekProgramTaskUserDto> => {
  return getDataApi<WeekProgramTaskUserDto>(`${API_URL}/findByIdWeekProgramForDocument/${idWeekProgram}`, infoViewContext)
    .then(response => {
      return response;
    })
    .catch(error => {
      infoViewContext.fetchError("حدثت مشكلة , يرجى إعادة المحاولة لاحقا");
      throw error;
    });
};