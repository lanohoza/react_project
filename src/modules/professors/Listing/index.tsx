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
import AddEditProfessor from '../AddEditProfessor';
import ProfessorsTable from './ListingTable';
import { Professor } from '@core/types/models/professor/ProfessorTypes';
import { useGetSearchProfessors } from '@core/services/ProfessorService';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { useProfessorContext, useProfessorActionsContext } from '../ProfessorContextProvider';
//import { StyledLinkBtn } from '../Confirmation/index.styled';


const ProfessorList = () => {

  const { ProfessorsPage ,page } = useProfessorContext();
  const { onChangePage,onSearch } = useProfessorActionsContext();

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
              count={ProfessorsPage?.totalElements}
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
        <ProfessorsTable  />
      </AppsContent>

      <StyledListFooterPagination
        pageSize={10}
        count={ProfessorsPage?.totalElements}
        page={page}
        onChange={onChangePage}
      />
    </>
  );
};

export default ProfessorList;
