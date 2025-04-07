'use client';
import React, { useEffect, useState } from 'react';
import AppsContainer from '@crema/components/AppsContainer';
import { useIntl } from 'react-intl';
import AppsHeader from '@crema/components/AppsContainer/AppsHeader';
import AppsContent from '@crema/components/AppsContainer/AppsContent';
import AppInfoView from '@crema/components/AppInfoView';
import { Button, Col, Input, Modal, Row, Select } from 'antd';
import AppPageMeta from '@crema/components/AppPageMeta';
import {
  StyledListFooterPagination,
  StyledListHeader,
  StyledListHeaderInputView,
  StyledListHeaderLeft,
  StyledListHeaderPagination,
  StyledListHeaderRight,
} from '@core/styles/list/index.styled';
import StudentsTable from './ListingTable';
import { useStudentContext, useStudentActionsContext } from '../StudentContextProvider';
import { useSearchParams } from 'next/navigation';
//import { StyledLinkBtn } from '../Confirmation/index.styled';


const StudentList = () => {

  const { studentsPage, page } = useStudentContext();
  const { onChangePage, onSearch, onCreate } = useStudentActionsContext();
  const searchParams = useSearchParams();
  const openadStudent = searchParams.get('os');
  useEffect(() => {
    if (openadStudent)
      onCreate();
  }, [])
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
              count={studentsPage?.totalElements}
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
        <StudentsTable />
      </AppsContent>

      <StyledListFooterPagination
        pageSize={10}
        count={studentsPage?.totalElements}
        page={page}
        onChange={onChangePage}
      />
    </>
  );
};

export default StudentList;
