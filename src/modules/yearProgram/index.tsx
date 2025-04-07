'use client';
import React from 'react';
import AppsContainer from '@crema/components/AppsContainer';
import AppInfoView from '@crema/components/AppInfoView';
import AppPageMeta from '@crema/components/AppPageMeta';
import Models from './Models';
import SideBar from './Sidebar';
import YearProgramContextProvider from './YearProgramContextProvider';
import YearProgramList from './Listing';

//import { StyledLinkBtn } from '../Confirmation/index.styled';


const YearProgram = ({ }) => {

  return (
    <>
      <YearProgramContextProvider>
        <AppsContainer
          title="البرنامج السنوي"
          sidebarContent={<SideBar />}
        >
          <AppPageMeta title='البرنامج السنوي ' />
           <YearProgramList />
           <Models />
        </AppsContainer>
      </YearProgramContextProvider>
    </>
  );
};

export default YearProgram;
