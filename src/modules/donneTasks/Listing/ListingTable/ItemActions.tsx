import React from 'react';
import { Dropdown } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import AppIconButton from '@crema/components/AppIconButton';
import { TaskStatus, TaskWithActionsDto } from '@core/types/models/task/TaskTypes';
import { environment } from '../../../../envirenement/environnement';
import { useDonneTaskActionsContext } from '../../DonneTaskContextProvider';
type Props = {
  task: TaskWithActionsDto;
};
const ItemActions = ({ task }: Props) => {

  const onPrintTmsReport = () => {
    const queryParams = new URLSearchParams({ ts: task.idTask }).toString();

    const url = `${environment?.BASE_PATH ?? ''}/pdf/reports/task?${queryParams}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    //router.push("notebooks/activities?d=" +);/// day.format("YYYYMMDD"));
  };
  const items = [
    {
      key: 1,
      label: (
        <div style={{ fontSize: 14 }} onClick={onPrintTmsReport}>
          طباعة  تقرير النشاط
        </div>
      ),
    }
  ];
  return (
    <Dropdown menu={{ items }} trigger={['click', 'hover']}>
      <AppIconButton icon={<MoreOutlined />} />
    </Dropdown>
  );
};
export default ItemActions;
