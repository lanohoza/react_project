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
import { useGetSearchTCO002SubjectConditions } from '@core/services/scripts/TCO002ScriptService';
import { deleteTCO002SubjectConditions, getTCO002SubjectConditions } from '@core/services/scripts/TCO002ScriptService';


export type TCO002SubjectConditionContextActions = {
  onEdit: (model: any) => void;
  onView: (model: any) => void;
  onDelete: (model: any) => void;
  onCreate: () => void;
  reload: () => void;
  onSearch: (e: any) => void;
  onChangePage: (page: number) => void;
  onCloseEditViewModel: () => void,
  onCloseDeleteModel: () => void,
  onConfirmDeleteModel: () => void;

};
export type TCO002SubjectConditionContextData = {
  TCO001Page: Page<any>;
  loading: boolean;
  page: number;
  search: string;
  openAddEditViewModel: boolean;
  modeAddEditViewModel: ModeComponent;
  initialData: any;
  openDeleteModel: boolean;
};
const TCO002SubjectConditionContext = createContext<TCO002SubjectConditionContextData>({
  TCO001Page: {} as Page<any>,
  loading: true,
  openAddEditViewModel: false,
  initialData: {} as any,
  modeAddEditViewModel: ModeComponent.create,
  page: 0,
  search: '',
  openDeleteModel: false,
});

const TCO002SubjectConditionActionsContext = createContext<TCO002SubjectConditionContextActions>({
  onEdit: (model: any) => { },
  onView: (model: any) => { },
  onDelete: (model: any) => { },
  onCloseEditViewModel: () => { },
  onCloseDeleteModel: () => { },
  onCreate: () => { },
  reload: () => { },
  onSearch: (e: any) => { },
  onChangePage: (page: number) => { },
  onConfirmDeleteModel: () => { },
});

export const useTCO002SubjectConditionContext = () => useContext(TCO002SubjectConditionContext);

export const useTCO002SubjectConditionActionsContext = () => useContext(TCO002SubjectConditionActionsContext);

type TCO002SubjectConditionsContextProviderProps = {
  children: ReactNode;
};

const TCO002SubjectConditionsContextProvider: React.FC<TCO002SubjectConditionsContextProviderProps> = ({
  children,
}) => {
  const infoViewActionsContext = useInfoViewActionsContext();
  const [{ apiData: TCO001Page, loading }, { setQueryParams, fetch }] = useGetSearchTCO002SubjectConditions();


  const [page, setPage] = useState<number>(0);
  const [search, setSearchQuery] = useState('');

  const [openAddEditViewModel, setOpenAddEditViewModel] = React.useState(false);

  const [openDeleteModel, setOpenDeleteModel] = useState(false);

  const [mode, setMode] = useState(ModeComponent.create);

  const [idToDelete, setIdToDelete] = useState(-1);

  const [initialData, setInitialData] = useState<any>(undefined);

  const onCloseEditViewModel = () => {
    setOpenAddEditViewModel(false);
  }


  const reload = () => {
    setInitialData({} as any);
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

  const onSelectToView = (tCE002Condition: any) => {
    getTCO002SubjectConditions(tCE002Condition.id, infoViewActionsContext).then(tCE002ConditionView => {
      setInitialData(tCE002ConditionView);
      setMode(ModeComponent.view);
      setOpenAddEditViewModel(true);
    })
  };


  const onSelectToEdit = (tCE002Condition: any) => {
    getTCO002SubjectConditions(tCE002Condition.id, infoViewActionsContext).then(tCE002ConditionEdit => {
      setInitialData(tCE002ConditionEdit);
      setMode(ModeComponent.edit);
      setOpenAddEditViewModel(true);
    })
  };

  const onSelectToDelete = (tCE002Condition: any) => {
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
      deleteTCO002SubjectConditions(idToDelete, infoViewActionsContext).then(() => {
        infoViewActionsContext.showMessage('تم الحذف بنجاح');
        onCloseDeleteModel();
        setIdToDelete(-1);
        reloadData();
      }).catch(() => {


      })
    }
  };

  const onCloseDeleteModel = () => {
    setOpenDeleteModel(false);
  }


  const actions: TCO002SubjectConditionContextActions = {
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

  const contextData: TCO002SubjectConditionContextData = {
    TCO001Page: TCO001Page,
    loading,
    openAddEditViewModel: openAddEditViewModel,
    initialData,
    modeAddEditViewModel: mode,
    page,
    search,
    openDeleteModel,
  };

  return (
    <TCO002SubjectConditionContext.Provider value={contextData}>
      <TCO002SubjectConditionActionsContext.Provider value={actions}>
        {children}
      </TCO002SubjectConditionActionsContext.Provider>
    </TCO002SubjectConditionContext.Provider>
  );
};

export default TCO002SubjectConditionsContextProvider;
