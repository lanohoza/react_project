import React from 'react';
import ItemActions from './ItemActions';
import { StyledListTable } from '@core/styles/list/index.styled';

import type { ColumnsType } from 'antd/es/table';
import { useTechnicalCardContext } from '../../TechnicalCardContextProvider';
import { TechnicalCard } from '@core/types/models/technicalCards/TechnicalCardTypes';
import { getMonthName, getWeekName } from '@crema/hooks/dateHooks';

const monthsInArabic = [
  'جانفي', 'فيفري', 'مارس', 'أفريل', 'ماي', 'جوان',
  'جويلية', 'أوت', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
];

const weeksInArabic = [
  'الأسبوع الأول', 'الأسبوع الثاني', 'الأسبوع الثالث', 'الأسبوع الرابع'
];
const TcTasksTable = () => {
  const { technicalCardPage, loading } = useTechnicalCardContext();



  const columns: ColumnsType<TechnicalCard> = [
    {
      title: 'الرمز ',
      dataIndex: 'code',
      key: 'code',
    }, {
      title: 'اسم البطاقة',
      dataIndex: 'title',
      key: 'title',
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
    },
    {
      title: 'تاريخ الإنشاء',
      dataIndex: 'createDate',
      key: 'createDate',
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
      data={technicalCardPage.content}
      loading={loading}
      columns={columns}
      scroll={{ x: 'auto' }}
    />
  );
};

export default TcTasksTable;
