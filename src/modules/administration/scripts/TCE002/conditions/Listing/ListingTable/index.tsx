'use client';
import React from 'react';
import ItemActions from './ItemActions';
import { StyledListTable } from '@core/styles/list/index.styled';
import type { ColumnsType } from 'antd/es/table';
import { useTCE002ConditionContext } from '../../TCE002ConditionContextProvider';
import { TCE002ConditionToDisplayDto } from '@core/types/models/script/TCE002ConditionDto/TCE002ConditionTypes';

const diagnosticTypeMap: Record<string, string> = {
  student: 'تلميذ',
  classe: 'قسم',
  level: 'مستوى',
  speciality: 'تخصص',
  professor: 'أستاذ',
  parents: 'أولياء الأمور',
};

const TCE002ConditionTable = () => {
  const { TCE002ConditionPage, loading } = useTCE002ConditionContext();
  const columns: ColumnsType<TCE002ConditionToDisplayDto> = [
    {
      title: 'المستهدف',
      dataIndex: 'target',
      key: 'target',
      render: (target: string) => diagnosticTypeMap[target] || target,
    },
    {
      title: 'مظهر التشخيص',
      dataIndex: 'shedSetting',
      key: 'shedSetting'
    },
    {
      title: 'المواد',
      dataIndex: 'subjectTitle',
      key: 'subjectTitle',
      render: (subjectTitle: string[]) => subjectTitle?.join(', ') || '',
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
      data={TCE002ConditionPage.content}
      loading={loading}
      columns={columns}
      scroll={{ x: 'auto' }}
    />
  );
};

export default TCE002ConditionTable;
