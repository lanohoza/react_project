'use client';
import React from 'react';
import ItemActions from './ItemActions';
import { StyledListTable } from '@core/styles/list/index.styled';
import type { ColumnsType } from 'antd/es/table';
import { TCE002ConditionToDisplayDto } from '@core/types/models/script/TCE002ConditionDto/TCE002ConditionTypes';
import { useTCO002LevelConditionContext } from '../../TCO002LevelConditionsContextProvider';
import { Level } from '@core/types/models/level/LevelTypes';

const subjectTypeMap: Record<string, string> = {
  empty: 'بدون شرط',
  all: 'جميع المواد',
  one: 'مادة على الاقل',

};
const typeEstablishmentMap: Record<string, string> = {
  "primary": "إبتدائي",
  "secondary": "ثانوي",
  "middle": "متوسط"

};

const TCO002LevelConditionTable = () => {
  const { TCO001Page, loading } = useTCO002LevelConditionContext();
  const columns: ColumnsType<TCE002ConditionToDisplayDto> = [
    {
      title: 'المستوى',
      dataIndex: 'level',
      key: 'level',
      render: (level: Level) =>  level.title + " " + typeEstablishmentMap[level.type],

    },
    {
      title: 'معدل المادة',
      dataIndex: 'average',
      key: 'average',
    },
    {
      title: 'الشعبة',
      dataIndex: 'guidanceSpeciality',
      key: 'guidanceSpeciality',
    },
    {
      title: 'رقم الرغبة ',
      dataIndex: 'number',
      key: 'number',
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

export default TCO002LevelConditionTable;
