import React from 'react';
import ItemActions from './ItemActions';
import { StyledListTable } from '@core/styles/list/index.styled';
import type { ColumnsType } from 'antd/es/table';
import { useEstablishmentSettingsContext } from '../../../EstablishmentSettingsContextProvider';
import { EstablishmentEmployees } from '@core/types/models/establishmentEmployees/EstablishmentEmployeesTypes';
import { TypeEstablishmentEmployees } from '@core/types/enums/TypeEstablishmentEmployees';

const typeLabels: Record<TypeEstablishmentEmployees, string> = {
  [TypeEstablishmentEmployees.EDUCATION_ADVISOR]: 'مستشار التربية',
  [TypeEstablishmentEmployees.OVERSEER]: 'الناظر',
  [TypeEstablishmentEmployees.EDUCATION_SUPERVISOR]: 'مشرف تربية',
  [TypeEstablishmentEmployees.DIRECTOR]: 'مدير المؤسسة',
};

const EstablishmentEmployeesTable = () => {
  const { EstablishmentSettingsPage, loading } = useEstablishmentSettingsContext();

  const columns: ColumnsType<EstablishmentEmployees> = [
    {
      title: 'الإسم',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'اللقب',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'المنصب',
      dataIndex: 'type',
      key: 'type',
      render: (type: TypeEstablishmentEmployees) => typeLabels[type] || type,
    },
    {
      title: 'البريد الإلكتروني',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'العمليات',
      dataIndex: 'id',
      key: 'id',
      className: 'List-table-action',
      fixed: 'right',
      render: (_, record) => <ItemActions item={record} />,
    },
  ];

  return (
    <StyledListTable
      hoverColor
      data={EstablishmentSettingsPage.content}
      loading={loading}
      columns={columns}
      scroll={{ x: 'auto' }}
    />
  );
};

export default EstablishmentEmployeesTable;
