'use client';
import React from 'react';
import { useFollowupActionsContext, useFollowupContext } from '../FollowupsContextProvider';
import ConfirmationModal from '@crema/components/AppConfirmationModal';
import AppInfoView from '@crema/components/AppInfoView';
import AddEditFollowup from '../AddEditFollowup';


const Models = ({ }) => {
    const { openDeleteModel, openAddEditViewModel } = useFollowupContext();
    const { onCloseDeleteModel, onConfirmDeleteModel } = useFollowupActionsContext();
    return (
        <>
            {openDeleteModel && <ConfirmationModal
                open={openDeleteModel}
                onDeny={onCloseDeleteModel}
                onConfirm={onConfirmDeleteModel}
                modalTitle={"حذف عنصر "}
                paragraph={"هل أنت متأكد من عملية الحذف ؟"}
            />}

            {openAddEditViewModel && <AddEditFollowup />}

        </>
    );
};

export default Models;
