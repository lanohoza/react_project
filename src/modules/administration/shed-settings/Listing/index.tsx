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
import ShedSettingTable from './ListingTable';
import { useShedSettingActionsContext, useShedSettingContext } from '../ShedSettingContextProvider';
import { StyledContactSidebarHeader } from './index.styled';


const ShedSettingList = () => {
  const { shedSettingPage, page } = useShedSettingContext();
  const { onChangePage, onSearch, onCreate } = useShedSettingActionsContext();

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
                    إعدادت التوجيه
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
              count={shedSettingPage.totalElements}
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
        <ShedSettingTable />
      </AppsContent>

      <StyledListFooterPagination
        pageSize={10}
        count={shedSettingPage?.totalElements}
        page={page}
        onChange={onChangePage}
      />
    </>
  );
};

export default ShedSettingList;
