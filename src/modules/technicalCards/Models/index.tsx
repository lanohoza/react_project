'use client';
import React from 'react';
import { useTechnicalCardActionsContext, useTechnicalCardContext } from '../TechnicalCardContextProvider';
import ConfirmationModal from '@crema/components/AppConfirmationModal';
import AddEditTechnicalCard from '../AddEditTechnicalCard';

const Models = ({ }) => {
  const {
    openDeleteModel,
    openAddEditViewModel,
  } =
    useTechnicalCardContext();
  const { onCloseDeleteModel, onConfirmDeleteModel } =
    useTechnicalCardActionsContext();
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

      {openAddEditViewModel && <AddEditTechnicalCard />}
    </>
  );
};

export default Models;
