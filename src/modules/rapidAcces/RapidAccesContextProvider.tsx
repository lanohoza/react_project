'use client';


import { Page } from '@core/types/models/core/models';

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { GetStudentDto, Student } from '@core/types/models/student/StudentTypes';
import { findStudentById, useGetSearchCurrentYearStudents } from '@core/services/StudentService';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';

export type RapidAccesContextActions = {
  onSearch: (e: any) => void;
  onChangePage: (page: number) => void;
  onChangeOpenAddInterviewAction: (state: boolean) => void;
  onChangeOpenViewStudentAction: (state: boolean) => void;
  setSelectdStudent: (student: Student) => void;
  onViewStudent: (student: Student) => void;

};

export type RapidAccesContextData = {
  studentsPage: Page<GetStudentDto>;
  loading: boolean;
  page: number;
  search: string;
  openAddInterviewAction: boolean;
  selectdStudent: Student;
  openViewStuentAction: boolean;
};

const RapidAccesContext = createContext<RapidAccesContextData>({
  studentsPage: {} as Page<GetStudentDto>,
  loading: true,
  page: 0,
  openAddInterviewAction: false,
  openViewStuentAction: false,
  search: '',
  selectdStudent: undefined
});

const RapidAccesActionsContext = createContext<RapidAccesContextActions>({
  onSearch: (e: any) => { },
  onChangePage: (page: number) => { },
  onChangeOpenAddInterviewAction: (state: boolean) => { },
  onChangeOpenViewStudentAction: (state: boolean) => { },
  setSelectdStudent: (student: Student) => { },
  onViewStudent: (student: Student) => { },

});

export const useRapidAccesContext = () => useContext(RapidAccesContext);

export const useRapidAccesActionsContext = () => useContext(RapidAccesActionsContext);

type RapidAccesContextProviderProps = {
  children: ReactNode;
};

const RapidAccesContextProvider: React.FC<RapidAccesContextProviderProps> = ({
  children,
}) => {
  const infoViewActionsContext = useInfoViewActionsContext();

  const [{ apiData: studentsPage, loading }, { setQueryParams, fetch }] =
    useGetSearchCurrentYearStudents();

  const [page, setPage] = useState<number>(0);
  const [search, setSearchQuery] = useState('');

  /**
   * add Interview Action variables
   * 
   */
  const [openAddInterviewAction, setAddInterviewAction] = useState(false);
  const [openViewStuentAction, setOpenViewStuentAction] = useState(false);
  const [selectdStudent, setSelectdStudent] = useState<Student>(undefined);



  const onChangeOpenAddInterviewAction = (state: boolean) => {
    setAddInterviewAction(state);
  };

  const onChangePage = (page: number) => {
    setPage(page);
  };

  const onViewStudent = (student: Student) => {
      setOpenViewStuentAction(true);
      setSelectdStudent(student);
  }
  useEffect(() => {
    reloadData();
  }, [search, page]);



  const onSearchList = (e: any) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };

  const reloadData = () => {
    const realPage = page - 1;
    setQueryParams({
      search,
      page: realPage,
    });
  };

  return (
    <RapidAccesContext.Provider
      value={{
        studentsPage: studentsPage,
        loading: loading,
        page: page,
        search: search,
        openAddInterviewAction: openAddInterviewAction,
        openViewStuentAction: openViewStuentAction,
        selectdStudent: selectdStudent
      }}
    >
      <RapidAccesActionsContext.Provider
        value={{
          setSelectdStudent: setSelectdStudent,
          onSearch: onSearchList,
          onChangePage: onChangePage,
          onChangeOpenAddInterviewAction: onChangeOpenAddInterviewAction,
          onChangeOpenViewStudentAction: setOpenViewStuentAction,
          onViewStudent: onViewStudent
        }}
      >
        {children}
      </RapidAccesActionsContext.Provider>
    </RapidAccesContext.Provider>
  );
};

export default RapidAccesContextProvider;

