'use client';
import React, { useEffect, useState } from 'react';

import AppsHeader from '@crema/components/AppsContainer/AppsHeader';
import AppsContent from '@crema/components/AppsContainer/AppsContent';
import { Input, Col, Row, Button } from 'antd';
import {
  StyledListFooterPagination,
  StyledListHeader,
  StyledListHeaderInputView,
  StyledListHeaderLeft,
  StyledListHeaderPagination,
  StyledListHeaderRight,
} from '@core/styles/list/index.styled';
import { PlusOutlined } from '@ant-design/icons';
import { useTCE002ConditionActionsContext, useTCE002ConditionContext } from '../TCE002ConditionContextProvider';
import TCE002ConditionTable from './ListingTable/index';
import { StyledContactSidebarHeader } from './index.styled';


const TCE002ConditionList = () => {
  const { TCE002ConditionPage, page } = useTCE002ConditionContext();
  const { onChangePage, onSearch, onCreate } = useTCE002ConditionActionsContext();

  return (
    <>

      <AppsHeader key={'wrap'}>

        <StyledListHeader>
          <StyledListHeaderLeft>
            <StyledContactSidebarHeader>
              <Row gutter={6}>
                <Col span={24}>
                  <Button
                    type='primary'
                    ghost
                    onClick={() => {
                      onCreate();
                    }}
                    icon={<PlusOutlined style={{ marginRight: 8 }} />}
                  >
                    شرط التشخيص
                  </Button>
                </Col>
              </Row>
            </StyledContactSidebarHeader>
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
              count={TCE002ConditionPage.totalElements}
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
        <TCE002ConditionTable />
      </AppsContent>

      <StyledListFooterPagination
        pageSize={10}
        count={TCE002ConditionPage?.totalElements}
        page={page}
        onChange={onChangePage}
      />
    </>
  );
};

export default TCE002ConditionList;
