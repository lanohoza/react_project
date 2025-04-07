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
import { TechnicalCardCategory } from '../../../@core/types/models/TechnicalCardCategory/TechnicalCardCategoryTypes';
import { getAllTechnicalCardCategory } from '@core/services/TechnicalCardCategoryService';
import { deleteTechnicalCardAdmin, getTechnicalCardAdminById, useGetAllTechnicalCardsByAdmin } from '@core/services/TechnicalCardAdminService';
import { saveTcFromAdministrationToUser } from '@core/services/TechnicalCardAdminService';

export type TechnicalCardContextActions = {
  onEdit: (model: TechnicalCard) => void;
  onView: (model: TechnicalCard) => void;
  onDelete: (model: TechnicalCard) => void;
  onCopy: (model: TechnicalCard) => void;
  onCreate: () => void;
  reload: () => void;
  onSearch: (e: any) => void;
  onChangePage: (page: number) => void;
  onCloseEditViewModel: () => void,
  onCloseDeleteModel: () => void,
  onCloseCopyModel: () => void,
  onConfirmDeleteModel: () => void;
  onConfirmCopyModel: () => void;
  setCategoryFilter: (category: TechnicalCardCategory | null) => void;
  setMonth: (value: any) => void;
  setTypeEstablishment: (value: any) => void;
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
  openCopyModel: boolean;
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
  openCopyModel: false,
});

const TechnicalCardActionsContext = createContext<TechnicalCardContextActions>({
  onEdit: (model: TechnicalCard) => { },
  onView: (model: TechnicalCard) => { },
  onDelete: (model: TechnicalCard) => { },
  onCopy: (model: TechnicalCard) => { },
  onCloseEditViewModel: () => { },
  onCloseDeleteModel: () => { },
  onCloseCopyModel: () => { },
  onCreate: () => { },
  reload: () => { },
  onSearch: (e: any) => { },
  onChangePage: (page: number) => { },
  onConfirmDeleteModel: () => { },
  onConfirmCopyModel: () => { },
  setCategoryFilter: (category: TechnicalCardCategory | null) => { },
  setMonth: (value: any) => { },
  setTypeEstablishment: (value: any) => { }

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
    useGetAllTechnicalCardsByAdmin();

  const [page, setPage] = useState<number>(0);
  const [search, setSearchQuery] = useState('');
  const [idTcCategory, setIdTcCategory] = useState<TechnicalCardCategory | null>(null);

  const [technicalCardCategories, setTechnicalCardCategories] = useState<any[]>(
    [],
  );
  const [month, setMonth] = useState(null);

  const [typeEstablishment, setTypeEstablishment] = useState(null);

  const [openAddEditViewModel, setOpenAddEditViewModel] = React.useState(false);

  const [openDeleteModel, setOpenDeleteModel] = useState(false);

  const [openCopyModel, setOpenCopyModel] = useState(false);

  const [mode, setMode] = useState(ModeComponent.create);

  const [idToDelete, setIdToDelete] = useState(-1);

  const [idToCopy, setIdToCopy] = useState(-1);

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
  }, [search, page, idTcCategory, month, typeEstablishment]);
  const reloadData = () => {
    const realPage = page - 1;
    setQueryParams({
      search,
      page: realPage,
      idTcCategory: idTcCategory,
      month: month,
      typeEstablishment: typeEstablishment
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
    getTechnicalCardAdminById(tc.id, infoViewActionsContext).then(technicalCard => {
      console.log(`technicalCard`, technicalCard);
      setMode(ModeComponent.view);
      setInitialData(technicalCard);
      setOpenAddEditViewModel(true);
    });

  };
  const onSelectToEdit = (tc: TechnicalCard) => {
    getTechnicalCardAdminById(tc.id, infoViewActionsContext).then(technicalCard => {
      setMode(ModeComponent.edit);
      setInitialData(technicalCard);
      setOpenAddEditViewModel(true);
    });
  };
  const onSelectToDelete = (technicalCard: TechnicalCard) => {
    setOpenDeleteModel(true);
    setIdToDelete(technicalCard.id);
  };

  const onSelectToCopy = (technicalCard: TechnicalCard) => {
    setOpenCopyModel(true);
    setIdToCopy(technicalCard.id);
  };

  const onSelectCreate = () => {
    setMode(ModeComponent.create);
    setInitialData(undefined);
    setOpenAddEditViewModel(true);
  };

  const onConfirmDeleteModel = async () => {
    if (idToDelete !== -1) {
      deleteTechnicalCardAdmin(idToDelete, infoViewActionsContext, () => {
        infoViewActionsContext.showMessage('تم الحذف بنجاح');
        onCloseDeleteModel();
        setIdToDelete(-1);
        reloadData();
      });
    }
  };

  const onConfirmCopyModel = async () => {
    if (idToCopy !== -1) {
      saveTcFromAdministrationToUser(idToCopy, infoViewActionsContext).then(() => {
        infoViewActionsContext.showMessage('تم إسناد البطاقة التقنية بنجاح');
        onCloseCopyModel();
        setIdToCopy(-1);
        reloadData();
      });
    }
  };

  const onCloseDeleteModel = () => {
    setOpenDeleteModel(false);
  }

  const onCloseCopyModel = () => {
    setOpenCopyModel(false);
  }

  const actions: TechnicalCardContextActions = {
    onEdit: onSelectToEdit,
    onView: onSelectToView,
    onDelete: onSelectToDelete,
    onCopy: onSelectToCopy,
    onCreate: onSelectCreate,
    onCloseEditViewModel: onCloseEditViewModel,
    reload,
    onSearch: onSearchList,
    onChangePage,
    onConfirmDeleteModel,
    onConfirmCopyModel,
    onCloseDeleteModel,
    onCloseCopyModel,
    setCategoryFilter: setIdTcCategory,
    setMonth,
    setTypeEstablishment
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
    openCopyModel,
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
