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
import { StyledContactSidebarHeader } from './index.styled';
import IntlMessages from '@crema/helpers/IntlMessages';
import { Student, GetStudentDto } from '@core/types/models/student/StudentTypes';
import { useGetSearchStudents } from '@core/services/StudentService';
import { useTechnicalCardActionsContext, useTechnicalCardContext } from '../TechnicalCardContextProvider';
//import { StyledLinkBtn } from '../Confirmation/index.styled';
import TcTasksTable from './ListingTable';


const TcTaskList = () => {
  const {technicalCardPage,page} = useTechnicalCardContext();
  const {onChangePage,onSearch} = useTechnicalCardActionsContext();

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
              count={technicalCardPage.totalElements}
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
        <TcTasksTable/>
      </AppsContent>

      <StyledListFooterPagination
        pageSize={10}
        count={technicalCardPage?.totalElements}
        page={page}
        onChange={onChangePage}
      />
    </>
  );
};

export default TcTaskList;
