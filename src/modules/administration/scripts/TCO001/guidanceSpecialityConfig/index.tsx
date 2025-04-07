'use client';
import React from 'react';
import TCE002ConditionList from './Listing/index';
import Models from './Models/index';
import TCO002GuidanceSpecialityConfigsContextProvider from './TCO002GuidanceSpecialityConfigContextProvider';

const TCO002GuidanceSpecialityConfigsContent = () => (
  <TCO002GuidanceSpecialityConfigsContextProvider >
    <TCE002ConditionList />
    <Models />
  </TCO002GuidanceSpecialityConfigsContextProvider>
);


export default TCO002GuidanceSpecialityConfigsContent;
