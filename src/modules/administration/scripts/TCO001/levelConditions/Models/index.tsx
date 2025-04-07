'use client';
import React from 'react';
import ConfirmationModal from '@crema/components/AppConfirmationModal';
import AddEditViewTCE002Condition from '../addEditView/index';
import { useTCO002LevelConditionActionsContext, useTCO002LevelConditionContext } from '../TCO002LevelConditionsContextProvider';

const Models = ({ }) => {
  const {
    openDeleteModel,
    openAddEditViewModel,
  } =
  useTCO002LevelConditionContext();
  const { onCloseDeleteModel, onConfirmDeleteModel } =
  useTCO002LevelConditionActionsContext();
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
