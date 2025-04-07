'use client';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { message } from 'antd';


import { Page } from '@core/types/models/core/models';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { TechnicalCardCategory } from '@core/types/models/TechnicalCardCategory/TechnicalCardCategoryTypes';
import { deleteTaskYearProgram, executeTask, useGetYearProgramTasks } from '@core/services/YearPragramService';
import { TechnicalCardYearDto } from '@core/types/models/technicalCards/TechnicalCardTypes';
import { getAllTechnicalCardCategory } from '@core/services/TechnicalCardCategoryService';
import { useRouter } from 'next/navigation';
import { environment } from '../../envirenement/environnement';
export type YearProgramContextActions = {
  reload: () => void;
  onSearch: (e: any) => void;
  onChangePage: (page: number) => void;
  onCloseConfigurationModel: () => void,
  onOpenConfigurationModel: () => void,
  onExecute: (item: any) => void,

  onCloseDeleteModel: () => void,
  onConfirmDeleteModel: () => void;
  onDelete: (item: any) => void;
  setIdTcCategory: (value: any) => void;
  setMonth: (value: any) => void;
  onView: (item: any) => void,

};
export type YearProgramContextData = {
  taskPage: Page<TechnicalCardYearDto>;
  loading: boolean;
  technicalCardCategories: TechnicalCardCategory[]
  page: number;
  search: string;
  openConfigurationModel: boolean;
  openDeleteModel: boolean;
};
const YearProgramContext = createContext<YearProgramContextData>({
  taskPage: {} as Page<TechnicalCardYearDto>,
  loading: true,
  technicalCardCategories: [],
  openConfigurationModel: false,
  page: 0,
  search: '',
  openDeleteModel: false,
});

const YearProgramActionsContext = createContext<YearProgramContextActions>({
  onCloseConfigurationModel: () => { },
  onOpenConfigurationModel: () => { },
  onCloseDeleteModel: () => { },
  reload: () => { },
  onSearch: (e: any) => { },
  onChangePage: (page: number) => { },
  onConfirmDeleteModel: () => { },
  onDelete: (item: any) => { },
  onExecute: (item: any) => { },
  onView: (item: any) => { },

  setIdTcCategory: (value: any) => { },
  setMonth: (value: any) => { }
});

export const useYearProgramContext = () => useContext(YearProgramContext);

export const useYearProgramActionsContext = () => useContext(YearProgramActionsContext);

type YearProgramContextProviderProps = {
  children: ReactNode;
};

const YearProgramContextProvider: React.FC<YearProgramContextProviderProps> = ({
  children,
}) => {
  const infoViewActionsContext = useInfoViewActionsContext();
  const [{ apiData: taskPage, loading }, { setQueryParams, fetch }] = useGetYearProgramTasks();

  const [page, setPage] = useState<number>(0);
  const [search, setSearchQuery] = useState('');
  const [idTcCategory, setIdTcCategory] = useState<TechnicalCardCategory | null>(null);
  const [month, setMonth] = useState(null);

  const [technicalCardCategories, setTechnicalCardCategories] = useState<any[]>(
    [],
  );
  const [openConfigurationModel, setOpenConfigurationModel] = React.useState(false);

  const [openDeleteModel, setOpenDeleteModel] = useState(false);

  const router = useRouter();

  const [idToDelete, setIdToDelete] = useState(-1);

  const onCloseConfigurationModel = () => {
    setOpenConfigurationModel(false);
  }
  const onOpenConfigurationModel = () => {
    setOpenConfigurationModel(true);
  }
  useEffect(() => {
    getAllTechnicalCardCategory(infoViewActionsContext).then((categories) =>
      setTechnicalCardCategories(categories),
    );
  }, [])
  const reload = () => {
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

  const onDelete = (item: any) => {
    setIdToDelete(item.idTask);
    setOpenDeleteModel(true)

  }
  const onView = (item: any) => {
    router.push(`/tasks/details?id=` + item.idTask);
  }

  const onExecute = (item: any) => {
    executeTask(item.idTask, infoViewActionsContext).then(() => {
      infoViewActionsContext.showMessage('تم العملية بنجاح');
      reloadData();
    }).catch((error) => {
      infoViewActionsContext.fetchError(error.message);
    });
  }
  const onConfirmDeleteModel = async () => {
    if (idToDelete !== -1) {
      deleteTaskYearProgram(idToDelete, infoViewActionsContext).then(() => {
        infoViewActionsContext.showMessage('تم الحذف بنجاح');
        onCloseDeleteModel();
        setIdToDelete(-1);
        reloadData();
      }).catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
    }

  };
  const onCloseDeleteModel = () => {
    setOpenDeleteModel(false);
  }
  const actions: YearProgramContextActions = {
    onCloseConfigurationModel: onCloseConfigurationModel,
    onOpenConfigurationModel,
    reload,
    onSearch: onSearchList,
    onChangePage,
    onConfirmDeleteModel,
    onCloseDeleteModel,
    onDelete,
    setIdTcCategory,
    setMonth,
    onExecute,
    onView
  };

  const contextData: YearProgramContextData = {
    taskPage: taskPage,
    loading,
    technicalCardCategories: technicalCardCategories,
    openConfigurationModel: openConfigurationModel,
    page,
    search,
    openDeleteModel,
  };

  return (
    <YearProgramContext.Provider value={contextData}>
      <YearProgramActionsContext.Provider value={actions}>
        {children}
      </YearProgramActionsContext.Provider>
    </YearProgramContext.Provider>
  );
};

export default YearProgramContextProvider;



