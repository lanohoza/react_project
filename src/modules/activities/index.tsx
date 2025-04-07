'use client';
import React from 'react';
import AppsContainer from '@crema/components/AppsContainer';
import AppPageMeta from '@crema/components/AppPageMeta';
import ActivitiesList from './Listing';
import SideBar from './Sidebar';
import Models from './Models';
import ActivityContextProvider from './activityContextProvider';

//import { StyledLinkBtn } from '../Confirmation/index.styled';


const ClassesList = ({ }) => {

  return (
    <>
      <ActivityContextProvider>
        <AppsContainer
          title="سجل النشاطات اليومية  "
          sidebarContent={<SideBar /> }
        >
          <AppPageMeta title='سجل النشاطات اليومية ' />
          <ActivitiesList />
          <Models />
        </AppsContainer>
      </ActivityContextProvider>
    </>
  );
};

export default ClassesList;
