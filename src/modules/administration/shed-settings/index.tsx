'use client';
import React from 'react';
import AppsContainer from '@crema/components/AppsContainer';
import AppPageMeta from '@crema/components/AppPageMeta';
import WeekProgramContextProvider from './ShedSettingContextProvider';
import ShedSettingList from './Listing/index';
import Models from './Models/index';
import ShedSettingContextProvider from './ShedSettingContextProvider';


const ShedSettingsList = ({ }) => {

  return (
    <>
      <ShedSettingContextProvider>
        <AppsContainer
          title="قــائمة إعدادات التوجيه"
          fullView
        >
          <AppPageMeta title='إعدادات التوجيه' />
          <ShedSettingList />
          <Models />
        </AppsContainer>
      </ShedSettingContextProvider>
    </>
  );
};

export default ShedSettingsList;
