import React from 'react';
import ItemActions from './ItemActions';
import { StyledListTable } from '@core/styles/list/index.styled';
import { Switch , Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useUserActionsContext, useUserContext } from '../../ListMembresContextProvider';
import { User } from '@core/types/models/user/UserTypes';
import { activateUser } from '@core/services/UserService';

const ListMembresTable = () => {
  const { userPage, loading } = useUserContext();
  const { onActive } =
    useUserActionsContext();


  const columns: ColumnsType<User> = [
    {
      title: 'الإسم',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'المؤسسة',
      dataIndex: 'idEstablishment',
      key: 'idEstablishment.name',
      render: (_, record) => record.idEstablishment?.name || 'N/A',
    },
    {
      title: 'الحساب',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'البلدية',
      dataIndex: 'idCommune',
      key: 'idCommune.name',
      render: (_, record) => record.idCommune?.name || 'N/A',
    },
    {
      title: 'تفعيل',
      dataIndex: 'active',
      key: 'active',
      render: (_, record) => (
        <Switch
          checked={record.active} 
          onChange={(checked) => onActive(record, checked)} 
        />
      ),
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
      data={userPage.content}
      loading={loading}
      columns={columns}
      scroll={{ x: 'auto' }}
    />
  );
};

export default ListMembresTable;
