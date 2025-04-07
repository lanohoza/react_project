'use client';
import {
  deleteStudent,
  removeStudent,
  useGetSearchStudents,
} from '@core/services/StudentService';
import {
  Student,
  GetStudentDto,
} from '@core/types/models/student/StudentTypes';
import { ModeComponent, Page } from '@core/types/models/core/models';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { message } from 'antd';
import { reload } from 'firebase/auth';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { GetClasseDto } from '@core/types/models/classe/ClasseTypes';
import { getAllClassesByYear } from '@core/services/ClasseService';
import { Year } from '@core/types/models/year/YearTypes';
import { getAllScholerYears } from '@core/services/YearService';

export type StudentContextActions = {
  onEdit: (model: Student) => void;
  onView: (model: Student) => void;
  onDelete: (model: Student) => void;
  onCreate: () => void;
  reload: () => void;
  onSearch: (e: any) => void;
  onChangePage: (page: number) => void;
  onCloseModel: () => void;
  onCloseDeleteModel: (open: boolean) => void;
  onConfirmDeleteModel: () => void;
  setSelectedIdYear: (idYear: number) => void;
  onChangeClass: (idClass: number) => void;
  onSelectToChangeClass: (model: Student) => void;
  OnCloseChangeClassStudent: () => void;
  setOpenImportModel: (open: boolean) => void
  onOpenRemovedStudenModel: (value: boolean) => void,

};
export type StudentContextData = {
  classes: GetClasseDto[];
  studentsPage: Page<GetStudentDto>;
  loading: boolean;
  page: number;
  search: string;
  openAddEditViewModel: boolean;
  modeAddEditViewModel: ModeComponent;
  initialData: GetStudentDto;
  openDeleteModel: boolean;
  years: Year[];
  openChangClasseeModel: boolean;
  openImportModel: boolean;
  openRemovedStudentModel: boolean;

};
const StudentContext = createContext<StudentContextData>({
  classes: [],
  studentsPage: {} as Page<GetStudentDto>,
  loading: true,
  openAddEditViewModel: false,
  initialData: {} as GetStudentDto,
  modeAddEditViewModel: ModeComponent.create,
  page: 0,
  search: '',
  openDeleteModel: false,
  years: [],
  openChangClasseeModel: false,
  openImportModel: false,
  openRemovedStudentModel: false

});

const StudentActionsContext = createContext<StudentContextActions>({
  onEdit: (model: Student) => { },
  onView: (model: Student) => { },
  onDelete: (model: Student) => { },
  onCloseModel: () => { },
  onCloseDeleteModel: (open: boolean) => { },
  onCreate: () => { },
  reload: () => { },
  onSearch: (e: any) => { },
  onChangePage: (page: number) => { },
  onConfirmDeleteModel: () => { },
  onChangeClass: (idClass: number) => { },
  setSelectedIdYear: (idYear: number) => { },
  onSelectToChangeClass: (model: Student) => { },
  OnCloseChangeClassStudent: () => { },
  setOpenImportModel: (open: boolean) => { },
  onOpenRemovedStudenModel: (value: boolean) => { },

});

export const useStudentContext = () => useContext(StudentContext);

export const useStudentActionsContext = () => useContext(StudentActionsContext);

type StudentContextProviderProps = {
  children: ReactNode;
};

const StudentContextProvider: React.FC<StudentContextProviderProps> = ({
  children,
}) => {
  const infoViewActionsContext = useInfoViewActionsContext();
  const [{ apiData: studentsPage, loading }, { setQueryParams, fetch }] =
    useGetSearchStudents();
  const [classes, setClasses] = useState<GetClasseDto[]>([] as GetClasseDto[]);
  const [years, setYears] = useState<Year[]>([] as Year[]);

  useEffect(() => {
    getAllScholerYears(infoViewActionsContext).then((years) => setYears(years));
  }, []);
  const [openRemovedStudentModel, setOpenRemovedStudentModel] = React.useState(false);

  const [page, setPage] = useState<number>(0);
  const [search, setSearchQuery] = useState('');
  const [open, setOpen] = React.useState(false);
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [openImportModel, setOpenImportModel] = useState(false);


  const [mode, setMode] = React.useState(ModeComponent.create);
  const [idToDelete, setIdToDelete] = React.useState(-1);
  const [selcetedIdClass, setSelcetedIdClass] = React.useState(-1);
  const [initialData, setInitialData] =
    React.useState<GetStudentDto>(undefined);
  const [openChangeClasseeModel, setOpenChangeClasseeModel] = useState(false);

  const handleClose = () => setOpen(false);
  const onCloseDeleteModel = () => setOpenDeleteModel(false);
  const onChangePage = (page: number) => {
    setPage(page);
  };
  const reload = () => {
    setInitialData({} as GetStudentDto);
    fetch();
  };
  useEffect(() => {
    reloadData();
  }, [search, page, selcetedIdClass]);

  const onSearchList = (e: any) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };
  const onSelectToView = (student: GetStudentDto) => {
    setMode(ModeComponent.view);
    setInitialData(student);
    setOpen(true);
  };
  const onSelectToEdit = (student: GetStudentDto) => {
    setMode(ModeComponent.edit);
    setInitialData(student);
    setOpen(true);
  };
  const onSelectToDelete = (student: GetStudentDto) => {
    setOpenDeleteModel(true);
    setIdToDelete(student.id);
  };

  const onSelectCreate = () => {
    setMode(ModeComponent.create);
    setInitialData(undefined);
    setOpen(true);
  };
  const onConfirmDeleteModel = () => {
    if (idToDelete != -1) {

      /*      deleteStudent(idToDelete, infoViewActionsContext, () => {
              infoViewActionsContext.showMessage('تم الحذف بنجاح');
              onCloseDeleteModel();
              setIdToDelete(-1);
              fetch();
            });*/
      removeStudent(idToDelete, selcetedIdClass, infoViewActionsContext, () => {
        infoViewActionsContext.showMessage('تم الحذف بنجاح');
        onCloseDeleteModel();
        setIdToDelete(-1);
        fetch();
      });

    }

  };
  const onSelectYear = (idYear: number) => {
    getAllClassesByYear(idYear, infoViewActionsContext).then((classedtos) =>
      setClasses(classedtos),
    );
  };
  const reloadData = () => {
    if (selcetedIdClass != -1) {
      const realPage = page - 1;
      setQueryParams({
        search,
        page: realPage,
        idClasse: selcetedIdClass,
      });
    }
  };
  const onChangeClass = (idClass: number) => {
    setSelcetedIdClass(idClass);
  };
  const onSelectToChangeClass = (student: GetStudentDto) => {
    setOpenChangeClasseeModel(true);
    setInitialData(student);
  };
  const OnCloseChangeClassStudent = () => {
    setOpenChangeClasseeModel(false);
  };

  const onOpenRemovedModel = (value: boolean) => {
    setOpenRemovedStudentModel(value);
  }
  return (
    <StudentContext.Provider
      value={{
        classes: classes,
        openImportModel: openImportModel,
        years: years,
        studentsPage: studentsPage,
        loading: loading,
        page: page,
        search: search,
        initialData: initialData,
        openAddEditViewModel: open,
        modeAddEditViewModel: mode,
        openDeleteModel: openDeleteModel,
        openChangClasseeModel: openChangeClasseeModel,
        openRemovedStudentModel
      }}
    >
      <StudentActionsContext.Provider
        value={{
          onEdit: onSelectToEdit,
          onView: onSelectToView,
          onDelete: onSelectToDelete,
          onCreate: onSelectCreate,
          reload: reload,
          onSearch: onSearchList,
          onChangePage: onChangePage,
          onCloseModel: handleClose,
          onCloseDeleteModel: onCloseDeleteModel,
          onConfirmDeleteModel: onConfirmDeleteModel,
          setSelectedIdYear: onSelectYear,
          onChangeClass: onChangeClass,
          onSelectToChangeClass: onSelectToChangeClass,
          OnCloseChangeClassStudent: OnCloseChangeClassStudent,
          setOpenImportModel: setOpenImportModel,
          onOpenRemovedStudenModel: onOpenRemovedModel
        }}
      >
        {children}
      </StudentActionsContext.Provider>
    </StudentContext.Provider>
  );
};

export default StudentContextProvider;
