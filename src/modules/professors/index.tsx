'use client';
import React from 'react';
import AppsContainer from '@crema/components/AppsContainer';
import AppInfoView from '@crema/components/AppInfoView';
import AppPageMeta from '@crema/components/AppPageMeta';
import AddEditProfessor from './AddEditProfessor';
import ProfessorList from './Listing';
import ProfessorContextProvider, { useProfessorContext } from './ProfessorContextProvider';
import SideBar from './Sidebar';
import Models from './Models';

//import { StyledLinkBtn } from '../Confirmation/index.styled';


const ProfessorsList = ({ }) => {

  return (
    <>
      <ProfessorContextProvider>
        <AppsContainer
          title="قائمة الاقسام"
          sidebarContent={<SideBar /> }
        >
          <AppPageMeta title='تسير الاقسام' />
          <ProfessorList />
          <Models />
        </AppsContainer>
      </ProfessorContextProvider>
    </>
  );
};

export default ProfessorsList;
