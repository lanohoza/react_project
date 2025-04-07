import React from 'react';
import { Dropdown } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import AppIconButton from '@crema/components/AppIconButton';
import { useTechnicalCardActionsContext } from '../../TechnicalCardContextProvider';
import { environment } from '../../../../../envirenement/environnement';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';

const ItemActions = ({ item }) => {
  const infoViewActionsContext = useInfoViewActionsContext();
  const { onDelete, onCopy,  onView, onEdit } =
    useTechnicalCardActionsContext();
  const onPrintTmsReport = () => {
    const queryParams = new URLSearchParams({ tc: item.id }).toString();

    const url = `${environment?.BASE_PATH ?? ''}/pdf/technical-card?${queryParams}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    //router.push("notebooks/activities?d=" +);/// day.format("YYYYMMDD"));
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
        <div style={{ fontSize: 14 }} onClick={() => onPrintTmsReport()}>
          طباعة
        </div>
      ),
    },
    {
      key: 4,
      label: (
        <div style={{ fontSize: 14 }} onClick={() => onCopy(item)}>
          إسناد إلى الكل
        </div>
      ),
    },
    {
      key: 5,
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
