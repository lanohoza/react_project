'use client';
import React from 'react';
import { useClasseActionsContext, useClasseContext } from '../ClassContextProvider';
import ConfirmationModal from '@crema/components/AppConfirmationModal';
import AppInfoView from '@crema/components/AppInfoView';
import AddEditClass from '../AddEditClass';


const Models = ({ }) => {
    const { openDeleteModel, openAddEditViewModel } = useClasseContext();
    const { onCloseDeleteModel, onConfirmDeleteModel } = useClasseActionsContext();
    return (
        <>
            {openDeleteModel && <ConfirmationModal
                open={openDeleteModel}
                onDeny={onCloseDeleteModel}
                onConfirm={onConfirmDeleteModel}
                modalTitle={"حذف عنصر "}
                paragraph={"هل أنت متأكد من عملية الحذف ؟"}
            />}

            {openAddEditViewModel && <AddEditClass />}
        </>
    );
};

export default Models;
