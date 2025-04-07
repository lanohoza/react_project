import React from 'react';
import ItemActions from './ItemActions';
import { StyledListId, StyledListTable } from '@core/styles/list/index.styled';

import type { ColumnsType } from 'antd/es/table';
import { RecentTCItemType } from '@core/types/models/technicalCards/technicalCardsTypes';
import { Classe, GetClasseDto } from '@core/types/models/classe/ClasseTypes';
import { useActivityContext } from '../../activityContextProvider';




const ClassesTable = () => {
  const { activitiesPage, loading } = useActivityContext();

  const columns: ColumnsType<RecentTCItemType> = [
    {
      title: 'النشاط المنجز ',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: 'تاريخ الانجاز',
      dataIndex: 'createdDate',
      key: 'createdDate',
    }/*,
    {
      title: 'العمليات',
      dataIndex: 'id',
      key: 'id',
      className: 'List-table-action',
      fixed: 'right',
      render: (_,record) => (<ItemActions item={record}  />),
    },*/
  ];
  return (
    <StyledListTable
      hoverColor
      data={activitiesPage.content}
      loading={loading}
      columns={columns}
      scroll={{ x: 'auto' }}
    />
  );
};

export default ClassesTable;
