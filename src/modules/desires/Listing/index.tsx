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
import DesiresTable from './ListingTable';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { useDesireContext, useDesireActionsContext } from '../DesireContextProvider';
import { GetClasseDto } from '@core/types/models/classe/ClasseTypes';
import { Year } from '@core/types/models/year/YearTypes';
import { PlusOutlined } from '@ant-design/icons';
//import { StyledLinkBtn } from '../Confirmation/index.styled';


const DesireList = () => {

  const { desiresPage, page, classes, years, selectedIdClasse } = useDesireContext();
  const { onChangePage, onSearch, onSelectYear, onChangeClass, setOpenAddEditByClassModel } = useDesireActionsContext();

  const { Option } = Select;

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
              <div style={{ margin: " 0 5px", fontSize: 14, width: "160px" }}>
                الموسم الدراسي:
              </div>
              <Select
                style={{ width: '100%' }}
                showSearch
                placeholder='الموسم الدراسي'
                onChange={onSelectYear}
              >
                {years.map((year: Year) => {
                  return (
                    <Option value={year.id} key={year.id}>
                      {year.title}
                    </Option>
                  );
                })}
              </Select>

            </div>


            <div style={{ margin: " 0 5px ", display: "flex", alignItems: "center" }}>
              <div style={{ margin: " 0 5px", fontSize: 14, width: "100px", textAlign: "end" }}>
                القسم:
              </div>
              <Select style={{ width: "290px" }} onChange={onChangeClass}
                showSearch placeholder='القسم'>
                {classes.map((classe: GetClasseDto) => {
                  return (
                    <Option value={classe.id} key={classe.id}>
                      {classe.title}
                    </Option>
                  );
                })}
              </Select>
            </div>
          </StyledListHeaderLeft>
          <StyledListHeaderRight>
            {selectedIdClasse != -1 &&
              <Button
                ghost
                onClick={() => { setOpenAddEditByClassModel(true) }}
                type='primary'
                icon={<PlusOutlined style={{ marginRight: 8 }} />}
              >
                حجز الرغبات
              </Button>}

            <StyledListHeaderPagination
              pageSize={10}
              count={desiresPage?.totalElements}
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
        <DesiresTable />
      </AppsContent>

      <StyledListFooterPagination
        pageSize={10}
        count={desiresPage?.totalElements}
        page={page}
        onChange={onChangePage}
      />
    </>
  );
};

export default DesireList;
