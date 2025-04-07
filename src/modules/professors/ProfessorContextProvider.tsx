'use client';
import { getAllScholerYears } from '@core/services/YearService';
import {
  deleteProfessor,
  getProfessorById,
  useGetSearchProfessors,
} from '@core/services/ProfessorService';
import { Professor } from '@core/types/models/professor/ProfessorTypes';
import { ModeComponent, Page } from '@core/types/models/core/models';
import { Year } from '@core/types/models/year/YearTypes';
import { InfoViewActions, useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { message } from 'antd';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

export type ProfessorContextActions = {
  onEdit: (model: Professor) => void;
  onView: (model: Professor) => void;
  onDelete: (model: Professor) => void;
  onCreate: () => void;
  reload: () => void;
  onSearch: (e: any) => void;
  onChangePage: (page: number) => void;
  onCloseModel: () => void;
  onCloseDeleteModel: (open: boolean) => void;
  onConfirmDeleteModel: () => void;
};
export type ProfessorContextData = {
  ProfessorsPage: Page<Professor>;
  loading: boolean;
  page: number;
  search: string;
  openAddEditViewModel: boolean;
  modeAddEditViewModel: ModeComponent;
  initialData: Professor;
  openDeleteModel: boolean;
};
const ProfessorContext = createContext<ProfessorContextData>({
  ProfessorsPage: {} as Page<Professor>,
  loading: true,
  openAddEditViewModel: false,
  initialData: {} as Professor,
  modeAddEditViewModel: ModeComponent.create,
  page: 0,
  search: '',
  openDeleteModel: false,
});

const ProfessorActionsContext = createContext<ProfessorContextActions>({
  onEdit: (model: Professor) => { },
  onView: (model: Professor) => { },
  onDelete: (model: Professor) => { },
  onCloseModel: () => { },
  onCloseDeleteModel: (open: boolean) => { },
  onCreate: () => { },
  reload: () => { },
  onSearch: (e: any) => { },
  onChangePage: (page: number) => { },
  onConfirmDeleteModel: () => { },
});

export const useProfessorContext = () => useContext(ProfessorContext);

export const useProfessorActionsContext = () =>
  useContext(ProfessorActionsContext);

type ProfessorContextProviderProps = {
  children: ReactNode;
};

const ProfessorContextProvider: React.FC<ProfessorContextProviderProps> = ({
  children,
}) => {
  const infoViewActionsContext = useInfoViewActionsContext();
  const [{ apiData: ProfessorsPage, loading }, { setQueryParams, fetch }] =
    useGetSearchProfessors();

  const [page, setPage] = useState<number>(0);
  const [search, setSearchQuery] = useState('');
  const [open, setOpen] = React.useState(false);
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [mode, setMode] = React.useState(ModeComponent.create);
  const [idToDelete, setIdToDelete] = React.useState(-1);
  const [initialData, setInitialData] = React.useState<Professor>(undefined);

  const handleClose = () => setOpen(false);
  const onCloseDeleteModel = () => setOpenDeleteModel(false);

  useEffect(() => { }, []);
  const onChangePage = (page: number) => {
    setPage(page);
  };
  const reload = () => {
    setInitialData({} as Professor);
    fetch();
  };
  useEffect(() => {
    reloadData();
  }, [search, page]);

  const reloadData = () => {
    const realPage = page - 1;
    setQueryParams({
      search,
      page: realPage,
    });
  };
  const onSearchList = (e: any) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };
  const onSelectToView = (Professor: Professor) => {
    getProfessorById(Professor.id, infoViewActionsContext).then(professordto => {
      setMode(ModeComponent.view);
      setInitialData(professordto);
      setOpen(true);
    }
    );
  };
  const onSelectToEdit = (Professor: Professor) => {
    getProfessorById(Professor.id, infoViewActionsContext).then(professordto => {
      setMode(ModeComponent.edit);
      setInitialData(professordto);
      setOpen(true);
    }
    );

  };
  const onSelectToDelete = (Professor: Professor) => {
    setOpenDeleteModel(true);
    setIdToDelete(Professor.id);
  };

  const onSelectCreate = () => {
    setMode(ModeComponent.create);
    setInitialData(undefined);
    setOpen(true);
  };

  const onConfirmDeleteModel = () => {
    if (idToDelete != -1)
      deleteProfessor(idToDelete, infoViewActionsContext, () => {
        message.success('تم الحذف بنجاح');
        onCloseDeleteModel();
        setIdToDelete(-1);
        fetch();
      });
  };
  return (
    <ProfessorContext.Provider
      value={{
        ProfessorsPage: ProfessorsPage,
        loading: loading,
        page: page,
        search: search,
        initialData: initialData,
        openAddEditViewModel: open,
        modeAddEditViewModel: mode,
        openDeleteModel: openDeleteModel,
      }}
    >
      <ProfessorActionsContext.Provider
        value={{
          onEdit: onSelectToEdit,
          onView: onSelectToView,
          onDelete: onSelectToDelete,
          onCreate: onSelectCreate,
          reload: reload,
          onSearch: onSearchList,
          onChangePage: onChangePage,
          onCloseModel: handleClose,
          onCloseDeleteModel: onCloseDeleteModel,
          onConfirmDeleteModel: onConfirmDeleteModel,
        }}
      >
        {children}
      </ProfessorActionsContext.Provider>
    </ProfessorContext.Provider>
  );
};

export default ProfessorContextProvider;


