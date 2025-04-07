import React from 'react';
import ItemActions from './ItemActions';
import { StyledListTable } from '@core/styles/list/index.styled';
import { Switch } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { usePopUpContext, usePopUpActionsContext } from '../../PopUpContextProvider';
import { PopUp } from '@core/types/models/popup/PopUpTypes';


const PopUpsTable = () => {
  const { popUpPage, loading } = usePopUpContext();
  const { onPublish } = usePopUpActionsContext();
  const columns: ColumnsType<PopUp> = [
    {
      title: 'العنوان',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'تاريخ الإنشاء',
      dataIndex: 'createdDate',
      key: 'createdDate',
    },
    {
      title: 'تفعيل',
      dataIndex: 'publish',
      key: 'publish',
      render: (_, record) => (
        <Switch
          checked={record.publish}
          onChange={(checked) =>
            onPublish(record, checked)
          }
        />
      ),
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
      data={popUpPage.content}
      loading={loading}
      columns={columns}
      scroll={{ x: 'auto' }}
    />
  );
};

export default PopUpsTable;
