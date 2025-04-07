'use client';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import AppsContainer from '@crema/components/AppsContainer';
import { useIntl } from 'react-intl';
import AppsHeader from '@crema/components/AppsContainer/AppsHeader';
import AppsContent from '@crema/components/AppsContainer/AppsContent';
import AppInfoView from '@crema/components/AppInfoView';
import { Button, Col, Input, Modal, Row, Select } from 'antd';
import AppPageMeta from '@crema/components/AppPageMeta';
import {
  StyledListHeader,
  StyledListHeaderInputView,
  StyledListHeaderLeft,
  StyledListHeaderPagination,
  StyledListHeaderRight,
} from '@core/styles/list/index.styled';
import { StyledContactSidebarHeader } from './index.styled';
import { PlusOutlined } from '@ant-design/icons';
import IntlMessages from '@crema/helpers/IntlMessages';
import InterviewsTable from './ListingTable';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { useInterviewActionsContext, useInterviewContext } from '../InterviewsContextProvider';
import { Year } from '@core/types/models/year/YearTypes';
import { InterviewStatus, InterviewType } from '@core/types/models/interview/InterviewTypes';
import { environment } from '../../../envirenement/environnement';
import { useSearchParams } from 'next/navigation';

const InterviewTableList = () => {
  const { interviewsPage, years, page, loading } = useInterviewContext();
  const { onSearch, onCreate, setSelectedIdYear,setChangeStatus, setChangeType, onChangePage } = useInterviewActionsContext();
  const searchParams = useSearchParams();

  const openadCreat = searchParams.get('os');
  useEffect(() => {
    if (openadCreat)
      onCreate();
  }, [])
  const Option = Select.Option;
  const onPrintReportInterviews = () => {
    const url = `${environment?.BASE_PATH ?? ''}/pdf/reports/interviews`;
    window.open(url, '_blank');
  };

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
            <div style={{ margin: " 0 5px ", display: "flex", alignItems: "center" }}>
              <div style={{  margin: " 0 5px",fontSize:14 }}>
                الموسم الدراسي:
              </div>
              <Select
                showSearch
                style={{ maxWidth: "150px" }}

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
            <div style={{ margin: " 0 5px ", display: "flex", alignItems: "center" }}>
              <div style={{ margin: " 0 5px",fontSize:14 }}>
                النوع :
              </div>
              <Select
                style={{ width: "100px" }}
                showSearch
                placeholder='النوع'
                onChange={(type) => setChangeType(type)}
              >
                <Option selected value="">الكل </Option>
                <Option  value={InterviewType.single}>فردي </Option>
                <Option value={InterviewType.group}>جماعي </Option>
              </Select>

            </div>
            <div style={{ margin: " 0 5px ", display: "flex", alignItems: "center" }}>
              <div style={{  margin: " 0 5px",fontSize:14  }}>
                الوضعية :
              </div>
              <Select
                style={{ width: "100px" }}
                showSearch
                placeholder='الوضعية'
                onChange={(type) => setChangeStatus(type)}
              >
                <Option selected value="">الكل </Option>
                <Option  value={InterviewStatus.todo}>للتنفيذ </Option>
                <Option value={InterviewStatus.in_progress}>قيد التنفيذ </Option>
                <Option value={InterviewStatus.done}>منجز </Option>
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
              مقابلة جديدة 
            </Button>
            <Button
              style={{ margin: "0 3px" }}
              onClick={() => { onPrintReportInterviews() }}
              type='primary'
            >
              طباعة السجل 
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
          count={interviewsPage?.totalElements}
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
        <InterviewsTable />

      </AppsContent>
    </>
  );
};

export default InterviewTableList;
