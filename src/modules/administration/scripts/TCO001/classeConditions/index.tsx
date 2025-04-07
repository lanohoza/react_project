'use client';
import React from 'react';
import AppPageMeta from '@crema/components/AppPageMeta/index';
import TCE002ConditionList from './Listing/index';
import AppsContainer from '@crema/components/AppsContainer/index';
import Models from './Models/index';
import TCO002ClasseConditionsContextProvider from './TCO002ClasseConditionsContextProvider';

const TCO002ClasseConditionsContent = () => (
  <TCO002ClasseConditionsContextProvider >
      <TCE002ConditionList />
      <Models />
  </TCO002ClasseConditionsContextProvider>
);


export default TCO002ClasseConditionsContent;
