import React from 'react';
import ItemActions from './ItemActions';
import { StyledListId, StyledListTable } from '@core/styles/list/index.styled';

import type { ColumnsType } from 'antd/es/table';
import { RecentTCItemType } from '@core/types/models/technicalCards/technicalCardsTypes';
import { Desire, GetDesireDto } from '@core/types/models/desire/DesireTypes';
import { useDesireContext, useDesireActionsContext } from '../../DesireContextProvider';
import { ReserveStatus,  } from '@core/types/models/student/StudentTypes';
import { Tag } from 'antd';




const DesiresTable = () => {
  const { desiresPage, loading } = useDesireContext();
  const currentPage = desiresPage.number; // Current page index (zero-based)
  const pageSize = desiresPage.size; // Number of items per page


  const columns: ColumnsType<any> = [
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
      data={desiresPage.content}
      loading={loading}
      columns={columns}
      scroll={{ x: 'auto' }}
    />
  );
};

export default DesiresTable;
