'use client';
import React from 'react';
import ConfirmationModal from '@crema/components/AppConfirmationModal';
import AddEditViewTCE002Condition from '../addEditView/index';
import { useTCO002GuidanceSpecialityConfigActionsContext, useTCO002GuidanceSpecialityConfigContext } from '../TCO002GuidanceSpecialityConfigContextProvider';

const Models = ({ }) => {
  const {
    openDeleteModel,
    openAddEditViewModel,
  } =
  useTCO002GuidanceSpecialityConfigContext();
  const { onCloseDeleteModel, onConfirmDeleteModel } =
  useTCO002GuidanceSpecialityConfigActionsContext();
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
