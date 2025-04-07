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
import { TechnicalCardYearDto } from '@core/types/models/technicalCards/TechnicalCardTypes';
import { getAllTechnicalCardCategory } from '@core/services/TechnicalCardCategoryService';
import { useRouter } from 'next/navigation';
import { environment } from '../../envirenement/environnement';
import { useGetSearchDonneTasks } from '@core/services/TaskService';
export type DonneTaskContextActions = {
  reload: () => void;
  onSearch: (e: any) => void;
  onChangePage: (page: number) => void;
  setIdTcCategory: (value: any) => void;
  setMonth: (value: any) => void;
};
export type DonneTaskContextData = {
  donneTaskPage: Page<TechnicalCardYearDto>;
  loading: boolean;
  technicalCardCategories: TechnicalCardCategory[]
  page: number;
  search: string;
};
const DonneTaskContext = createContext<DonneTaskContextData>({
  donneTaskPage: {} as Page<TechnicalCardYearDto>,
  loading: true,
  technicalCardCategories: [],
  page: 0,
  search: '',
});

const DonneTaskActionsContext = createContext<DonneTaskContextActions>({
  reload: () => { },
  onSearch: (e: any) => { },
  onChangePage: (page: number) => { },
  setIdTcCategory: (value: any) => { },
  setMonth: (value: any) => { }
});

export const useDonneTaskContext = () => useContext(DonneTaskContext);

export const useDonneTaskActionsContext = () => useContext(DonneTaskActionsContext);

type DonneTaskContextProviderProps = {
  children: ReactNode;
};

const DonneTaskContextProvider: React.FC<DonneTaskContextProviderProps> = ({
  children,
}) => {
  const infoViewActionsContext = useInfoViewActionsContext();
  const [{ apiData: donneTaskPage, loading }, { setQueryParams, fetch }] = useGetSearchDonneTasks();

  const [page, setPage] = useState<number>(0);
  const [search, setSearchQuery] = useState('');
  const [idTcCategory, setIdTcCategory] = useState<TechnicalCardCategory | null>(null);
  const [month, setMonth] = useState(null);

  const [technicalCardCategories, setTechnicalCardCategories] = useState<any[]>(
    [],
  );


  const router = useRouter();

  const [idToDelete, setIdToDelete] = useState(-1);


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


  const onView = (item: any) => {
    router.push(`/donneTasks/details?id=` + item.idTask);
  }

  const actions: DonneTaskContextActions = {
    reload,
    onSearch: onSearchList,
    onChangePage,
    setIdTcCategory,
    setMonth,
  };

  const contextData: DonneTaskContextData = {
    donneTaskPage: donneTaskPage,
    loading,
    technicalCardCategories: technicalCardCategories,
    page,
    search,
  };

  return (
    <DonneTaskContext.Provider value={contextData}>
      <DonneTaskActionsContext.Provider value={actions}>
        {children}
      </DonneTaskActionsContext.Provider>
    </DonneTaskContext.Provider>
  );
};

export default DonneTaskContextProvider;



