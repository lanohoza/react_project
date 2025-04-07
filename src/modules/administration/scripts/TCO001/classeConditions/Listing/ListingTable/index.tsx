'use client';
import React from 'react';
import ItemActions from './ItemActions';
import { StyledListTable } from '@core/styles/list/index.styled';
import type { ColumnsType } from 'antd/es/table';
import { TCE002ConditionToDisplayDto } from '@core/types/models/script/TCE002ConditionDto/TCE002ConditionTypes';
import { useTCO002ClasseConditionContext } from '../../TCO002ClasseConditionsContextProvider';

const subjectTypeMap: Record<string, string> = {
  empty: 'بدون شرط',
  all: 'جميع المواد',
  one: 'مادة على الاقل',

};

const TCO002ClasseConditionTable = () => {
  const { TCO001Page, loading } = useTCO002ClasseConditionContext();
  const columns: ColumnsType<TCE002ConditionToDisplayDto> = [
    {
      title: 'رقم الرغبة ',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'ترتيب  معدل مجموعة التوجيه',
      dataIndex: 'rank',
      key: 'rank',
    },
    {
      title: 'شرط المواد',
      dataIndex: 'subjectType',
      key: 'subjectType',
      render: (target: string) => subjectTypeMap[target] || target,

    },
    {
      title: 'مظهر التشخيص',
      dataIndex: 'shedSetting',
      key: 'shedSetting'
    },
    {
      title: 'النسبة',
      dataIndex: 'rate',
      key: 'rate'
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
      data={TCO001Page.content}
      loading={loading}
      columns={columns}
      scroll={{ x: 'auto' }}
    />
  );
};

export default TCO002ClasseConditionTable;
