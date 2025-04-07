'use client';
import React, { useEffect } from 'react';
import AppsContainer from '@crema/components/AppsContainer';
import AppInfoView from '@crema/components/AppInfoView';
import AppPageMeta from '@crema/components/AppPageMeta';
import AddEditStudent from './AddEditStudent';
import StudentList from './Listing';
import StudenteContextProvider from './StudentContextProvider';
import SideBar from './Sidebar';
import Models from './Models';
import { useSearchParams } from 'next/navigation';

//import { StyledLinkBtn } from '../Confirmation/index.styled';


const StudentesList = ({ }) => {

  return (
    <>
      <StudenteContextProvider>
        <AppsContainer
          title="قائمة التلاميذ"
          sidebarContent={<SideBar /> }
        >
          <AppPageMeta title='تسير التلاميذ' />
          <StudentList />
          <Models />
        </AppsContainer>
      </StudenteContextProvider>
    </>
  );
};

export default StudentesList;
