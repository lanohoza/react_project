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
import AddEditNote from '../AddEditNote';
import NotesTable from './ListingTable';
import { Note, GetNoteDto } from '@core/types/models/note/NoteTypes';
import { useGetSearchNotes } from '@core/services/NoteService';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { useNoteContext, useNoteActionsContext } from '../NoteContextProvider';
//import { StyledLinkBtn } from '../Confirmation/index.styled';


const NoteList = () => {

  const { notesPage ,page } = useNoteContext();
  const { onChangePage,onSearch } = useNoteActionsContext();

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
              count={notesPage?.totalElements}
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
        <NotesTable  />
      </AppsContent>

      <StyledListFooterPagination
        pageSize={10}
        count={notesPage?.totalElements}
        page={page}
        onChange={onChangePage}
      />
    </>
  );
};

export default NoteList;
