import React from 'react';
import TaskActions from './TaskActions';
import { StyledListId } from '@core/styles/list/index.styled';

import type { ColumnsType } from 'antd/es/table';
import { StyledCurrentTaskListTable } from '@core/styles/header/index.styled';
import { Task } from '@core/types/models/task/TaskTypes';

type Props = {
  listData: Task[];
  loading: boolean;
  onDelete: (id: number) => void;
};

const CurrentTasksTable: React.FC<Props> = ({ listData = [], loading, onDelete }) => {

  const statusMapping = {
    finish: 'منجز',
    todo: 'للتنفيذ',
    in_progress: 'قيد التنفيذ',
    en_pause: 'متوقف',
    canceled: 'ملغي',
    not_completed: 'غير مكتمل',
    pending: 'معلق'
  };

  const monthsInArabic = [
    'جانفي', 'فيفري', 'مارس', 'أفريل', 'ماي', 'جوان',
    'جويلية', 'أوت', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ];

  const weeksInArabic = [
    'الأسبوع الأول', 'الأسبوع الثاني', 'الأسبوع الثالث', 'الأسبوع الرابع'
  ];

  const getMonthName = (monthNumber: number) => {
    return monthsInArabic[monthNumber - 1] || '';
  };

  const getWeekName = (weekNumber: number) => {
    return weeksInArabic[weekNumber - 1] || '';
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

  const handleVisibleChange = (visible: boolean) => {
    // Custom logic if needed
  };

  const columns: ColumnsType<Task> = [
    // {
    //   title: 'معرف النشاط',
    //   dataIndex: 'id',
    //   key: 'id',
    //   render: (id) => <StyledListId>{id}</StyledListId>,
    // },
    {
      title: 'عنوان النشاط',
      key: 'technicalCard.title',
      render: (_, record) => record.technicalCard?.title,
    },
    {
      title: 'تاريخ بداية النشاط',
      dataIndex: ['technicalCard', 'startMonth'],
      key: 'technicalCard.startMonth',
      render: (startMonth, record) => (
        <span>
          {getMonthName(startMonth)} - {getWeekName(record.technicalCard.startWeek)}
        </span>
      ),
    },
    {
      title: 'تاريخ نهاية النشاط',
      dataIndex: ['technicalCard', 'endMonth'],
      key: 'technicalCard.endMonth',
      render: (endMonth, record) => (
        <span>
          {getMonthName(endMonth)} - {getWeekName(record.technicalCard.endWeek)}
        </span>
      ),
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
    // {
    //   title: 'العمليات',
    //   key: 'actions',
    //   className: 'List-table-action',
    //   fixed: 'right',
    //   render: (_, record) => (
    //     <TaskActions 
    //       task={record}
    //       onDelete={onDelete} 
    //       onVisibleChange={handleVisibleChange}
    //     />
    //   ),
    // },
  ];

  return (
    <StyledCurrentTaskListTable
      hoverColor
      data={listData}
      loading={loading}
      columns={columns}
      scroll={{ x: 'auto' }}
    />
  );
};

export default CurrentTasksTable;
