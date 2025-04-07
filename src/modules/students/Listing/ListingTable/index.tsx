import React from 'react';
import ItemActions from './ItemActions';
import { StyledListId, StyledListTable } from '@core/styles/list/index.styled';

import type { ColumnsType } from 'antd/es/table';
import { RecentTCItemType } from '@core/types/models/technicalCards/technicalCardsTypes';
import { Student, GetStudentDto } from '@core/types/models/student/StudentTypes';
import { useStudentContext, useStudentActionsContext } from '../../StudentContextProvider';




const StudentsTable = () => {
  const { studentsPage,loading  } = useStudentContext();
  const currentPage = studentsPage.number; // Current page index (zero-based)
  const pageSize = studentsPage.size; // Number of items per page

  const columns: ColumnsType<GetStudentDto> = [
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
      title: 'القسم',
      dataIndex: 'classeTitle',
      key: 'classeTitle',
    },
    {
      title: 'العمليات',
      dataIndex: 'id',
      key: 'id',
      className: 'List-table-action',
      fixed: 'right',
      render: (_,record) => (<ItemActions item={record}  />),
    },
  ];
  return (
    <StyledListTable
      hoverColor
      data={studentsPage.content}
      loading={loading}
      columns={columns}
      scroll={{ x: 'auto' }}
    />
  );
};

export default StudentsTable;
