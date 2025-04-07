'use client';
import React from 'react';
import TCE002ConditionList from './Listing/index';
import Models from './Models/index';
import TCO002LevelConditionsContextProvider from './TCO002LevelConditionsContextProvider';

const TCO002LevelConditionsContent = () => (
  <TCO002LevelConditionsContextProvider >
      <TCE002ConditionList />
      <Models />
  </TCO002LevelConditionsContextProvider>
);


export default TCO002LevelConditionsContent;
