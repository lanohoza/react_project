'use client';
import React from 'react';
import TCE002ConditionList from './Listing/index';
import Models from './Models/index';
import TCO002SpecialityConditionsContextProvider from './TCO002SpecialityConditionsContextProvider';

const TCO002SpecialityConditionsContent = () => (
  <TCO002SpecialityConditionsContextProvider >
      <TCE002ConditionList />
      <Models />
  </TCO002SpecialityConditionsContextProvider>
);


export default TCO002SpecialityConditionsContent;
