import React from 'react';
import ItemActions from './ItemActions';
import { StyledListId, StyledListTable } from '@core/styles/list/index.styled';

import type { ColumnsType } from 'antd/es/table';
import { RecentTCItemType } from '@core/types/models/technicalCards/technicalCardsTypes';
import { useTrimestreContext } from '../../TrimestreContextProvider';




const TrimestresTable = () => {
  const { trimesters, loading } = useTrimestreContext();

  const columns: ColumnsType<RecentTCItemType> = [

    {
      title: 'الفصل',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'تاريخ البداية',
      dataIndex: 'start',
      key: 'start',
    },
    {
      title: 'تاريخ النهاية',
      dataIndex: 'end',
      key: 'end',
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
      data={trimesters}
      loading={loading}
      columns={columns}
      scroll={{ x: 'auto' }}
    />
  );
};

export default TrimestresTable;
