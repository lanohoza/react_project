import axios from '@crema/services/axios/index';
import { environment } from '../../envirenement/environnement';
import { deleteDataApi, getDataApi, postDataApi, putDataApi, useGetDataApi } from '@crema/hooks/APIHooks';
import { AddEditWeekProgramDto } from '@core/types/models/weekProgram/WeekProgramTypes';
import { Page } from '@core/types/models/core/models';
import { CurrentMonthAndWeek } from '@core/types/models/CurrentMonthAndWeek/CurrentMonthAndWeekTypes';
import { InfoViewActions } from '@crema/context/AppContextProvider/InfoViewContextProvider';

const API_URL = `${environment._API}api/v1/week-programs`;

// Get all Week Programs
export const getAllWeekPrograms = (infoViewActionsContext: InfoViewActions): Promise<AddEditWeekProgramDto[]> => {
  return getDataApi<AddEditWeekProgramDto[]>(`${API_URL}/all`, infoViewActionsContext).then(response => {
    return response;
  });
};

// Get a Week Program by ID
export const getWeekProgramById = async (id: number, infoViewActionsContext: InfoViewActions): Promise<AddEditWeekProgramDto | null> => {
  return getDataApi<AddEditWeekProgramDto>(`${API_URL}/findById/${id}`, infoViewActionsContext);
};

// Get Week Programs by User ID
export const getWeekProgramsByUserId = async (userId: number, infoViewActionsContext: InfoViewActions): Promise<AddEditWeekProgramDto[]> => {
  return getDataApi<AddEditWeekProgramDto[]>(`${API_URL}/user/${userId}`, infoViewActionsContext);
};

export const useGetAllWeekProgramByUser = () => {
  return useGetDataApi<Page<AddEditWeekProgramDto>>(
    `${API_URL}/user`,
    {} as Page<AddEditWeekProgramDto>,
  );
};

// Create a new Week Program
export const createWeekProgram = async (weekProgram: AddEditWeekProgramDto, infoViewActionsContext: InfoViewActions, reCallAPI?: () => void) => {
  postDataApi(`${API_URL}/save`, infoViewActionsContext, weekProgram).then(() => {
    if (reCallAPI) {
      reCallAPI();
    }
  })
    .catch((error) => {
      infoViewActionsContext.fetchError("حدثت مشكلة , يرجى إعادة المحاولة لاحقا");
    });
};

// Update a Week Program
export const updateWeekProgram = async (id: number, weekProgram: AddEditWeekProgramDto, infoViewActionsContext: InfoViewActions, reCallAPI?: () => void) => {
  putDataApi(`${API_URL}/update/${id}`, infoViewActionsContext, weekProgram).then(() => {
    if (reCallAPI) {
      reCallAPI();
    }
  })
    .catch((error) => {
      infoViewActionsContext.fetchError("حدثت مشكلة , يرجى إعادة المحاولة لاحقا");
    });
};

// Delete a Week Program
export const deleteWeekProgram = async (id: number, infoViewActionsContext: InfoViewActions, reCallAPI?: () => void): Promise<void> => {
  deleteDataApi(`${API_URL}/delete/${id}`, infoViewActionsContext).then(() => {
    if (reCallAPI) {
      reCallAPI();
    }
  })
    .catch((error) => {
      infoViewActionsContext.fetchError("حدثت مشكلة , يرجى إعادة المحاولة لاحقا");
    });
};

// Hook to get week programs
export const useGetWeekPrograms = () => {
  return useGetDataApi<AddEditWeekProgramDto[]>(`${API_URL}/all`, [] as AddEditWeekProgramDto[]);
};

export const useGetCurrentMonthAndWeek = (weekNumber: number, month: number, infoViewActionsContext: InfoViewActions) => {
  const url = `${API_URL}/getBeginAndEndWeek?weekNumber=${weekNumber}&month=${month}`;
  return getDataApi<CurrentMonthAndWeek>(url, infoViewActionsContext);
};