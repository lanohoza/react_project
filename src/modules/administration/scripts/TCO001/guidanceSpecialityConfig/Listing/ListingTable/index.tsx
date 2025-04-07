'use client';
import React from 'react';
import ItemActions from './ItemActions';
import { StyledListTable } from '@core/styles/list/index.styled';
import type { ColumnsType } from 'antd/es/table';
import { TCE002ConditionToDisplayDto } from '@core/types/models/script/TCE002ConditionDto/TCE002ConditionTypes';
import { useTCO002GuidanceSpecialityConfigContext } from '../../TCO002GuidanceSpecialityConfigContextProvider';
import { Level } from '@core/types/models/level/LevelTypes';
import { typeEstablishmentMap } from '@core/hooks/UrlHooks';

const subjectTypeMap: Record<string, string> = {
  empty: 'بدون شرط',
  all: 'جميع المواد',
  one: 'مادة على الاقل',

};

const TCO002GuidanceSpecialityConfigTable = () => {
  const { TCO001Page, loading } = useTCO002GuidanceSpecialityConfigContext();
  const columns: ColumnsType<TCE002ConditionToDisplayDto> = [
    {
      title: 'المستوى',
      dataIndex: 'level',
      key: 'level',
      render: (level: Level) => level.title + " " + typeEstablishmentMap[level.type],

    },
    {
      title: 'التخصص',
      dataIndex: 'guidanceSpeciality',
      key: 'guidanceSpeciality',
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

export default TCO002GuidanceSpecialityConfigTable;
