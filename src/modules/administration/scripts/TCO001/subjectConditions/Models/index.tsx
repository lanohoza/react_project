'use client';
import React from 'react';
import ConfirmationModal from '@crema/components/AppConfirmationModal';
import AddEditViewTCE002Condition from '../addEditView/index';
import { useTCO002SubjectConditionActionsContext, useTCO002SubjectConditionContext } from '../TCO002SubjectConditionsContextProvider';

const Models = ({ }) => {
  const {
    openDeleteModel,
    openAddEditViewModel,
  } =
  useTCO002SubjectConditionContext();
  const { onCloseDeleteModel, onConfirmDeleteModel } =
  useTCO002SubjectConditionActionsContext();
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
