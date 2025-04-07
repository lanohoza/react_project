import React from 'react';
import ItemActions from './ItemActions';
import { StyledListTable } from '@core/styles/list/index.styled';

import type { ColumnsType } from 'antd/es/table';
import { TechnicalCard } from '@core/types/models/technicalCards/TechnicalCardTypes';
import { useYearProgramContext } from '../../YearProgramContextProvider';
import { getMonthName, getWeekName, monthsInArabic, weeks } from '@crema/hooks/dateHooks';


const TaskListTable = () => {
  const { taskPage, loading } = useYearProgramContext();

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
  const columns: ColumnsType<TechnicalCard> = [
    {
      title: 'الرمز ',
      dataIndex: 'code',
      key: 'code',
    }, {
      title: 'اسم المهمة',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'تاريخ الإنشاء',
      dataIndex: 'createDate',
      key: 'createDate',
    },
    {
      title: 'شهر التنفيذ',
      dataIndex: 'runMonth',
      key: 'runMonth',
      render: (runMonth, record) => (
        <span>
          {getMonthName(record.runMonth)}
        </span>
      ),
    },
    {
      title: 'أسبوع التنفيذ',
      dataIndex: 'runWeek',
      key: 'runWeek',
      render: (runMonth, record) => (
        <span>
          {getWeekName(record.runWeek)}
        </span>
      ),
    }, {
      title: 'الوضعية',
      dataIndex: 'statusTask',
      key: 'statusTask',
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
      dataIndex: 'id',
      key: 'id',
      className: 'List-table-action',
      fixed: 'right',
      render: (_, record) => (<ItemActions task={record} />),
    },
  ];
  return (
    <StyledListTable
      hoverColor
      data={taskPage?.content}
      loading={loading}
      columns={columns}
      scroll={{ x: 'auto' }}
    />
  );
};

export default TaskListTable;
