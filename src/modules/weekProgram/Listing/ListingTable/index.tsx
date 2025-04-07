import React from 'react';
import ItemActions from './ItemActions';
import { StyledListTable } from '@core/styles/list/index.styled';

import type { ColumnsType } from 'antd/es/table';
import { useWeekProgramContext } from '../../WeekProgramContextProvider';
import { getMonthName, getWeekName } from '@crema/hooks/dateHooks';
import { AddEditWeekProgramDto } from '@core/types/models/weekProgram/WeekProgramTypes';

const monthsInArabic = [
  'جانفي', 'فيفري', 'مارس', 'أفريل', 'ماي', 'جوان',
  'جويلية', 'أوت', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
];

const weeksInArabic = [
  'الأسبوع الأول', 'الأسبوع الثاني', 'الأسبوع الثالث', 'الأسبوع الرابع'
];
const TcTasksTable = () => {
  const { weekProgramPage, loading } = useWeekProgramContext();



  const columns: ColumnsType<AddEditWeekProgramDto> = [
    {
      title: 'الشهر',
      dataIndex: 'idMonth',
      key: 'idMonth',
      render: (idMonth, record) => (
        <span>
          {getMonthName(record.idMonth)}
        </span>
      ),
    }, {
      title: 'من',
      dataIndex: 'startWeek',
      key: 'startWeek',
    },
    {
      title: 'إلى',
      dataIndex: 'endWeek',
      key: 'endWeek',
      
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
      data={weekProgramPage.content}
      loading={loading}
      columns={columns}
      scroll={{ x: 'auto' }}
    />
  );
};

export default TcTasksTable;
