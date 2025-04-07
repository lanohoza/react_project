'use client';
import React from 'react';
import AppsContainer from '@crema/components/AppsContainer';
import AppInfoView from '@crema/components/AppInfoView';
import AppPageMeta from '@crema/components/AppPageMeta';
import AddEditClass from './AddEditClass';
import ClassList from './Listing';
import ClasseContextProvider, { useClasseContext } from './ClassContextProvider';
import SideBar from './Sidebar';
import Models from './Models';

//import { StyledLinkBtn } from '../Confirmation/index.styled';


const ClassesList = ({ }) => {

  return (
    <>
      <ClasseContextProvider>
        <AppsContainer
          title="قائمة الاقسام"
          sidebarContent={<SideBar /> }
        >
          <AppPageMeta title='تسير الاقسام' />
          <ClassList />
          <Models />
        </AppsContainer>
      </ClasseContextProvider>
    </>
  );
};

export default ClassesList;
