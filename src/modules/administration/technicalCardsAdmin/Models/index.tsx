'use client';
import React from 'react';
import { useTechnicalCardActionsContext, useTechnicalCardContext } from '../TechnicalCardContextProvider';
import ConfirmationModal from '@crema/components/AppConfirmationModal';
import AddEditTechnicalCard from '../AddEditTechnicalCard';

const Models = ({ }) => {
  const {
    openDeleteModel,
    openCopyModel,
    openAddEditViewModel,
  } =
    useTechnicalCardContext();
  const { onCloseDeleteModel, onCloseCopyModel ,onConfirmDeleteModel , onConfirmCopyModel } =
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

      {openCopyModel && (
        <ConfirmationModal
          open={openCopyModel}
          onDeny={() => onCloseCopyModel()}
          onConfirm={() => onConfirmCopyModel()}
          modalTitle={'إسناد بطاقة تقنية '}
          paragraph={'هل أنت متأكد من إسناد هذه البطاقة التقنية إلى جميع المستخدمين ؟'}
        />
      )}

      {openAddEditViewModel && <AddEditTechnicalCard />}
    </>
  );
};

export default Models;
