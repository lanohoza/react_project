'use client';
import React from 'react';
import AppsContainer from '@crema/components/AppsContainer';
import AppPageMeta from '@crema/components/AppPageMeta';
import DesireList from './Listing';
import DesireContextProvider from './DesireContextProvider';
import SideBar from './Sidebar';
import Models from './Models';



const DesireesList = ({ }) => {

  return (
    <>
      <DesireContextProvider>
        <AppsContainer
          title=" رغبات التلاميذ "
          fullView
        >
          <AppPageMeta title='تسير رغبات التلاميذ' />
          <DesireList />
          <Models />
        </AppsContainer>
      </DesireContextProvider>
    </>
  );
};

export default DesireesList;
