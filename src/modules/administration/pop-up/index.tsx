'use client';
import React from 'react';
import AppsContainer from '@crema/components/AppsContainer';
import AppPageMeta from '@crema/components/AppPageMeta';
import WeekProgramList from './Listing';
import WeekProgramContextProvider from './PopUpContextProvider';
import Models from './Models';
import SideBar from './Sidebar';


const PopUpsList = ({ }) => {

  return (
    <>
      <WeekProgramContextProvider>
        <AppsContainer
          title="قــائمة الإعلانات"
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

export default PopUpsList;
