'use client';
import React from 'react';
import AppPageMeta from '@crema/components/AppPageMeta/index';
import TCE002ConditionList from './Listing/index';
import AppsContainer from '@crema/components/AppsContainer/index';
import Models from './Models/index';
import TCO002StudentConditionsContextProvider from './TCO002StudentConditionsContextProvider';

const TCO002StudentConditionsContent = () => (
  <TCO002StudentConditionsContextProvider>
      <TCE002ConditionList />
      <Models />
  </TCO002StudentConditionsContextProvider>
);


export default TCO002StudentConditionsContent;
