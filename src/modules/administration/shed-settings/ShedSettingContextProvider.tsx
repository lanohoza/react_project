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
import { PopUp } from '@core/types/models/popup/PopUpTypes';
import { deletePopUp, getAllPopUps, getPopUpById, publish } from '@core/services/PopUpService';
import { ShedSettingDto, ShedSettingToDisplayDto } from '@core/types/models/shedSetting/ShedSettingTypes';
import { deleteShedSetting, useGetAllShedSettings, getShedSettingById, useGetAllShedSetting } from '@core/services/ShedSettingService';


export type ShedSettingContextActions = {
  onEdit: (model: ShedSettingDto) => void;
  onView: (model: ShedSettingDto) => void;
  onDelete: (model: ShedSettingDto) => void;
  onCreate: () => void;
  reload: () => void;
  onSearch: (e: any) => void;
  onChangePage: (page: number) => void;
  onCloseEditViewModel: () => void,
  onCloseDeleteModel: () => void,
  onConfirmDeleteModel: () => void;

};
export type ShedSettingContextData = {
  shedSettingPage: Page<ShedSettingToDisplayDto>;
  loading: boolean;
  page: number;
  search: string;
  openAddEditViewModel: boolean;
  modeAddEditViewModel: ModeComponent;
  initialData: ShedSettingDto;
  openDeleteModel: boolean;
};
const ShedSettingContext = createContext<ShedSettingContextData>({
  shedSettingPage: {} as Page<ShedSettingToDisplayDto>,
  loading: true,
  openAddEditViewModel: false,
  initialData: {} as ShedSettingDto,
  modeAddEditViewModel: ModeComponent.create,
  page: 0,
  search: '',
  openDeleteModel: false,
});

const ShedSettingActionsContext = createContext<ShedSettingContextActions>({
  onEdit: (model: ShedSettingDto) => { },
  onView: (model: ShedSettingDto) => { },
  onDelete: (model: ShedSettingDto) => { },
  onCloseEditViewModel: () => { },
  onCloseDeleteModel: () => { },
  onCreate: () => { },
  reload: () => { },
  onSearch: (e: any) => { },
  onChangePage: (page: number) => { },
  onConfirmDeleteModel: () => { },
});

export const useShedSettingContext = () => useContext(ShedSettingContext);

export const useShedSettingActionsContext = () => useContext(ShedSettingActionsContext);

type ShedSettingContextProviderProps = {
  children: ReactNode;
};

const ShedSettingContextProvider: React.FC<ShedSettingContextProviderProps> = ({
  children,
}) => {
  const infoViewActionsContext = useInfoViewActionsContext();
  const [{ apiData: ShedSettingPage, loading }, { setQueryParams, fetch }] =
    useGetAllShedSetting();


  const [page, setPage] = useState<number>(0);
  const [search, setSearchQuery] = useState('');
  const [shedSetting, setShedSetting] = useState<Page<ShedSettingDto>>();

  const [openAddEditViewModel, setOpenAddEditViewModel] = React.useState(false);

  const [openDeleteModel, setOpenDeleteModel] = useState(false);

  const [mode, setMode] = useState(ModeComponent.create);

  const [idToDelete, setIdToDelete] = useState(-1);

  const [initialData, setInitialData] = useState<ShedSettingDto>(undefined);

  const onCloseEditViewModel = () => {
    setOpenAddEditViewModel(false);
  }


  const reload = () => {
    setInitialData({} as ShedSettingDto);
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

  const onSelectToView = (shedSetting: ShedSettingDto) => {
    getShedSettingById(shedSetting.id, infoViewActionsContext).then(shedSettingView => {
      setInitialData(shedSettingView);
      setMode(ModeComponent.view);
      setOpenAddEditViewModel(true);
    })
  };


  const onSelectToEdit = (shedSetting: ShedSettingDto) => {
    getShedSettingById(shedSetting.id, infoViewActionsContext).then(shedSettingEdit => {
      setInitialData(shedSettingEdit);
      setMode(ModeComponent.edit);
      setOpenAddEditViewModel(true);
    })
  };

  const onSelectToDelete = (shedSetting: ShedSettingDto) => {
    setOpenDeleteModel(true);
    setIdToDelete(shedSetting.id);
  };

  const onSelectCreate = () => {
    setMode(ModeComponent.create);
    setInitialData(undefined);
    setOpenAddEditViewModel(true);
  };

  const onConfirmDeleteModel = async () => {
    if (idToDelete !== -1) {
      deleteShedSetting(idToDelete, infoViewActionsContext, () => {
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


  const actions: ShedSettingContextActions = {
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

  const contextData: ShedSettingContextData = {
    shedSettingPage: ShedSettingPage,
    loading,
    openAddEditViewModel: openAddEditViewModel,
    initialData,
    modeAddEditViewModel: mode,
    page,
    search,
    openDeleteModel,
  };

  return (
    <ShedSettingContext.Provider value={contextData}>
      <ShedSettingActionsContext.Provider value={actions}>
        {children}
      </ShedSettingActionsContext.Provider>
    </ShedSettingContext.Provider>
  );
};

export default ShedSettingContextProvider;
