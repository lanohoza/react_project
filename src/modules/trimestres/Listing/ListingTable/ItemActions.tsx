import React from 'react';
import { Dropdown } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import AppIconButton from '@crema/components/AppIconButton';
import { environment } from '../../../../envirenement/environnement';

const ItemActions = ({ item }) => {
  const onPrintTmsReport = () => {
    const queryParams = new URLSearchParams({ trm: item.id }).toString();

    const url = `${environment?.BASE_PATH ?? ''}/pdf/reports/tms?${queryParams}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    //router.push("notebooks/activities?d=" +);/// day.format("YYYYMMDD"));
  };
  const items = [
    {
      key: 1,
      label: (
        <div style={{ fontSize: 14 }} onClick={onPrintTmsReport}>
          طباعة التقرير الفصلي
        </div>
      ),
    },
    // { key: 2, label: <div style={{ fontSize: 14 }}>تعديل</div> },
    //  { key: 3, label: <div style={{ fontSize: 14 }} 	>حذف</div> },
  ];
  return (
    <Dropdown menu={{ items }} trigger={['click', 'hover']}>
      <AppIconButton icon={<MoreOutlined />} />
    </Dropdown>
  );
};
export default ItemActions;
