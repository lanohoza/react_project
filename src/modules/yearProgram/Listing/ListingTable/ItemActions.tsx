import React from 'react';
import { Dropdown } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import AppIconButton from '@crema/components/AppIconButton';
import { useYearProgramActionsContext } from '../../YearProgramContextProvider';
import { TaskStatus, TaskWithActionsDto } from '@core/types/models/task/TaskTypes';
import { environment } from '../../../../envirenement/environnement';
type Props = {
  task: TaskWithActionsDto;
};
const ItemActions = ({ task }: Props) => {
  const { onDelete, onExecute, onView } =
    useYearProgramActionsContext();
  const onPrintTmsReport = () => {
    console.log(`task`, task);
    const queryParams = new URLSearchParams({ ts: task.idTask }).toString();

    const url = `${environment?.BASE_PATH ?? ''}/pdf/reports/task?${queryParams}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    //router.push("notebooks/activities?d=" +);/// day.format("YYYYMMDD"));
  };
  const items = [
    task.statusTask == TaskStatus.todo ?
      {
        key: 1,
        label: (
          <div style={{ fontSize: 14 }} onClick={() => onExecute(task)}>
            تنفيذ
          </div>
        ),
      } : {
        key: 1,
        label: (
          <div style={{ fontSize: 14 }} onClick={() => onView(task)}>
            معاينة          </div>
        )
      },
    {
      key: 2,
      label: (
        <div style={{ fontSize: 14 }} onClick={onPrintTmsReport}>
          طباعة  تقرير النشاط
        </div>
      ),
    },
    {
      key: 3,
      label: (
        <div style={{ fontSize: 14 }} onClick={() => onDelete(task)}>
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
