'use client';
import React from 'react';
import ConfirmationModal from '@crema/components/AppConfirmationModal';
import { useShedSettingActionsContext, useShedSettingContext } from '../ShedSettingContextProvider';
import AddEditViewShedSetting from '../addEditView/index';

const Models = ({ }) => {
  const {
    openDeleteModel,
    openAddEditViewModel,
  } =
    useShedSettingContext();
  const { onCloseDeleteModel, onConfirmDeleteModel } =
    useShedSettingActionsContext();
  return (
    <>
      {openDeleteModel && (
        <ConfirmationModal
          open={openDeleteModel}
          onDeny={() => onCloseDeleteModel()}
          onConfirm={() => onConfirmDeleteModel()}
          modalTitle={'حذف عنصر '}
          paragraph={'هل أنت متأكد من عملية الحذف ؟'}
        />
      )}

      {openAddEditViewModel && <AddEditViewShedSetting />}
    </>
  );
};

export default Models;
