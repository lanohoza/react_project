'use client';
import React from 'react';
import ConfirmationModal from '@crema/components/AppConfirmationModal';
import ConfigurationModal from '../Configuration';
import { useYearProgramActionsContext, useYearProgramContext } from '../YearProgramContextProvider';

const Models = ({ }) => {
  const { openDeleteModel,
    openConfigurationModel,
  } =
    useYearProgramContext();
  const { onCloseDeleteModel, onConfirmDeleteModel } =
    useYearProgramActionsContext();

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

      {openConfigurationModel && <ConfigurationModal />}
    </>
  );
};

export default Models;
