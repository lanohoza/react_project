'use client';
import React from 'react';
import AppsContainer from '@crema/components/AppsContainer';
import AppPageMeta from '@crema/components/AppPageMeta';
import ActivitiesList from './Listing';
import SideBar from './Sidebar';
import Models from './Models';
import DonneTaskContextProvider from './DonneTaskContextProvider';

//import { StyledLinkBtn } from '../Confirmation/index.styled';


const DonneTaskList = ({ }) => {

  return (
    <>
      <DonneTaskContextProvider>
        <AppsContainer
          title="تقارير الانشطة المنجزة "
          sidebarContent={<SideBar />}
        >
          <AppPageMeta title=' تقارير الانشطة المنجزة' />
          <ActivitiesList />
        </AppsContainer>
      </DonneTaskContextProvider>
    </>
  );
};

export default DonneTaskList;
