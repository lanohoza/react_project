import React from 'react';
import { StyledListId, StyledListTable } from '@core/styles/list/index.styled';

import type { ColumnsType } from 'antd/es/table';
import TaskActions from './TaskActions';

type Props = {
  listData: ScolarYearTask[];
  loading: boolean;
  onDelete: (id: number) => void;
};

const TechnicalCardTable = ({ listData = [], loading, onDelete }: Props) => {
  const statusMapping = {
    finish: 'منجز',
    todo: 'للتنفيذ',
    in_progress: 'قيد التنفيذ',
    en_pause: 'متوقف',
    canceled: 'ملغي',
    not_completed: 'غير مكتمل',
    pending: 'معلق',
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo': {
        return '#E2A72E';
      }
      case 'finish': {
        return '#43C888';
      }
      case 'in_progress': {
        return '#4E9AE2';
      }
      case 'en_pause': {
        return '#E2D84E';
      }
      case 'canceled': {
        return '#F84E4E';
      }
      case 'not_completed': {
        return '#D8A8E2';
      }
      case 'pending': {
        return '#E2A72E';
      }
      default: {
        return '#F84E4E';
      }
    }
  };

  const columns: ColumnsType<ScolarYearTask> = [
    {
      title: 'عنوان النشاط',
      dataIndex: ['idTask', 'title'],
      key: 'idTask.title',
    },
    {
      title: 'تاريخ البداية النشاط',
      dataIndex: 'start',
      key: 'start',
    },
    {
      title: 'تاريخ النهاية النشاط',
      dataIndex: 'end',
      key: 'end',
    },
    {
      title: 'الوضعية',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span
          className='badge'
          style={{
            color: getStatusColor(status),
            backgroundColor: getStatusColor(status) + '44',
          }}
        >
          {statusMapping[status]}
        </span>
      ),
    },
    {
      title: 'العمليات',
      key: 'actions',
      className: 'List-table-action',
      fixed: 'right',
      render: (_, record) => <TaskActions task={record} onDelete={onDelete} />,
    },
  ];

  return (
    <StyledListTable
      hoverColor
      data={listData}
      loading={loading}
      columns={columns}
      scroll={{ x: 'auto' }}
    />
  );
};

export default TechnicalCardTable;
