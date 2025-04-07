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
import { PlusOutlined } from '@ant-design/icons';
import IntlMessages from '@crema/helpers/IntlMessages';
import GuidanceGroupsTable from './ListingTable';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { useGuidanceGroupActionsContext, useGuidanceGroupContext } from '../GuidanceGroupsContextProvider';
import { Year } from '@core/types/models/year/YearTypes';
import { Difficulty } from '@core/types/models/difficulty/DifficultyTypes';
//import { StyledLinkBtn } from '../Confirmation/index.styled';


const GuidanceGroupTableList = () => {

  const { guidanceGroupsPage, years, page, difficulties } = useGuidanceGroupContext();
  const { onChangePage, onSearch, onCreate, setSelectedIdYear } = useGuidanceGroupActionsContext();
  const Option = Select.Option;
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
            <div style={{ margin: " 0 10px ", display: "flex", alignItems: "center" }}>
              <div style={{ margin: " 0 10px" }}>
                الموسم الدراسي:
              </div>
              <Select
                showSearch
                placeholder='الموسم الدراسي'
                onChange={(id) => setSelectedIdYear(id)}
              >
                {years?.map((year: Year) => {
                  return (
                    <Option value={year.id} key={year.id}>
                      {year.title}
                    </Option>
                  );
                })}
              </Select>

            </div>
          </StyledListHeaderLeft>
          <StyledListHeaderRight>
            <Button
              ghost
              onClick={() => { onCreate() }}
              type='primary'
              icon={<PlusOutlined style={{ marginRight: 8 }} />}
            >
              مجموعة ارشادية جديد
            </Button>
          </StyledListHeaderRight>
        </StyledListHeader>
      </AppsHeader>
      <div style={{
        display: "flex",
        justifyContent: "end",
        padding: " 0px 20px"
      }}>
        <StyledListHeaderPagination
          pageSize={10}
          count={guidanceGroupsPage?.totalElements}
          page={page}
          onChange={onChangePage}
        />
      </div>
      <AppsContent
        style={{
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        <GuidanceGroupsTable />
      </AppsContent>
    </>
  );
};

export default GuidanceGroupTableList;


