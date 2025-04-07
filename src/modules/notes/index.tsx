'use client';
import React from 'react';
import AppsContainer from '@crema/components/AppsContainer';
import AppPageMeta from '@crema/components/AppPageMeta';
import NoteList from './Listing';
import NoteeContextProvider from './NoteContextProvider';
import SideBar from './Sidebar';
import Models from './Models';



const NoteesList = ({ }) => {

  return (
    <>
      <NoteeContextProvider>
        <AppsContainer
          title="تسير الننائج "
          sidebarContent={<SideBar /> }
        >
          <AppPageMeta title='تسير ننائج التلاميذ' />
          <NoteList />
          <Models />
        </AppsContainer>
      </NoteeContextProvider>
    </>
  );
};

export default NoteesList;
