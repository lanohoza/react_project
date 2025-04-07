import React, { useState } from 'react';
import { Dropdown, notification } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import AppIconButton from '@crema/components/AppIconButton';
import { useFollowupActionsContext } from '../../FollowupsContextProvider';
import { endFollowup } from '@core/services/FlowUpService';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import ConfirmationModal from '@crema/components/AppConfirmationModal';


const ItemActions = ({ item }) => {
  const infoViewActionsContext = useInfoViewActionsContext();

  const { onDelete, onView, onEdit, reload } = useFollowupActionsContext();
  const [openEndModal, setOpenEndModal] = useState(false);

  const endFollowupHandler = () => {

    endFollowup(item.id, infoViewActionsContext).then(() => {
      notification.success({ message: 'تمت العملية بنجاح' });
      reload();
    });
    setOpenEndModal(false);

  };



  const getMenuItems = () => {
    switch (item.status) {
      case 'todo':
        return [
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
            key: '5',
            label: <div style={{ fontSize: 14 }} onClick={() => { setOpenEndModal(true); }}>غلق المتابعة</div>,
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
          onConfirm={() => endFollowupHandler()}
          modalTitle={'غلق المقابلة'}
          paragraph={'هل أنت متأكد من غلق المقابلة؟'}
        />
      )}
      <Dropdown menu={{ items: getMenuItems() }} trigger={['click', 'hover']}>
        <AppIconButton icon={<MoreOutlined />} />
      </Dropdown></>
  );
};
export default ItemActions;
