'use client';
import React from 'react';
import ConfirmationModal from '@crema/components/AppConfirmationModal';
import AddEditViewTCE002Condition from '../addEditView/index';
import { useTCO002EstablishmentConditionActionsContext, useTCO002EstablishmentConditionContext } from '../TCO002EstablishmentConditionsContextProvider';

const Models = ({ }) => {
  const {
    openDeleteModel,
    openAddEditViewModel,
  } =
  useTCO002EstablishmentConditionContext();
  const { onCloseDeleteModel, onConfirmDeleteModel } =
  useTCO002EstablishmentConditionActionsContext();
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
