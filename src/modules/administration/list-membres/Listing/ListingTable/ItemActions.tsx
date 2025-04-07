import React from 'react';
import { Dropdown } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import AppIconButton from '@crema/components/AppIconButton';
import { environment } from '../../../../../envirenement/environnement';

const ItemActions = ({ item }) => {

  const onViewReport = () => {
    const url = item.userAttestationPath;
    window.open(url, '_blank');
  };

  const items = [
    {
      key: 1,
      label: (
        <div style={{ fontSize: 14 }} onClick={() => onViewReport()}>
          الشهادة
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
