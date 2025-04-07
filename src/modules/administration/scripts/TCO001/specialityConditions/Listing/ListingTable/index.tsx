'use client';
import React from 'react';
import ItemActions from './ItemActions';
import { StyledListTable } from '@core/styles/list/index.styled';
import type { ColumnsType } from 'antd/es/table';
import { TCE002ConditionToDisplayDto } from '@core/types/models/script/TCE002ConditionDto/TCE002ConditionTypes';
import { useTCO002SpecialityConditionContext } from '../../TCO002SpecialityConditionsContextProvider';

const subjectTypeMap: Record<string, string> = {
  empty: 'بدون شرط',
  all: 'جميع المواد',
  one: 'مادة على الاقل',

};

const TCO002SpecialityConditionTable = () => {
  const { TCO001Page, loading } = useTCO002SpecialityConditionContext();
  const columns: ColumnsType<TCE002ConditionToDisplayDto> = [
    {
      title: 'التخصص',
      dataIndex: 'guidanceSpeciality',
      key: 'guidanceSpeciality',
    },
    {
      title: 'رقم الرغبة ',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'معدل م التوجيه',
      dataIndex: 'average',
      key: 'average',
    },
    {
      title: 'المادة',
      dataIndex: 'subject',
      key: 'subject',
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

export default TCO002SpecialityConditionTable;
