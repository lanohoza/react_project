import React from 'react';
import { Dropdown } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import AppIconButton from '@crema/components/AppIconButton';
import { useStudentActionsContext } from '../../StudentContextProvider';

const ItemActions = ({ item }) => {
  const { onDelete, onView, onEdit, onSelectToChangeClass } =
    useStudentActionsContext();

  const items = [
    {
      key: 1,
      label: (
        <div style={{ fontSize: 14 }} onClick={() => onView(item)}>
          عرض
        </div>
      ),
    },
    {
      key: 2,
      label: (
        <div style={{ fontSize: 14 }} onClick={() => onEdit(item)}>
          تعديل
        </div>
      ),
    },
    {
      key: 2,
      label: (
        <div style={{ fontSize: 14 }} onClick={() => onSelectToChangeClass(item)}>
          تغير القسم
        </div>
      ),
    },
    {
      key: 3,
      label: (
        <div style={{ fontSize: 14 }} onClick={() => onDelete(item)}>
          شطب
        </div>
      ),
    },
  ];
  return (
    <Dropdown menu={{ items }} trigger={['click', 'hover']}>
      <AppIconButton icon={<MoreOutlined />} />
    </Dropdown>
  );
};
export default ItemActions;
