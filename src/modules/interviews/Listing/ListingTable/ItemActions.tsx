import React, { useState } from 'react';
import { Dropdown, notification } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import AppIconButton from '@crema/components/AppIconButton';
import { useInterviewActionsContext } from '../../InterviewsContextProvider';
import ConfirmationModal from '@crema/components/AppConfirmationModal';
import { Interview } from '@core/types/models/interview/InterviewTypes';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { endInterview } from '@core/services/InterviewService';

const ItemActions = ({ item }) => {
  const { onDelete, onOpenDoInterviewModel, onEdit, reload } = useInterviewActionsContext();
  const infoViewActionsContext = useInfoViewActionsContext();

  const [openEndModal, setOpenEndModal] = useState(false);
  const [openEndAndOpenModal, setOpenEndAndOpenModal] = useState(false);

  const endInterviewHandler = (renew) => {
    const endInterviewDto = {
      idInterview: item.id,
      openNewInterview: renew,
    };
    endInterview(endInterviewDto, infoViewActionsContext).then(() => {
      notification.success({ message: 'تمت العملية بنجاح' });
      reload();
    });
    setOpenEndModal(false);
    setOpenEndAndOpenModal(false);

  };

  const getMenuItems = () => {
    switch (item.status) {
      case 'todo':
        return [
          {
            key: '1',
            label: <div style={{ fontSize: 14 }} onClick={() => onOpenDoInterviewModel(item)}>اجراء المقابلة</div>,
          },
          {
            key: '2',
            label: <div style={{ fontSize: 14 }} onClick={() => onEdit(item)}>تعديل</div>,
          },
          {
            key: '3',
            label: <div style={{ fontSize: 14 }} onClick={() => onDelete(item)}>حذف</div>,
          },
        ];
      case 'in_progress':
        return [
          {
            key: '4',
            label: <div style={{ fontSize: 14 }} onClick={() => { setOpenEndModal(true); }}>غلق المقابلة</div>,
          },
          {
            key: '5',
            label: <div style={{ fontSize: 14 }} onClick={() => { setOpenEndAndOpenModal(true); }}>غلق وفتح مقابلة جديدة</div>,
          },
          {
            key: '2',
            label: <div style={{ fontSize: 14 }} onClick={() => onEdit(item)}>تعديل</div>,
          },
          {
            key: '3',
            label: <div style={{ fontSize: 14 }} onClick={() => onDelete(item)}>حذف</div>,
          },
        ];
      case 'done':
        return [
          {
            key: '3',
            label: <div style={{ fontSize: 14 }} onClick={() => onDelete(item)}>حذف</div>,
          },
        ];
      default:
        return [];
    }
  };

  return (
    <>
      {openEndModal && (
        <ConfirmationModal
          open={openEndModal}
          onDeny={() => setOpenEndModal(false)}
          onConfirm={() => endInterviewHandler(false)}
          modalTitle={'غلق المقابلة'}
          paragraph={'هل أنت متأكد من غلق المقابلة؟'}
        />
      )}
      {openEndAndOpenModal && (
        <ConfirmationModal
          open={openEndAndOpenModal}
          onDeny={() => setOpenEndAndOpenModal(false)}
          onConfirm={() => endInterviewHandler(true)}
          modalTitle={'غلق المقابلة'}
          paragraph={'هل أنت متأكد من غلق المقابلة وفتح مقابلة جديدة؟'}
        />
      )}
      <Dropdown menu={{ items: getMenuItems() }} trigger={['click', 'hover']}>
        <AppIconButton icon={<MoreOutlined />} />
      </Dropdown>
    </>
  );
};

export default ItemActions;
