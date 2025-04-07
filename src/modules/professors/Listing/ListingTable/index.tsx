import React from 'react';
import ItemActions from './ItemActions';
import { StyledListId, StyledListTable } from '@core/styles/list/index.styled';

import type { ColumnsType } from 'antd/es/table';
import { RecentTCItemType } from '@core/types/models/technicalCards/technicalCardsTypes';
import { Professor } from '@core/types/models/professor/ProfessorTypes';
import { useProfessorContext, useProfessorActionsContext } from '../../ProfessorContextProvider';




const ProfessorsTable = () => {
  const { ProfessorsPage,loading  } = useProfessorContext();

  const columns: ColumnsType<RecentTCItemType> = [
    {
      title: 'اللقب',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'الاسم',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'المادة',
      dataIndex: 'subjectTitle',
      key: 'subjectTitle',
    },
    {
      title: 'رقم الهاتف',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
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
      data={ProfessorsPage.content}
      loading={loading}
      columns={columns}
      scroll={{ x: 'auto' }}
    />
  );
};

export default ProfessorsTable;
