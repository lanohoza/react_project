import React from 'react';
import { Dropdown } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import AppIconButton from '@crema/components/AppIconButton';
import { environment } from '../../../../envirenement/environnement';
import { useWeekProgramActionsContext } from '../../WeekProgramContextProvider';

const ItemActions = ({ item }) => {
  const { onDelete, onView, onEdit } = useWeekProgramActionsContext();

  const onPrintTmsReport = () => {
    const queryParams = new URLSearchParams({ wp: item.id }).toString();
    const url = `${environment?.BASE_PATH ?? ''}/pdf/week-program?${queryParams}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

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
      key: 3,
      label: (
        <div style={{ fontSize: 14 }} onClick={onPrintTmsReport}>
          طباعة
        </div>
      ),
    },
    {
      key: 4,
      label: (
        <div style={{ fontSize: 14 }} onClick={() => onDelete(item)}>
          حذف
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
