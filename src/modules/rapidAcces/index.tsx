'use client';
import React, { useEffect } from 'react';
import AppsContainer from '@crema/components/AppsContainer';
import AppInfoView from '@crema/components/AppInfoView';
import AppPageMeta from '@crema/components/AppPageMeta';
import StudentList from './Listing';
import StudenteContextProvider from './RapidAccesContextProvider';
import Models from './Models';
import { useSearchParams } from 'next/navigation';

//import { StyledLinkBtn } from '../Confirmation/index.styled';


const RapidAcces = ({ }) => {

  return (
    <>
      <StudenteContextProvider>
        <AppsContainer
          title="الوصول السريع"
          fullView
        >
          <AppPageMeta title='الوصول السريع' />
          <StudentList />
          <Models />
        </AppsContainer>
      </StudenteContextProvider>
    </>
  );
};

export default RapidAcces;
