import React from 'react';
import { Dropdown } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import AppIconButton from '@crema/components/AppIconButton';


const ItemActions = ({ item }) => {

  const items = [
    { key: 1, label: <div style={{ fontSize: 14 }} onClick={() => { }}	 >عرض</div> },
    { key: 2, label: <div style={{ fontSize: 14 }} onClick={() => { }}	>تعديل</div> },
    { key: 3, label: <div style={{ fontSize: 14 }} onClick={() => { }}	>حذف</div> },
  ];
  return (
    <Dropdown menu={{ items }} trigger={['click', 'hover']}>
      <AppIconButton icon={<MoreOutlined />} />
    </Dropdown>
  );
};
export default ItemActions;
