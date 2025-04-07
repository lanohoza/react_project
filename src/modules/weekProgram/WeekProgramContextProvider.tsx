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
import { AddEditWeekProgramDto } from '@core/types/models/weekProgram/WeekProgramTypes';
import { useGetAllWeekProgramByUser } from '@core/services/WeekProgramService';
import { getAllByUserAndYear, getAllTaskByUserAndYear, getCurrentWeekTasks, useGetYearProgramTasks } from '@core/services/YearPragramService';
import { TechnicalCardYearDto } from '@core/types/models/technicalCards/TechnicalCardTypes';
import { TechnicalCardCategory } from '@core/types/models/TechnicalCardCategory/TechnicalCardCategoryTypes';
import { deleteWeekProgramTask, getWeekProgramTasksByIdWeekProgram, getWeekProgramTasksByIdWeekProgramForDocument } from '@core/services/WeekProgramTasksService';
import { AddEditWeekProgramTaskDto, AddEditWeekProgramTaskDtoToDisplay } from '@core/types/models/weekProgramTasks/WeekProgramTasksTypes';
import { TechnicalCardType } from '@core/types/enums/TypeTcTask';
import { AddEditTasksWeekProgramDto } from '@core/types/models/addEditTasksWeekProgramDto/AddEditTasksWeekProgramDtoTypes';


export type WeekProgramContextActions = {
  onEdit: (model: AddEditWeekProgramDto) => void;
  onView: (model: AddEditWeekProgramDto) => void;
  onDelete: (model: AddEditWeekProgramDto) => void;
  onDeleteTask: (model: number) => void;
  onCreate: () => void;
  reload: () => void;
  onSearch: (e: any) => void;
  onChangePage: (page: number) => void;
  onCloseEditViewModel: () => void,
  onCloseDeleteModel: () => void,
  onCloseDeleteTaskModel: () => void,
  onConfirmDeleteModel: () => void;
  onConfirmDeleteTaskModel: () => void;
  setMonth: (value: any) => void;
};
export type WeekProgramContextData = {
  weekProgramPage: Page<AddEditWeekProgramDto>;
  // thisWeekTasks: TechnicalCardYearDto[];
  tasksYearProgram: TechnicalCardYearDto[];
  selectedTasks: AddEditTasksWeekProgramDto;
  loading: boolean;
  page: number;
  search: string;
  openAddEditViewModel: boolean;
  modeAddEditViewModel: ModeComponent;
  initialData: AddEditTasksWeekProgramDto;
  openDeleteModel: boolean;
  openDeleteTaskModel: boolean;
  selectedMonth: number;
};
const WeekProgramContext = createContext<WeekProgramContextData>({
  weekProgramPage: {} as Page<AddEditWeekProgramDto>,
  // thisWeekTasks: {} as TechnicalCardYearDto[],
  tasksYearProgram: {} as TechnicalCardYearDto[],
  selectedTasks: {} as AddEditTasksWeekProgramDto,
  loading: true,
  openAddEditViewModel: false,
  initialData: {} as AddEditTasksWeekProgramDto,
  modeAddEditViewModel: ModeComponent.create,
  page: 0,
  search: '',
  openDeleteModel: false,
  openDeleteTaskModel: false,
  selectedMonth: -1,
});

const WeekProgramActionsContext = createContext<WeekProgramContextActions>({
  onEdit: (model: AddEditWeekProgramDto) => { },
  onView: (model: AddEditWeekProgramDto) => { },
  onDelete: (model: AddEditWeekProgramDto) => { },
  onDeleteTask: (model: number) => { },
  onCloseEditViewModel: () => { },
  onCloseDeleteModel: () => { },
  onCloseDeleteTaskModel: () => { },
  onCreate: () => { },
  reload: () => { },
  onSearch: (e: any) => { },
  onChangePage: (page: number) => { },
  onConfirmDeleteModel: () => { },
  onConfirmDeleteTaskModel: () => { },
  setMonth: (value: any) => { }

});

export const useWeekProgramContext = () => useContext(WeekProgramContext);

export const useWeekProgramActionsContext = () => useContext(WeekProgramActionsContext);

type WeekProgramContextProviderProps = {
  children: ReactNode;
};

const WeekProgramContextProvider: React.FC<WeekProgramContextProviderProps> = ({
  children,
}) => {
  const infoViewActionsContext = useInfoViewActionsContext();
  const [
    { apiData: weekProgramPage, loading },
    { setQueryParams: setWeekProgramParams, fetch: fetchWeekProgram }
  ] = useGetAllWeekProgramByUser();

  const [tasksYearProgram, setTaskYeartasksProgram] = useState([]);
  const [selectedTasks, setselectedTasks] = useState<AddEditTasksWeekProgramDto>();
  const [selectedMonth, setSelectedMonth] = useState<number>(-1);
  const [page, setPage] = useState<number>(0);
  const [search, setSearchQuery] = useState('');
  const [month, setMonth] = useState(0);
  const [allTasks, setAllTasks] = useState([]);

  const [openAddEditViewModel, setOpenAddEditViewModel] = React.useState(false);

  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [openDeleteTaskModel, setOpenDeleteTaskModel] = useState(false);

  const [mode, setMode] = useState(ModeComponent.create);

  const [idToDelete, setIdToDelete] = useState(-1);
  const [idTaskToDelete, setIdTaskToDelete] = useState(-1);
  const [tasks, setTasks] = useState([]);
  const [filteredWeekProgramPage, setFilteredWeekProgramPage] = useState<Page<AddEditWeekProgramDto>>(weekProgramPage);

  const [initialData, setInitialData] = useState<AddEditTasksWeekProgramDto>(undefined);

  const onCloseEditViewModel = () => {
    setOpenAddEditViewModel(false);
  }

  useEffect(() => {
    setFilteredWeekProgramPage(weekProgramPage);
  }, [weekProgramPage]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        getAllTaskByUserAndYear(infoViewActionsContext).then((taskData) => {
          setTaskYeartasksProgram(taskData);
          setAllTasks(taskData);
        });
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchData();
  }, []);

  const reload = () => {
    setInitialData({} as AddEditTasksWeekProgramDto);
    fetchWeekProgram();
  };

  useEffect(() => {
    reloadData();
  }, [page, selectedMonth]);

  const reloadData = () => {
    const realPage = page - 1;
    setWeekProgramParams({
      page: realPage,
      month: selectedMonth !== -1 ? selectedMonth : undefined,
    });
  };

  const onChangePage = (page: number) => {
    setPage(page);
  };
  const onSearchList = (e: any) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };

  const onSelectToView = (wp: AddEditWeekProgramDto) => {
    getWeekProgramTasksByIdWeekProgram(wp.id, infoViewActionsContext).then(listWeekProgramTask => {
      setInitialData(listWeekProgramTask);
      setselectedTasks(listWeekProgramTask);
      setMode(ModeComponent.view);
      setOpenAddEditViewModel(true);
    })
  };


  const onSelectToEdit = (wp: AddEditWeekProgramDto) => {
    getWeekProgramTasksByIdWeekProgram(wp.id, infoViewActionsContext).then(listWeekProgramTask => {
      setInitialData(listWeekProgramTask);
      setselectedTasks(listWeekProgramTask);
      setMode(ModeComponent.edit);
      setOpenAddEditViewModel(true);
    })
  };

  const onSelectToDelete = (WeekProgram: AddEditWeekProgramDto) => {
    setOpenDeleteModel(true);
    setIdToDelete(WeekProgram.id);
  };

  const onSelectTaskToDelete = (idTaskWeekProgram: number) => {
    setOpenDeleteTaskModel(true);
    setIdTaskToDelete(idTaskWeekProgram);
  };

  const onSelectCreate = () => {
    setMode(ModeComponent.create);
    setInitialData(undefined);
    setOpenAddEditViewModel(true);
  };

  const onConfirmDeleteModel = async () => {
    if (idToDelete !== -1) {
      deleteWeekProgram(idToDelete, infoViewActionsContext, () => {
        infoViewActionsContext.showMessage('تم الحذف بنجاح');
        onCloseDeleteModel();
        setIdToDelete(-1);
        reloadData();
      });
    }

  };

  const onConfirmDeleteTaskModel = async () => {
    if (idTaskToDelete !== -1) {
      deleteWeekProgramTask(idTaskToDelete, infoViewActionsContext, () => {
        infoViewActionsContext.showMessage('تم الحذف بنجاح');
        onCloseDeleteTaskModel();
        onCloseEditViewModel();
        setIdToDelete(-1);
        reloadData();
      });
    }

  };

  const onCloseDeleteModel = () => {
    setOpenDeleteModel(false);
  }

  const onCloseDeleteTaskModel = () => {
    setOpenDeleteTaskModel(false);
  }

  const handleSetMonth = (value: number) => {
    if (value === -1) {
      setFilteredWeekProgramPage(weekProgramPage);
    } else {
      const filteredData = {
        ...weekProgramPage,
        content: weekProgramPage.content.filter((program) => program.idMonth === value),
      };
      setFilteredWeekProgramPage(filteredData);
    }
  };


  const actions: WeekProgramContextActions = {
    onEdit: onSelectToEdit,
    onView: onSelectToView,
    onDelete: onSelectToDelete,
    onDeleteTask: onSelectTaskToDelete,
    onCreate: onSelectCreate,
    onCloseEditViewModel: onCloseEditViewModel,
    reload,
    onSearch: onSearchList,
    onChangePage,
    onConfirmDeleteModel,
    onConfirmDeleteTaskModel,
    onCloseDeleteModel,
    onCloseDeleteTaskModel,
    setMonth: handleSetMonth,
  };

  const contextData: WeekProgramContextData = {
    weekProgramPage: filteredWeekProgramPage,
    tasksYearProgram: allTasks,
    selectedTasks: selectedTasks,
    loading,
    openAddEditViewModel: openAddEditViewModel,
    initialData,
    modeAddEditViewModel: mode,
    page,
    search,
    openDeleteModel,
    openDeleteTaskModel,
    selectedMonth,
  };

  return (
    <WeekProgramContext.Provider value={contextData}>
      <WeekProgramActionsContext.Provider value={actions}>
        {children}
      </WeekProgramActionsContext.Provider>
    </WeekProgramContext.Provider>
  );
};

export default WeekProgramContextProvider;
