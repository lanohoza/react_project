'use client';
import React from 'react';
import TCE002ConditionList from './Listing/index';
import Models from './Models/index';
import TCO002SubjectConditionsContextProvider from './TCO002SubjectConditionsContextProvider';

const TCO002SubjectConditionsContent = () => (
  <TCO002SubjectConditionsContextProvider >
      <TCE002ConditionList />
      <Models />
  </TCO002SubjectConditionsContextProvider>
);


export default TCO002SubjectConditionsContent;
