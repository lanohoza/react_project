'use client';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { TCE002ConditionToDisplayDto } from '@core/types/models/script/TCE002ConditionDto/TCE002ConditionTypes';
import { ModeComponent, Page } from '@core/types/models/core/models';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { useGetAllTCE002Condition, getTCE002ConditionById, deleteTCE002Condition } from '@core/services/TCE002ConditionService';


export type TCE002ConditionContextActions = {
  onEdit: (model: TCE002ConditionToDisplayDto) => void;
  onView: (model: TCE002ConditionToDisplayDto) => void;
  onDelete: (model: TCE002ConditionToDisplayDto) => void;
  onCreate: () => void;
  reload: () => void;
  onSearch: (e: any) => void;
  onChangePage: (page: number) => void;
  onCloseEditViewModel: () => void,
  onCloseDeleteModel: () => void,
  onConfirmDeleteModel: () => void;

};
export type TCE002ConditionContextData = {
  TCE002ConditionPage: Page<TCE002ConditionToDisplayDto>;
  loading: boolean;
  page: number;
  search: string;
  openAddEditViewModel: boolean;
  modeAddEditViewModel: ModeComponent;
  initialData: TCE002ConditionToDisplayDto;
  openDeleteModel: boolean;
};
const TCE002ConditionContext = createContext<TCE002ConditionContextData>({
  TCE002ConditionPage: {} as Page<TCE002ConditionToDisplayDto>,
  loading: true,
  openAddEditViewModel: false,
  initialData: {} as TCE002ConditionToDisplayDto,
  modeAddEditViewModel: ModeComponent.create,
  page: 0,
  search: '',
  openDeleteModel: false,
});

const TCE002ConditionActionsContext = createContext<TCE002ConditionContextActions>({
  onEdit: (model: TCE002ConditionToDisplayDto) => { },
  onView: (model: TCE002ConditionToDisplayDto) => { },
  onDelete: (model: TCE002ConditionToDisplayDto) => { },
  onCloseEditViewModel: () => { },
  onCloseDeleteModel: () => { },
  onCreate: () => { },
  reload: () => { },
  onSearch: (e: any) => { },
  onChangePage: (page: number) => { },
  onConfirmDeleteModel: () => { },
});

export const useTCE002ConditionContext = () => useContext(TCE002ConditionContext);

export const useTCE002ConditionActionsContext = () => useContext(TCE002ConditionActionsContext);

type TCE002ConditionContextProviderProps = {
  children: ReactNode;
};

const TCE002ConditionContextProvider: React.FC<TCE002ConditionContextProviderProps> = ({
  children,
}) => {
  const infoViewActionsContext = useInfoViewActionsContext();
  const [{ apiData: TCE002ConditionPage, loading }, { setQueryParams, fetch }] =
    useGetAllTCE002Condition();


  const [page, setPage] = useState<number>(0);
  const [search, setSearchQuery] = useState('');

  const [openAddEditViewModel, setOpenAddEditViewModel] = React.useState(false);

  const [openDeleteModel, setOpenDeleteModel] = useState(false);

  const [mode, setMode] = useState(ModeComponent.create);

  const [idToDelete, setIdToDelete] = useState(-1);

  const [initialData, setInitialData] = useState<TCE002ConditionToDisplayDto>(undefined);

  const onCloseEditViewModel = () => {
    setOpenAddEditViewModel(false);
  }


  const reload = () => {
    setInitialData({} as TCE002ConditionToDisplayDto);
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

  const onSelectToView = (tCE002Condition: TCE002ConditionToDisplayDto) => {
    getTCE002ConditionById(tCE002Condition.id, infoViewActionsContext).then(tCE002ConditionView => {
      setInitialData(tCE002ConditionView);
      setMode(ModeComponent.view);
      setOpenAddEditViewModel(true);
    })
  };


  const onSelectToEdit = (tCE002Condition: TCE002ConditionToDisplayDto) => {
    getTCE002ConditionById(tCE002Condition.id, infoViewActionsContext).then(tCE002ConditionEdit => {
      setInitialData(tCE002ConditionEdit);
      setMode(ModeComponent.edit);
      setOpenAddEditViewModel(true);
    })
  };

  const onSelectToDelete = (tCE002Condition: TCE002ConditionToDisplayDto) => {
    setOpenDeleteModel(true);
    setIdToDelete(tCE002Condition.id);
  };

  const onSelectCreate = () => {
    setMode(ModeComponent.create);
    setInitialData(undefined);
    setOpenAddEditViewModel(true);
  };

  const onConfirmDeleteModel = async () => {
    if (idToDelete !== -1) {
      deleteTCE002Condition(idToDelete, infoViewActionsContext, () => {
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


  const actions: TCE002ConditionContextActions = {
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

  const contextData: TCE002ConditionContextData = {
    TCE002ConditionPage: TCE002ConditionPage,
    loading,
    openAddEditViewModel: openAddEditViewModel,
    initialData,
    modeAddEditViewModel: mode,
    page,
    search,
    openDeleteModel,
  };

  return (
    <TCE002ConditionContext.Provider value={contextData}>
      <TCE002ConditionActionsContext.Provider value={actions}>
        {children}
      </TCE002ConditionActionsContext.Provider>
    </TCE002ConditionContext.Provider>
  );
};

export default TCE002ConditionContextProvider;
