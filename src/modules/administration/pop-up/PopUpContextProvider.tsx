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
import { YearStatus } from '@core/types/enums/YearStatus';
import { deleteWeekProgram, getWeekProgramById } from '@core/services/WeekProgramService';
import { useGetAllWeekProgramByUser } from '@core/services/WeekProgramService';
import { getAllByUserAndYear, getCurrentWeekTasks, useGetYearProgramTasks } from '@core/services/YearPragramService';
import { TechnicalCardYearDto } from '@core/types/models/technicalCards/TechnicalCardTypes';
import { TechnicalCardCategory } from '@core/types/models/TechnicalCardCategory/TechnicalCardCategoryTypes';
import { deleteWeekProgramTask, getWeekProgramTasksByIdWeekProgram, getWeekProgramTasksByIdWeekProgramForDocument } from '@core/services/WeekProgramTasksService';
import { AddEditWeekProgramTaskDto, AddEditWeekProgramTaskDtoToDisplay } from '@core/types/models/weekProgramTasks/WeekProgramTasksTypes';
import { TechnicalCardType } from '@core/types/enums/TypeTcTask';
import { PopUp } from '@core/types/models/popup/PopUpTypes';
import { deletePopUp, useGetAllPopUps, getPopUpById, publish } from '@core/services/PopUpService';


export type PopUpContextActions = {
  onEdit: (model: PopUp) => void;
  onView: (model: PopUp) => void;
  onDelete: (model: PopUp) => void;
  onPublish: (model: PopUp, publish: Boolean) => void,
  onCreate: () => void;
  reload: () => void;
  onSearch: (e: any) => void;
  onChangePage: (page: number) => void;
  onCloseEditViewModel: () => void,
  onCloseDeleteModel: () => void,
  onClosePublishModel: () => void,
  onConfirmDeleteModel: () => void;
  onConfirmPublishModel: () => void;

};
export type PopUpContextData = {
  popUpPage: Page<PopUp>;
  popUps: Page<PopUp>;
  loading: boolean;
  page: number;
  search: string;
  openAddEditViewModel: boolean;
  modeAddEditViewModel: ModeComponent;
  initialData: PopUp;
  openDeleteModel: boolean;
  openPublishModel: boolean;
};
const PopUpContext = createContext<PopUpContextData>({
  popUpPage: {} as Page<PopUp>,
  popUps: {} as Page<PopUp>,
  loading: true,
  openAddEditViewModel: false,
  initialData: {} as PopUp,
  modeAddEditViewModel: ModeComponent.create,
  page: 0,
  search: '',
  openDeleteModel: false,
  openPublishModel: false,
});

const PopUpActionsContext = createContext<PopUpContextActions>({
  onEdit: (model: PopUp) => { },
  onView: (model: PopUp) => { },
  onDelete: (model: PopUp) => { },
  onPublish: (model: PopUp) => { },
  onCloseEditViewModel: () => { },
  onCloseDeleteModel: () => { },
  onClosePublishModel: () => { },
  onCreate: () => { },
  reload: () => { },
  onSearch: (e: any) => { },
  onChangePage: (page: number) => { },
  onConfirmDeleteModel: () => { },
  onConfirmPublishModel: () => { },
});

export const usePopUpContext = () => useContext(PopUpContext);

export const usePopUpActionsContext = () => useContext(PopUpActionsContext);

type PopUpContextProviderProps = {
  children: ReactNode;
};

const PopUpContextProvider: React.FC<PopUpContextProviderProps> = ({
  children,
}) => {
  const infoViewActionsContext = useInfoViewActionsContext();
  const [{ apiData: popUpPage, loading }, { setQueryParams, fetch }] =
    useGetAllPopUps();


  const [page, setPage] = useState<number>(0);
  const [search, setSearchQuery] = useState('');
  const [popUp, setPopUp] = useState<Page<PopUp>>();

  const [openAddEditViewModel, setOpenAddEditViewModel] = React.useState(false);

  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [openPublishModel, setOpenPublishModel] = useState(false);

  const [mode, setMode] = useState(ModeComponent.create);

  const [idToDelete, setIdToDelete] = useState(-1);
  const [idToPublish, setIdToPublish] = useState(-1);
  const [publishValue, setPublishValue] = useState(false);
  const [filteredPopUpPage, setFilteredPopUpPage] = useState<Page<PopUp>>(popUpPage);

  const [initialData, setInitialData] = useState<PopUp>(undefined);

  const onCloseEditViewModel = () => {
    setOpenAddEditViewModel(false);
  }

  useEffect(() => {
    setFilteredPopUpPage(popUpPage);
  }, [popUpPage]);


  const reload = () => {
    setInitialData({} as PopUp);
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

  const onSelectToView = (popUp: PopUp) => {
    getPopUpById(popUp.id, infoViewActionsContext).then(popUpView => {
      setInitialData(popUpView);
      setMode(ModeComponent.view);
      setOpenAddEditViewModel(true);
    })
  };


  const onSelectToEdit = (popUp: PopUp) => {
    getPopUpById(popUp.id, infoViewActionsContext).then(popUpEdit => {
      setInitialData(popUpEdit);
      setMode(ModeComponent.edit);
      setOpenAddEditViewModel(true);
    })
  };

  const onSelectToDelete = (popUp: PopUp) => {
    setOpenDeleteModel(true);
    setIdToDelete(popUp.id);
  };

  const onSelectToPublish = (popUp: PopUp, publish: boolean) => {
    setOpenPublishModel(true);
    setIdToPublish(popUp.id);
    setPublishValue(publish);
  };

  const onSelectCreate = () => {
    setMode(ModeComponent.create);
    setInitialData(undefined);
    setOpenAddEditViewModel(true);
  };

  const onConfirmDeleteModel = async () => {
    if (idToDelete !== -1) {
      deletePopUp(idToDelete, infoViewActionsContext, () => {
        infoViewActionsContext.showMessage('تم الحذف بنجاح');
        onCloseDeleteModel();
        setIdToDelete(-1);
        reloadData();
      });
    }
  };

  const onConfirmPublishModel = async () => {
    if (idToPublish !== -1) {
      try {
        publish(idToPublish, publishValue, infoViewActionsContext).then((isActive) => {
          if (isActive) {
            if (publishValue) {
              infoViewActionsContext.showMessage('تم تفعيل الإعلان بنجاح');
            } else {
              infoViewActionsContext.showMessage('تم إلغاء تفعيل الإعلان بنجاح');
            }
            onClosePublishModel();
            setIdToPublish(-1);
            reloadData();
          }
        }).catch((error) => {
          infoViewActionsContext.fetchError(error.message);
        });
      } catch (error) {
        infoViewActionsContext.fetchError(error.message);
        console.error("Error saving pop up:", error.message);
      }
    }
  };


  const onCloseDeleteModel = () => {
    setOpenDeleteModel(false);
  }

  const onClosePublishModel = () => {
    setOpenPublishModel(false);
  }


  const actions: PopUpContextActions = {
    onEdit: onSelectToEdit,
    onView: onSelectToView,
    onDelete: onSelectToDelete,
    onPublish: onSelectToPublish,
    onCreate: onSelectCreate,
    onCloseEditViewModel: onCloseEditViewModel,
    reload,
    onSearch: onSearchList,
    onChangePage,
    onConfirmDeleteModel,
    onConfirmPublishModel,
    onCloseDeleteModel,
    onClosePublishModel,
  };

  const contextData: PopUpContextData = {
    popUpPage: filteredPopUpPage,
    popUps: popUp,
    loading,
    openAddEditViewModel: openAddEditViewModel,
    initialData,
    modeAddEditViewModel: mode,
    page,
    search,
    openDeleteModel,
    openPublishModel
  };

  return (
    <PopUpContext.Provider value={contextData}>
      <PopUpActionsContext.Provider value={actions}>
        {children}
      </PopUpActionsContext.Provider>
    </PopUpContext.Provider>
  );
};

export default PopUpContextProvider;
