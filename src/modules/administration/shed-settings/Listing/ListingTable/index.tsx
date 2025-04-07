import React from 'react';
import ItemActions from './ItemActions';
import { StyledListTable } from '@core/styles/list/index.styled';
import { Switch } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useShedSettingActionsContext, useShedSettingContext } from '../../ShedSettingContextProvider';
import { ShedSettingToDisplayDto } from '@core/types/models/shedSetting/ShedSettingTypes';
import { diagnosticTypeMap } from '@core/types/enums/DiagnosticType';


const ShedSettingTable = () => {
  const { shedSettingPage, loading } = useShedSettingContext();
  const columns: ColumnsType<ShedSettingToDisplayDto> = [
    {
      title: 'الرمز',
      dataIndex: 'reference',
      key: 'reference',
    },
    {
      title: 'الفئة',
      dataIndex: 'shedCategory',
      key: 'shedCategory',
    },
    {
      title: 'الهدف',
      dataIndex: 'target',
      key: 'target',
      render: (target: string) => diagnosticTypeMap[target] || target,
    },
    {
      title: 'مظهر التشخيص',
      dataIndex: 'syndromeDiagnostic',
      key: 'syndromeDiagnostic'
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
      data={shedSettingPage.content}
      loading={loading}
      columns={columns}
      scroll={{ x: 'auto' }}
    />
  );
};

export default ShedSettingTable;
