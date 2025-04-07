'use client';
import React from 'react';
import {
  useInterviewActionsContext,
  useInterviewContext,
} from '../InterviewsContextProvider';
import ConfirmationModal from '@crema/components/AppConfirmationModal';
import AppInfoView from '@crema/components/AppInfoView';
import AddEditInterview from '../AddEditInterview';
import DoInterviewModal from '../DoInterviewModal';

const Models = ({}) => {
  const { openDeleteModel, openAddEditViewModel, openDoInterviewModel } =
    useInterviewContext();
  const { onCloseDeleteModel, onConfirmDeleteModel } =
    useInterviewActionsContext();
  return (
    <>
      {openDeleteModel && (
        <ConfirmationModal
          open={openDeleteModel}
          onDeny={onCloseDeleteModel}
          onConfirm={onConfirmDeleteModel}
          modalTitle={'حذف عنصر '}
          paragraph={'هل أنت متأكد من عملية الحذف ؟'}
        />
      )}

      {openAddEditViewModel && <AddEditInterview />}
      {openDoInterviewModel && <DoInterviewModal />}
    </>
  );
};

export default Models;
