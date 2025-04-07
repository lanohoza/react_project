'use client';
import React from 'react';
import ConfirmationModal from '@crema/components/AppConfirmationModal';
import AddEditViewPopUp from '../addEditView';
import { usePopUpActionsContext, usePopUpContext } from '../PopUpContextProvider';

const Models = ({ }) => {
  const {
    openDeleteModel,
    openPublishModel,
    openAddEditViewModel,
  } =
    usePopUpContext();
  const { onCloseDeleteModel, onClosePublishModel, onConfirmDeleteModel, onConfirmPublishModel } =
    usePopUpActionsContext();
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

      {openPublishModel && (
        <ConfirmationModal
          open={openPublishModel}
          onDeny={() => onClosePublishModel()}
          onConfirm={() => onConfirmPublishModel()}
          modalTitle={'تفعيل الإعلان'}
          paragraph={'هل أنت متأكد من هذه العملية ؟'}
        />
      )}

      {openAddEditViewModel && <AddEditViewPopUp />}
    </>
  );
};

export default Models;
