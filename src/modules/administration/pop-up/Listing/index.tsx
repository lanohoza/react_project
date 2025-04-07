'use client';
import React, { useEffect, useState } from 'react';

import AppsHeader from '@crema/components/AppsContainer/AppsHeader';
import AppsContent from '@crema/components/AppsContainer/AppsContent';
import {Input} from 'antd';
import {
  StyledListFooterPagination,
  StyledListHeader,
  StyledListHeaderInputView,
  StyledListHeaderLeft,
  StyledListHeaderPagination,
  StyledListHeaderRight,
} from '@core/styles/list/index.styled';
import { Page } from '@core/types/models/core/models';

//import { StyledLinkBtn } from '../Confirmation/index.styled';
import TcTasksTable from './ListingTable';
import { usePopUpActionsContext, usePopUpContext } from '../PopUpContextProvider';


const WeekProgramList = () => {
  const {popUpPage,page} = usePopUpContext();
  const {onChangePage,onSearch} = usePopUpActionsContext();

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
              count={popUpPage.totalElements}
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
        count={popUpPage?.totalElements}
        page={page}
        onChange={onChangePage}
      />
    </>
  );
};

export default WeekProgramList;
