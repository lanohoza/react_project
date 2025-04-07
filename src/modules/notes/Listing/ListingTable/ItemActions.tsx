import React from 'react';
import { Dropdown } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import AppIconButton from '@crema/components/AppIconButton';
import { useNoteActionsContext } from '../../NoteContextProvider';


const ItemActions = ({ item }) => {
  const { onView, onEdit } = useNoteActionsContext();

  const items = item.reserveStatus === 'reserved' ? [
    { key: 1, label: <div style={{ fontSize: 14 }} onClick={() => onView(item)}	 >عرض</div> },
    { key: 2, label: <div style={{ fontSize: 14 }} onClick={() => onEdit(item)}	>تعديل</div> },
  ] : [{ key: 2, label: <div style={{ fontSize: 14 }} onClick={() => onEdit(item)}	>حجز</div> }];
  return (
    <Dropdown menu={{ items }} trigger={['click', 'hover']}>
      <AppIconButton icon={<MoreOutlined />} />
    </Dropdown>
  );
};
export default ItemActions;
