'use client';
import React from 'react';
import { useUserActionsContext, useUserContext } from '../ListMembresContextProvider';
import ConfirmationModal from '@crema/components/AppConfirmationModal';

const Models = ({ }) => {
  const {
    openDeleteModel,
    openAddEditViewModel,
  } =
    useUserContext();
  const { onCloseDeleteModel, onConfirmDeleteModel } =
    useUserActionsContext();
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

      {/* {openAddEditViewModel && <AddEditTechnicalCard />} */}
    </>
  );
};

export default Models;
