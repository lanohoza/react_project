'use client';
import React from 'react';
import TCE002ConditionList from './Listing/index';
import Models from './Models/index';
import TCO002EstablishmentConditionsContextProvider from './TCO002EstablishmentConditionsContextProvider';

const TCO002EstablishmentConditionsContent = () => (
  <TCO002EstablishmentConditionsContextProvider >
      <TCE002ConditionList />
      <Models />
  </TCO002EstablishmentConditionsContextProvider>
);


export default TCO002EstablishmentConditionsContent;
