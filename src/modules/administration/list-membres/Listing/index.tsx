'use client';
import React, { useState } from 'react';
import AppsHeader from '@crema/components/AppsContainer/AppsHeader';
import AppsContent from '@crema/components/AppsContainer/AppsContent';
import { Button, Col, Input, Modal, Row, Select } from 'antd';
import {
  StyledListFooterPagination,
  StyledListHeader,
  StyledListHeaderInputView,
  StyledListHeaderLeft,
  StyledListHeaderPagination,
  StyledListHeaderRight,
} from '@core/styles/list/index.styled';
import { StyledContactSidebarHeader } from './index.styled';
import IntlMessages from '@crema/helpers/IntlMessages';
import { Student, GetStudentDto } from '@core/types/models/student/StudentTypes';
import { useGetSearchStudents } from '@core/services/StudentService';
import { useUserActionsContext, useUserContext } from '../ListMembresContextProvider';
import ListMembresTable from './ListingTable/index';
//import { StyledLinkBtn } from '../Confirmation/index.styled';


const MembresList = () => {
  const { userPage, page } = useUserContext();
  const { onChangePage, onSearch } = useUserActionsContext();

  return (
    <>

      <AppsHeader key={'wrap'}>

        <StyledListHeader>
          <StyledListHeaderLeft>
            <StyledListHeaderInputView>
              <Input
                id='user-name'
                placeholder='ابحث'
                type='search'
                onChange={onSearch}
              />
            </StyledListHeaderInputView>

          </StyledListHeaderLeft>
          
          <StyledListHeaderRight>
            <StyledListHeaderPagination
              pageSize={10}
              count={userPage.totalElements}
              page={page}
              onChange={onChangePage}
            />
          </StyledListHeaderRight>
        </StyledListHeader>
      </AppsHeader>

      <AppsContent
        style={{
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        <ListMembresTable />
      </AppsContent>

      <StyledListFooterPagination
        pageSize={10}
        count={userPage?.totalElements}
        page={page}
        onChange={onChangePage}
      />
    </>
  );
};

export default MembresList;
