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
import EstablishmentEmployeesTable from './ListingTable';
import { useEstablishmentSettingsActionsContext, useEstablishmentSettingsContext } from '../../EstablishmentSettingsContextProvider';
import { PlusOutlined } from '@ant-design/icons';
import { StyledContactSidebarHeader } from './index.styled';



const EstablishmentEmployeesList = () => {
  const { EstablishmentSettingsPage, page } = useEstablishmentSettingsContext();
  const { onChangePage, onSearch, onCreate } = useEstablishmentSettingsActionsContext();
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
                    موظف جديد
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
              count={EstablishmentSettingsPage.totalElements}
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
        <EstablishmentEmployeesTable />
      </AppsContent>

      <StyledListFooterPagination
        pageSize={10}
        count={EstablishmentSettingsPage?.totalElements}
        page={page}
        onChange={onChangePage}
      />
    </>
  );
};

export default EstablishmentEmployeesList;
