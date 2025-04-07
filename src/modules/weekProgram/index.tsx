'use client';
import React from 'react';
import AppsContainer from '@crema/components/AppsContainer';
import AppPageMeta from '@crema/components/AppPageMeta';
import WeekProgramList from './Listing';
import WeekProgramContextProvider from './WeekProgramContextProvider';
import Models from './Models';
import SideBar from './Sidebar';


const WeekProgramsList = ({ }) => {

  return (
    <>
      <WeekProgramContextProvider>
        <AppsContainer
          title="قــائمة البرامج الأسبوعية"
          sidebarContent={<SideBar /> }
        >
          <AppPageMeta title='البرامج الأسبوعية' />
          <WeekProgramList />
          <Models />
        </AppsContainer>
      </WeekProgramContextProvider>
    </>
  );
};

export default WeekProgramsList;
