'use client';
import React from 'react';
import {
  useStudentActionsContext,
  useStudentContext,
} from '../StudentContextProvider';
import ConfirmationModal from '@crema/components/AppConfirmationModal';
import AppInfoView from '@crema/components/AppInfoView';
import AddEditClass from '../AddEditStudent';
import ChangeClassStudent from '../ChangeClassStudent';
import ImportModel from '../ImportExportModel/ImportModel';
import RemoveStudentListModal from '../ListRemovedStudent';

const Models = ({ }) => {
  const { openRemovedStudentModel, openDeleteModel, openAddEditViewModel, openChangClasseeModel, openImportModel } =
    useStudentContext();
  const { onCloseDeleteModel, onConfirmDeleteModel } =
    useStudentActionsContext();
  return (
    <>
      {openDeleteModel && (
        <ConfirmationModal
          open={openDeleteModel}
          onDeny={onCloseDeleteModel}
          onConfirm={onConfirmDeleteModel}
          modalTitle={'شطب تلميذ '}
          paragraph={'هل أنت متأكد من عملية الشطب ؟'}
        />
      )}

      {openAddEditViewModel && <AddEditClass />}
      {openChangClasseeModel && <ChangeClassStudent />}
      {openImportModel && <ImportModel />}
      {openRemovedStudentModel && <RemoveStudentListModal />}

    </>
  );
};

export default Models;
