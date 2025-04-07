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
import { StyledContactSidebarHeader } from './index.styled';
import { useTCO002LevelConditionActionsContext, useTCO002LevelConditionContext } from '../TCO002LevelConditionsContextProvider';
import TCO002LevelConditionTable from './ListingTable/index';


const TCE002ConditionList = () => {
  const { TCO001Page, page } = useTCO002LevelConditionContext();
  const { onChangePage, onSearch, onCreate } = useTCO002LevelConditionActionsContext();

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
              count={TCO001Page.totalElements}
              page={page}
              onChange={onChangePage}
            />
          </StyledListHeaderRight>
        </StyledListHeader>
      </AppsHeader>

      <TCO002LevelConditionTable />


      <StyledListFooterPagination
        pageSize={10}
        count={TCO001Page?.totalElements}
        page={page}
        onChange={onChangePage}
      />
    </>
  );
};

export default TCE002ConditionList;
