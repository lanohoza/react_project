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
import AddEditClass from '../AddEditClass';
import ClassesTable from './ListingTable';
import { Classe, GetClasseDto } from '@core/types/models/classe/ClasseTypes';
import { useGetSearchClasses } from '@core/services/ClasseService';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { useClasseContext, useClasseActionsContext } from '../ClassContextProvider';
//import { StyledLinkBtn } from '../Confirmation/index.styled';


const ClassList = () => {

  const { classesPage ,page } = useClasseContext();
  const { onChangePage,onSearch } = useClasseActionsContext();

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
              count={classesPage?.totalElements}
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
        <ClassesTable  />
      </AppsContent>

      <StyledListFooterPagination
        pageSize={10}
        count={classesPage?.totalElements}
        page={page}
        onChange={onChangePage}
      />
    </>
  );
};

export default ClassList;
