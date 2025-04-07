'use client';
import React from 'react';
import ConfirmationModal from '@crema/components/AppConfirmationModal';
import AddEditViewTCE002Condition from '../addEditView/index';
import { useTCO002SpecialityConditionActionsContext, useTCO002SpecialityConditionContext } from '../TCO002SpecialityConditionsContextProvider';

const Models = ({ }) => {
  const {
    openDeleteModel,
    openAddEditViewModel,
  } =
  useTCO002SpecialityConditionContext();
  const { onCloseDeleteModel, onConfirmDeleteModel } =
  useTCO002SpecialityConditionActionsContext();
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
