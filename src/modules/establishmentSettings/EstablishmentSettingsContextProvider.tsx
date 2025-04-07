'use client';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ModeComponent, Page } from '@core/types/models/core/models';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { EstablishmentEmployees } from '@core/types/models/establishmentEmployees/EstablishmentEmployeesTypes';
import { deleteEstablishmentEmployee, getEstablishmentEmployeeById, useGetAllEstablishmentEmployeesByUser } from '@core/services/EstablishmentEmployeesService';


export type EstablishmentSettingsContextActions = {
  onEdit: (model: EstablishmentEmployees) => void;
  onView: (model: EstablishmentEmployees) => void;
  onDelete: (model: EstablishmentEmployees) => void;
  onCreate: () => void;
  reload: () => void;
  onSearch: (e: any) => void;
  onChangePage: (page: number) => void;
  onCloseEditViewModel: () => void,
  onCloseDeleteModel: () => void,
  onConfirmDeleteModel: () => void;
};
export type EstablishmentSettingsContextData = {
  EstablishmentSettingsPage: Page<EstablishmentEmployees>;
  EstablishmentSettings: EstablishmentEmployees[];
  loading: boolean;
  page: number;
  search: string;
  openAddEditViewModel: boolean;
  modeAddEditViewModel: ModeComponent;
  initialData: EstablishmentEmployees;
  openDeleteModel: boolean;
};
const EstablishmentSettingsContext = createContext<EstablishmentSettingsContextData>({
  EstablishmentSettingsPage: {} as Page<EstablishmentEmployees>,
  EstablishmentSettings: {} as EstablishmentEmployees[],
  loading: true,
  openAddEditViewModel: false,
  initialData: {} as EstablishmentEmployees,
  modeAddEditViewModel: ModeComponent.create,
  page: 0,
  search: '',
  openDeleteModel: false,
});

const EstablishmentSettingsActionsContext = createContext<EstablishmentSettingsContextActions>({
  onEdit: (model: EstablishmentEmployees) => { },
  onView: (model: EstablishmentEmployees) => { },
  onDelete: (model: EstablishmentEmployees) => { },
  onCloseEditViewModel: () => { },
  onCloseDeleteModel: () => { },
  onCreate: () => { },
  reload: () => { },
  onSearch: (e: any) => { },
  onChangePage: (page: number) => { },
  onConfirmDeleteModel: () => { },
});

export const useEstablishmentSettingsContext = () => useContext(EstablishmentSettingsContext);

export const useEstablishmentSettingsActionsContext = () => useContext(EstablishmentSettingsActionsContext);

type EstablishmentSettingsContextProviderProps = {
  children: ReactNode;
};

const EstablishmentSettingsContextProvider: React.FC<EstablishmentSettingsContextProviderProps> = ({
  children,
}) => {
  const infoViewActionsContext = useInfoViewActionsContext();
  const [{ apiData: EstablishmentEmployeesPage, loading }, { setQueryParams, fetch }] =
    useGetAllEstablishmentEmployeesByUser();

  const [page, setPage] = useState<number>(0);
  const [search, setSearchQuery] = useState('');
  const [openAddEditViewModel, setOpenAddEditViewModel] = React.useState(false);
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [mode, setMode] = useState(ModeComponent.create);
  const [idToDelete, setIdToDelete] = useState(-1);
  const [initialData, setInitialData] = useState<EstablishmentEmployees>(undefined);

  const onCloseEditViewModel = () => {
    setOpenAddEditViewModel(false);
  }

  const reload = () => {
    setInitialData({} as EstablishmentEmployees);
    fetch();
  };

  useEffect(() => {
    reloadData();
  }, [search, page]);

  const reloadData = () => {
    const realPage = page - 1;
    setQueryParams({
      search,
      page: realPage
    });
  };

  const onChangePage = (page: number) => {
    setPage(page);
  };
  const onSearchList = (e: any) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };

  const onSelectToView = (ee: EstablishmentEmployees) => {
    getEstablishmentEmployeeById(ee.id, infoViewActionsContext).then(establishmentEmployees => {
      setInitialData(establishmentEmployees);
      setMode(ModeComponent.view);
      setOpenAddEditViewModel(true);
    })
  };


  const onSelectToEdit = (ee: EstablishmentEmployees) => {
    getEstablishmentEmployeeById(ee.id, infoViewActionsContext).then(establishmentEmployees => {
      setInitialData(establishmentEmployees);
      setMode(ModeComponent.edit);
      setOpenAddEditViewModel(true);
    })
  };

  const onSelectToDelete = (EstablishmentSettings: EstablishmentEmployees) => {
    setOpenDeleteModel(true);
    setIdToDelete(EstablishmentSettings.id);
  };

  const onSelectCreate = () => {
    setMode(ModeComponent.create);
    setInitialData(undefined);
    setOpenAddEditViewModel(true);
  };

  const onConfirmDeleteModel = async () => {
    if (idToDelete !== -1) {
      deleteEstablishmentEmployee(idToDelete, infoViewActionsContext, () => {
        infoViewActionsContext.showMessage('تم الحذف بنجاح');
        onCloseDeleteModel();
        setIdToDelete(-1);
        reloadData();
      });
    }

  };

  const onCloseDeleteModel = () => {
    setOpenDeleteModel(false);
  }

  const actions: EstablishmentSettingsContextActions = {
    onEdit: onSelectToEdit,
    onView: onSelectToView,
    onDelete: onSelectToDelete,
    onCreate: onSelectCreate,
    onCloseEditViewModel: onCloseEditViewModel,
    reload,
    onSearch: onSearchList,
    onChangePage,
    onConfirmDeleteModel,
    onCloseDeleteModel,
  };

  const contextData: EstablishmentSettingsContextData = {
    EstablishmentSettingsPage: EstablishmentEmployeesPage,
    EstablishmentSettings: null,
    loading,
    openAddEditViewModel: openAddEditViewModel,
    initialData,
    modeAddEditViewModel: mode,
    page,
    search,
    openDeleteModel,
  };

  return (
    <EstablishmentSettingsContext.Provider value={contextData}>
      <EstablishmentSettingsActionsContext.Provider value={actions}>
        {children}
      </EstablishmentSettingsActionsContext.Provider>
    </EstablishmentSettingsContext.Provider>
  );
};

export default EstablishmentSettingsContextProvider;
