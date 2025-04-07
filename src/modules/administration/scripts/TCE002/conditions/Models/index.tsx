'use client';
import React from 'react';
import ConfirmationModal from '@crema/components/AppConfirmationModal';
import { useTCE002ConditionActionsContext, useTCE002ConditionContext } from '../TCE002ConditionContextProvider';
import AddEditViewTCE002Condition from '../addEditView/index';

const Models = ({ }) => {
  const {
    openDeleteModel,
    openAddEditViewModel,
  } =
    useTCE002ConditionContext();
  const { onCloseDeleteModel, onConfirmDeleteModel } =
    useTCE002ConditionActionsContext();
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

      {openAddEditViewModel && <AddEditViewTCE002Condition />}
    </>
  );
};

export default Models;
