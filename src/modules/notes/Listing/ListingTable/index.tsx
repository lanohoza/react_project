import React from 'react';
import ItemActions from './ItemActions';
import { StyledListId, StyledListTable } from '@core/styles/list/index.styled';

import type { ColumnsType } from 'antd/es/table';
import { RecentTCItemType } from '@core/types/models/technicalCards/technicalCardsTypes';
import { Note, GetNoteDto } from '@core/types/models/note/NoteTypes';
import { useNoteContext, useNoteActionsContext } from '../../NoteContextProvider';
import { ReserveStatus, StudentNoteDto } from '@core/types/models/student/StudentTypes';
import { Tag } from 'antd';




const NotesTable = () => {
  const { notesPage, loading } = useNoteContext();
  const currentPage = notesPage.number; // Current page index (zero-based)
  const pageSize = notesPage.size; // Number of items per page


  const columns: ColumnsType<StudentNoteDto> = [
    {
      title: 'الرقم',
      dataIndex: 'number',
      render: (_, __, index) => (
        <span>{currentPage * pageSize + index + 1}</span>
      ),
    },
    {
      title: 'الاسم',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'اللقب',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'تاريخ الميلاد',
      dataIndex: 'birthDate',
      key: 'birthDate',
    },
    {
      title: 'الحالة',
      dataIndex: 'reserveStatus',
      key: 'reserveStatus',
      render: (reserveStatus) => (
        <>
          <Tag color={reserveStatus === 'reserved' ? "green" : "red"} key={reserveStatus}>
            { ReserveStatus[reserveStatus] }
          </Tag>
        </>
      ),
    },

    {
      title: 'العمليات',
      dataIndex: 'id',
      key: 'id',
      className: 'List-table-action',
      fixed: 'right',
      render: (_, record) => (<ItemActions item={record} />),
    },
  ];
  return (
    <StyledListTable
      hoverColor
      data={notesPage.content}
      loading={loading}
      columns={columns}
      scroll={{ x: 'auto' }}
    />
  );
};

export default NotesTable;
