'use client';
import React from 'react';
import AppPageMeta from '@crema/components/AppPageMeta/index';
import TCE002ConditionList from './Listing/index';
import AppsContainer from '@crema/components/AppsContainer/index';
import Models from './Models/index';
import TCE002ConditionContextProvider from './TCE002ConditionContextProvider';

const TCE002ConditionListContent = () => (
  <TCE002ConditionContextProvider>
    <AppsContainer title="" fullView>
      <AppPageMeta title="إعدادات شروط التشخيص الخاصة ب TCE002" />
      <TCE002ConditionList />
      <Models />
    </AppsContainer>
  </TCE002ConditionContextProvider>
);


export default TCE002ConditionListContent;
