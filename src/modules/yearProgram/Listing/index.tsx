'use client';
import React, { useEffect, useState } from 'react';
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
//import { StyledLinkBtn } from '../Confirmation/index.styled';
import { useYearProgramActionsContext, useYearProgramContext } from '../YearProgramContextProvider';
import TaskListTable from './ListingTable';


const YearProgramList = () => {
  const {taskPage,page} = useYearProgramContext();
  const {onChangePage,onSearch} = useYearProgramActionsContext();

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
              count={taskPage?.totalElements}
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
        <TaskListTable/>
      </AppsContent>

      <StyledListFooterPagination
        pageSize={10}
        count={taskPage?.totalElements}
        page={page}
        onChange={onChangePage}
      />
    </>
  );
};

export default YearProgramList;
