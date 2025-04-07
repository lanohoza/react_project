import React, { useEffect, useState } from 'react';
import TaskActions from './TaskActions';
import { StyledListId } from '@core/styles/list/index.styled';

import type { ColumnsType } from 'antd/es/table';
import { StyledCurrentTaskListTable } from '@core/styles/header/index.styled';
import { Task } from '@core/types/models/task/TaskTypes';
import { executeTask, getCurrentWeekTasks } from '@core/services/YearPragramService';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { notification } from 'antd';
import ConfirmationModal from '@crema/components/AppConfirmationModal';
import { useRouter } from 'next/navigation';
import { environment } from '../../../../envirenement/environnement';
import { Badge } from 'antd';
import { TechnicalCardYearDto } from '@core/types/models/technicalCards/TechnicalCardTypes';
import { executeAction } from '@core/services/ActionTask';


const CurrentTasksTable = ({ tasks, loading }) => {
  const infoViewActionsContext = useInfoViewActionsContext();

  const router = useRouter();

  const [openConfiremModel, setOpenConfiremModel] = useState<boolean>(false);
  const [selectedItem, setselectedItem] = useState<any>({});
  const statusMapping = {
    finish: 'منجز',
    todo: 'للتنفيذ',
    in_progress: 'قيد التنفيذ',
    en_pause: 'متوقف',
    canceled: 'ملغي',
    not_completed: 'غير مكتمل',
    pending: 'معلق'
  };

  const typeMapping = {
    permanent: 'سنوي',
    temporary: 'دوري'
  };


  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo': {
        return '#E2A72E';
      }
      case 'finish': {
        return '#43C888';
      }
      case 'in_progress': {
        return '#4E9AE2';
      }
      case 'en_pause': {
        return '#E2D84E';
      }
      case 'canceled': {
        return '#F84E4E';
      }
      case 'not_completed': {
        return '#D8A8E2';
      }
      case 'pending': {
        return '#E2A72E';
      }
      default: {
        return '#F84E4E';
      }
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'permanent': {
        return '#43C888';
      }
      case 'temporary': {
        return '#E2A72E';
      }
    }
  };

  // const columns: ColumnsType<Task> = [
  //   {
  //     title: 'الرمز ',
  //     dataIndex: 'code',
  //     key: 'code',
  //   },
  //   {
  //     title: 'اسم المهمة ',
  //     dataIndex: 'title',
  //     key: 'title',
  //     width: 400
  //   },
  //   {
  //     title: 'الحالة',
  //     dataIndex: 'statusTask',
  //     key: 'statusTask',
  //     render: (status) => (
  //       <span
  //         className='badge'
  //         style={{
  //           color: getStatusColor(status),
  //           backgroundColor: getStatusColor(status) + '44',
  //         }}
  //       >
  //         {statusMapping[status]}
  //       </span>
  //     ),
  //   }
  // ];

  const columns: ColumnsType<TechnicalCardYearDto> = [
    {
      title: 'الرمز ',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'اسم المهمة ',
      dataIndex: 'title',
      key: 'title',
      width: 400,
      render: (text, record) => (
        <>
          <Badge.Ribbon color={getTypeColor(record.type)} text={typeMapping[record.type]}>
            {record.title}
          </Badge.Ribbon>
        </>
      ),

    },
  ];

  const handleRowClick = (record) => {
    if (record.statusTask == "todo") {
      setselectedItem(record);
      setOpenConfiremModel(true);
    } else
      if (record.statusTask == "in_progress") {
        window.open(`${environment?.BASE_PATH ?? ''}/tasks/details?id=` + record.idTask);
      }
  };

  const onConfirmModel = () => {
    executeTask(selectedItem.idTask, infoViewActionsContext).then(() => {
      notification.success({ message: "تم تنفيذ العملية بنجاح" });
      setOpenConfiremModel(false);
      window.open(`${environment?.BASE_PATH ?? ''}/tasks/details?id=` + selectedItem.idTask);
    }).catch((error) => {
      infoViewActionsContext.fetchError(error.message);
    });


  }
  return (
    <>    
    <StyledCurrentTaskListTable
      hoverColor
      data={tasks}
      loading={loading}
      columns={columns}
      onRow={(record, rowIndex) => {
        return {
          onClick: event => {
            handleRowClick(record);  // handle click event
          }
        };
      }}
      scroll={{ x: 'auto' }}
    />
      {openConfiremModel && <ConfirmationModal
        open={openConfiremModel}
        onDeny={() => setOpenConfiremModel(false)}
        onConfirm={() => onConfirmModel()}
        modalTitle={'تنفيذ المهمة  '}
        paragraph={'هل أنت متأكد من تنفيذ هاته المهمة  ؟'}
      />}
    </>

  );
};

export default CurrentTasksTable;
