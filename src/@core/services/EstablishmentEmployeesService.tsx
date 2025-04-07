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
import { EstablishmentEmployees } from '@core/types/models/establishmentEmployees/EstablishmentEmployeesTypes';
import { Page } from '@core/types/models/core/models';

const API_URL = `${environment._API}api/v1/establishment-employees`;

// Get all Establishment Employees
export const getAllEstablishmentEmployees = (
  infoViewContext: InfoViewActions,
): Promise<EstablishmentEmployees[]> => {
  return getDataApi<EstablishmentEmployees[]>(
    `${API_URL}/all`,
    infoViewContext,
  ).then((response) => {
    return response;
  });
};

// Get an Establishment Employee by ID
export const getEstablishmentEmployeeById = async (
  id: number,
  infoViewContext: InfoViewActions,
): Promise<EstablishmentEmployees | null> => {
  return getDataApi(`${API_URL}/findById/${id}`, infoViewContext);
};

// Create a new Establishment Employee
export const createEstablishmentEmployee = async (
  employee: EstablishmentEmployees,
  infoViewActionsContext: InfoViewActions,
  reCallAPI?: () => void,
) => {
  postDataApi(`${API_URL}/create`, infoViewActionsContext, employee)
    .then(() => {
      if (reCallAPI) {
        reCallAPI();
      }
    })
    .catch((error) => {
      infoViewActionsContext.fetchError(error.message);
    });
};

// Update an Establishment Employee
export const updateEstablishmentEmployee = async (
  employee: EstablishmentEmployees,
  infoViewActionsContext: InfoViewActions,
  reCallAPI?: () => void,
) => {
  console.log(employee.id)
  putDataApi(
    `${API_URL}/update/${employee.id}`,
    infoViewActionsContext,
    employee,
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

// Delete an Establishment Employee
export const deleteEstablishmentEmployee = async (
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


export const useGetAllEstablishmentEmployeesByUser = () => {
  return useGetDataApi<Page<EstablishmentEmployees>>(
    `${API_URL}/search`,
    {} as Page<EstablishmentEmployees>,
  );
};