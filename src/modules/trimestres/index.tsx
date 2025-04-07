'use client';
import React from 'react';
import AppsContainer from '@crema/components/AppsContainer';
import AppPageMeta from '@crema/components/AppPageMeta';
import TrimestreList from './Listing';
import TrimestreContextProvider from './TrimestreContextProvider';
import SideBar from './Sidebar';
import Models from './Models';

//import { StyledLinkBtn } from '../Confirmation/index.styled';


const TrimestresList = ({ }) => {

  return (
    <>
      <TrimestreContextProvider>
        <AppsContainer
          title="التقرير الفصلية"
          sidebarContent={<SideBar />}
        >
          <AppPageMeta title="التقرير الفصلية" />
          <TrimestreList />
          <Models />
        </AppsContainer>
      </TrimestreContextProvider>
    </>
  );
};

export default TrimestresList;
