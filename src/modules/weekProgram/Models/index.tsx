'use client';
import React from 'react';
import { useWeekProgramActionsContext, useWeekProgramContext } from '../WeekProgramContextProvider';
import ConfirmationModal from '@crema/components/AppConfirmationModal';
import AddEditWeekProgram from '../addEditView';

const Models = ({ }) => {
  const {
    openDeleteModel,
    openAddEditViewModel,
    modeAddEditViewModel,
    openDeleteTaskModel
  } =
    useWeekProgramContext();
  const { onCloseDeleteModel,onCloseDeleteTaskModel, onConfirmDeleteModel, onConfirmDeleteTaskModel } =
    useWeekProgramActionsContext();
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

      {openDeleteTaskModel && (
        <ConfirmationModal
          open={openDeleteTaskModel}
          onDeny={() => onCloseDeleteTaskModel()}
          onConfirm={() => onConfirmDeleteTaskModel()}
          modalTitle={'حذف النشاط '}
          paragraph={'هل أنت متأكد من عملية الحذف ؟'}
        />
      )}

      {openAddEditViewModel && <AddEditWeekProgram />}
    </>
  );
};

export default Models;
