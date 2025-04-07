'use client';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { message } from 'antd';

import {
  Student,
  GetStudentDto,
} from '@core/types/models/student/StudentTypes';
import { ModeComponent, Page } from '@core/types/models/core/models';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { TechnicalCard } from '@core/types/models/technicalCards/TechnicalCardTypes';
import { YearStatus } from '@core/types/enums/YearStatus';
import { deleteTechnicalCard, getTechnicalCardById, useGetAllTechnicalCardsByUser } from '@core/services/TechnicalCardService';
import { TechnicalCardCategory } from '../../@core/types/models/TechnicalCardCategory/TechnicalCardCategoryTypes';
import { getAllTechnicalCardCategory } from '@core/services/TechnicalCardCategoryService';
import { SourceTechnicalCard } from '@core/types/enums/SourceTechnicalCard';
import { getTechnicalCardAdminById } from '@core/services/TechnicalCardAdminService';
import { getPublishedPopUpForNotification } from '@core/services/PopUpService';
import { PopUp } from '@core/types/models/popup/PopUpTypes';
import PopUpDialog from '../administration/pop-up/content';

export type TechnicalCardContextActions = {
  onEdit: (model: TechnicalCard) => void;
  onView: (model: TechnicalCard) => void;
  onDelete: (model: TechnicalCard) => void;
  onCreate: () => void;
  reload: () => void;
  onSearch: (e: any) => void;
  onChangePage: (page: number) => void;
  onCloseEditViewModel: () => void,
  onCloseDeleteModel: () => void,
  onConfirmDeleteModel: () => void;
  setCategoryFilter: (category: TechnicalCardCategory | null) => void;
  setMonth: (value: any) => void;
};
export type TechnicalCardContextData = {
  technicalCardPage: Page<TechnicalCard>;
  technicalCardCategories: any[];
  loading: boolean;
  page: number;
  search: string;
  openAddEditViewModel: boolean;
  modeAddEditViewModel: ModeComponent;
  initialData: TechnicalCard;
  openDeleteModel: boolean;
};
const TechnicalCardContext = createContext<TechnicalCardContextData>({
  technicalCardPage: {} as Page<TechnicalCard>,
  technicalCardCategories: [],
  loading: true,
  openAddEditViewModel: false,
  initialData: {} as TechnicalCard,
  modeAddEditViewModel: ModeComponent.create,
  page: 0,
  search: '',
  openDeleteModel: false,
});

const TechnicalCardActionsContext = createContext<TechnicalCardContextActions>({
  onEdit: (model: TechnicalCard) => { },
  onView: (model: TechnicalCard) => { },
  onDelete: (model: TechnicalCard) => { },
  onCloseEditViewModel: () => { },
  onCloseDeleteModel: () => { },
  onCreate: () => { },
  reload: () => { },
  onSearch: (e: any) => { },
  onChangePage: (page: number) => { },
  onConfirmDeleteModel: () => { },
  setCategoryFilter: (category: TechnicalCardCategory | null) => { },
  setMonth: (value: any) => { }

});

export const useTechnicalCardContext = () => useContext(TechnicalCardContext);

export const useTechnicalCardActionsContext = () => useContext(TechnicalCardActionsContext);

type TechnicalCardContextProviderProps = {
  children: ReactNode;
};

const TechnicalCardContextProvider: React.FC<TechnicalCardContextProviderProps> = ({
  children,
}) => {
  const infoViewActionsContext = useInfoViewActionsContext();
  const [{ apiData: technicalCardPage, loading }, { setQueryParams, fetch }] =
    useGetAllTechnicalCardsByUser();

  const [page, setPage] = useState<number>(0);
  const [search, setSearchQuery] = useState('');
  const [idTcCategory, setIdTcCategory] = useState<TechnicalCardCategory | null>(null);

  const [technicalCardCategories, setTechnicalCardCategories] = useState<any[]>(
    [],
  );
  const [month, setMonth] = useState(null);

  const [openAddEditViewModel, setOpenAddEditViewModel] = React.useState(false);

  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [mode, setMode] = useState(ModeComponent.create);

  const [idToDelete, setIdToDelete] = useState(-1);
  const [initialData, setInitialData] = useState<TechnicalCard>(undefined);
  const onCloseEditViewModel = () => {
    setOpenAddEditViewModel(false);
  }

  useEffect(() => {
    getAllTechnicalCardCategory(infoViewActionsContext).then((categories) =>
      setTechnicalCardCategories(categories),
    );
  }, [])
  const reload = () => {
    setInitialData({} as TechnicalCard);
    fetch();
  };
  useEffect(() => {
    reloadData();
  }, [search, page, idTcCategory, month]);


  const reloadData = () => {
    const realPage = page - 1;
    setQueryParams({
      search,
      page: realPage,
      idTcCategory: idTcCategory,
      month: month
    });
  };

  const onChangePage = (page: number) => {
    setPage(page);
  };
  const onSearchList = (e: any) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };
  const onSelectToView = (tc: TechnicalCard) => {
    getTechnicalCardById(tc.id, infoViewActionsContext).then(technicalCard => {
      setMode(ModeComponent.view);
      setInitialData(technicalCard);
      setOpenAddEditViewModel(true);
    });
  };
  const onSelectToEdit = (tc: TechnicalCard) => {
    getTechnicalCardById(tc.id, infoViewActionsContext).then(technicalCard => {
      setMode(ModeComponent.edit);
      setInitialData(technicalCard);
      setOpenAddEditViewModel(true);
    });
  };
  const onSelectToDelete = (technicalCard: TechnicalCard) => {
    setOpenDeleteModel(true);
    setIdToDelete(technicalCard.id);
  };

  const onSelectCreate = () => {
    setMode(ModeComponent.create);
    setInitialData(undefined);
    setOpenAddEditViewModel(true);
  };
  const onConfirmDeleteModel = async () => {
    if (idToDelete !== -1) {
      deleteTechnicalCard(idToDelete, infoViewActionsContext, () => {
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
  const actions: TechnicalCardContextActions = {
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
    setCategoryFilter: setIdTcCategory,
    setMonth
  };

  const contextData: TechnicalCardContextData = {
    technicalCardPage: technicalCardPage,
    technicalCardCategories: technicalCardCategories,
    loading,
    openAddEditViewModel: openAddEditViewModel,
    initialData,
    modeAddEditViewModel: mode,
    page,
    search,
    openDeleteModel,
  };

  return (
    <TechnicalCardContext.Provider value={contextData}>
      <TechnicalCardActionsContext.Provider value={actions}>
        {children}
      </TechnicalCardActionsContext.Provider>
    </TechnicalCardContext.Provider>
  );
};

export default TechnicalCardContextProvider;
