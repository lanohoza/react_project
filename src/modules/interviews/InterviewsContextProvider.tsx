'use client';
import { getAllScholerYears } from '@core/services/YearService';
import {
  deleteInterview,
  getInterviewById,
  useGetSearchInterviews,
} from '@core/services/InterviewService';
import {
  Interview,
  InterviewType,
  GetInterviewDto,
  InterviewStatus,
} from '@core/types/models/interview/InterviewTypes';
import { ModeComponent, Page } from '@core/types/models/core/models';
import { Year } from '@core/types/models/year/YearTypes';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { message } from 'antd';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Difficulty } from '@core/types/models/difficulty/DifficultyTypes';
import { getAllDifficulties } from '@core/services/DifficultyService';

export type InterviewContextActions = {
  onEdit: (model: Interview) => void;
  onView: (model: Interview) => void;
  onDelete: (model: Interview) => void;
  onCreate: () => void;
  reload: () => void;
  onSearch: (e: any) => void;
  onChangePage: (page: number) => void;
  onCloseModel: () => void;
  onCloseDeleteModel: (open: boolean) => void;
  onConfirmDeleteModel: () => void;
  setSelectedIdYear: (idYear: number) => void;
  setChangeType: (type: InterviewType) => void;
  closeDetailOpen: () => void;
  closeDoInterviewModel: () => void;
  onOpenDoInterviewModel: (model: Interview) => void;
  setChangeStatus: (status: InterviewStatus ) => void,

};
export type InterviewContextData = {
  interviewsPage: Page<GetInterviewDto>;
  loading: boolean;
  page: number;
  search: string;
  openAddEditViewModel: boolean;
  openDoInterviewModel: boolean;
  modeAddEditViewModel: ModeComponent;
  initialData: Interview;
  openDeleteModel: boolean;
  years: Year[];
  difficulties: Difficulty[];
  selectedRow: Interview;
  detailOpen: boolean;
  selectedDoInterview: Interview;
};
const InterviewContext = createContext<InterviewContextData>({
  interviewsPage: {} as Page<GetInterviewDto>,
  loading: true,
  openAddEditViewModel: false,
  initialData: {} as Interview,
  modeAddEditViewModel: ModeComponent.create,
  openDoInterviewModel: false,
  page: 0,
  search: '',
  openDeleteModel: false,
  selectedRow: {} as Interview,
  selectedDoInterview: {} as Interview,

  detailOpen: false,
  years: [],
  difficulties: [],
});

const InterviewActionsContext = createContext<InterviewContextActions>({
  onEdit: (model: Interview) => {},
  onView: (model: Interview) => {},
  onDelete: (model: Interview) => {},
  onCloseModel: () => {},
  onCloseDeleteModel: (open: boolean) => {},
  onCreate: () => {},
  reload: () => {},
  onSearch: (e: any) => {},
  onChangePage: (page: number) => {},
  onConfirmDeleteModel: () => {},
  setSelectedIdYear: (idYear: number) => {},
  setChangeType: (type: InterviewType) => {},
  closeDetailOpen: () => {},
  closeDoInterviewModel: () => {},
  onOpenDoInterviewModel: (model: Interview) => {},
  setChangeStatus: (status: InterviewStatus ) => { },

});

export const useInterviewContext = () => useContext(InterviewContext);

export const useInterviewActionsContext = () =>
  useContext(InterviewActionsContext);

type InterviewContextProviderProps = {
  children: ReactNode;
};

const InterviewContextProvider: React.FC<InterviewContextProviderProps> = ({
  children,
}) => {
  const infoViewActionsContext = useInfoViewActionsContext();
  const [{ apiData: interviewsPage, loading }, { setQueryParams, fetch }] =
    useGetSearchInterviews();
  const [years, setYears] = useState<Year[]>([] as Year[]);
  const [difficulties, setDifficulties] = useState<Difficulty[]>([]);

  const [page, setPage] = useState<number>(0);
  const [search, setSearchQuery] = useState('');
  const [openDoInterviewModel, setOpenAddDoInterviewModel] =
    React.useState(false);
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [mode, setMode] = React.useState(ModeComponent.create);
  const [idToDelete, setIdToDelete] = React.useState(-1);
  const [initialData, setInitialData] = React.useState<Interview>(undefined);
  const [detailOpen, setDetailOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = useState<InterviewStatus>(undefined);

  const [selectedType, setSelectedType] = useState<InterviewType>(undefined);
  const [selectedIdYear, setSelectedIdYear] = useState<number>(-1);
  const [selectedRow, setSelectedRow] = useState<Interview>(undefined);
  const [selectedDoInterview, setSelectedDoInterview] =
    useState<Interview>(undefined);

  const handleClose = () => setOpen(false);
  const onCloseDeleteModel = () => setOpenDeleteModel(false);

  useEffect(() => {
    getAllScholerYears(infoViewActionsContext).then((years) => setYears(years));
    getAllDifficulties(infoViewActionsContext).then((difficultieDtos) =>
      setDifficulties(difficultieDtos),
    );
  }, []);
  const onChangePage = (nextPage: number) => {
    setPage(nextPage);
  };
  
  // In `useEffect`, handle the data appending logic
  const reload = () => {
    setInitialData({} as Interview);
    fetch();
  };
  useEffect(() => {
    reloadData();
  }, [search, page, selectedIdYear, selectedType,selectedStatus]);
  const setChangeType = (type: InterviewType) => {
    setSelectedType(type);
  };
  const reloadData = () => {
    if (selectedIdYear != -1 && selectedType != undefined) {
      const realPage = page - 1;
      setQueryParams({
        search,
        page: realPage,
        idYear: selectedIdYear,
        type: selectedType,
        status: selectedStatus
      });
    }
  };
  const onSearchList = (e: any) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };
  const onSelectToView = (interview: Interview) => {
    getInterviewById(interview.id, infoViewActionsContext).then(
      (interviewdto) => {
        setSelectedRow(interviewdto);
        setDetailOpen(true);
      },
    );
  };

  const closeDetailOpen = () => {
    setSelectedRow(undefined);
    setDetailOpen(false);
  };
  const onSelectToEdit = (interview: Interview) => {
    getInterviewById(interview.id, infoViewActionsContext).then(
      (interviewdto) => {
        setMode(ModeComponent.edit);
        setInitialData(interviewdto);
        setOpen(true);
      },
    );
  };
  const onSelectToDelete = (interview: Interview) => {
    setOpenDeleteModel(true);
    setIdToDelete(interview.id);
  };

  const onSelectCreate = () => {
    setMode(ModeComponent.create);
    setInitialData(undefined);
    setOpen(true);
  };

  const onConfirmDeleteModel = () => {
    if (idToDelete != -1)
      deleteInterview(idToDelete, infoViewActionsContext, () => {
        message.success('تم الحذف بنجاح');
        onCloseDeleteModel();
        setIdToDelete(-1);
        fetch();
      });
  };
  const closeDoInterviewModel = () => {
    setOpenAddDoInterviewModel(false);
  };
  const onOpenDoInterviewModel = (model: Interview) => {
    setOpenAddDoInterviewModel(true);
    setSelectedDoInterview(model);
  };
  return (
    <InterviewContext.Provider
      value={{
        interviewsPage: interviewsPage,
        loading: loading,
        years: years,
        page: page,
        search: search,
        initialData: initialData,
        openAddEditViewModel: open,
        modeAddEditViewModel: mode,
        openDeleteModel: openDeleteModel,
        difficulties: difficulties,
        detailOpen,
        selectedRow,
        openDoInterviewModel,
        selectedDoInterview,
      }}
    >
      <InterviewActionsContext.Provider
        value={{
          onEdit: onSelectToEdit,
          onView: onSelectToView,
          onDelete: onSelectToDelete,
          onCreate: onSelectCreate,
          reload: reload,
          closeDetailOpen,
          setChangeType,
          onSearch: onSearchList,
          onChangePage: onChangePage,
          onCloseModel: handleClose,
          onCloseDeleteModel: onCloseDeleteModel,
          onConfirmDeleteModel: onConfirmDeleteModel,
          setSelectedIdYear: setSelectedIdYear,
          closeDoInterviewModel,
          onOpenDoInterviewModel,
          setChangeStatus: setSelectedStatus

        }}
      >
        {children}
      </InterviewActionsContext.Provider>
    </InterviewContext.Provider>
  );
};

export default InterviewContextProvider;
