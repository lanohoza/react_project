'use client';
import React from 'react';
import ConfirmationModal from '@crema/components/AppConfirmationModal';
import AddEditEstablishmentEmployees from '../addEditView';
import { useEstablishmentSettingsActionsContext, useEstablishmentSettingsContext } from '../../EstablishmentSettingsContextProvider';

const Models = ({ }) => {
  const {
    openDeleteModel,
    openAddEditViewModel,
    modeAddEditViewModel,
  } =
    useEstablishmentSettingsContext();
  const { onCloseDeleteModel, onConfirmDeleteModel } =
    useEstablishmentSettingsActionsContext();
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

      {openAddEditViewModel && <AddEditEstablishmentEmployees />}
    </>
  );
};

export default Models;
