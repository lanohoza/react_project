'use client';
import React from 'react';
import AppsContainer from '@crema/components/AppsContainer';
import AppPageMeta from '@crema/components/AppPageMeta';
import TcTaskList from './Listing';
import TcTaskContextProvider from './TechnicalCardContextProvider';
import Models from './Models';
import SideBar from './Sidebar';

//import { StyledLinkBtn } from '../Confirmation/index.styled';


const TcTasksList = ({ }) => {

  return (
    <>
      <TcTaskContextProvider>
        <AppsContainer
        
          title="قــائمة البطافات التقنية"
          sidebarContent={<SideBar /> }
        >
          <AppPageMeta title='البطافات التقنية' />
          <TcTaskList />
          <Models />
        </AppsContainer>
      </TcTaskContextProvider>
    </>
  );
};

export default TcTasksList;
