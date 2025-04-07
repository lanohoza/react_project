'use client';
import React from 'react';
import AppsContainer from '@crema/components/AppsContainer';
import AppPageMeta from '@crema/components/AppPageMeta';
import MembresList from './Listing';
import ListMembresContextProvider from './ListMembresContextProvider';
import Models from './Models';
import SideBar from './Sidebar';


const UsersList = ({ }) => {

  return (
    <>
      <ListMembresContextProvider>
        <AppsContainer
          title="قــائمة المشتركين"
          fullView
          // sidebarContent={<SideBar /> }
        >
          <AppPageMeta title='المشتركين' />
          <MembresList />
          <Models />
        </AppsContainer>
      </ListMembresContextProvider>
    </>
  );
};

export default UsersList;
