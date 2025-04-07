'use client';
import React from 'react';
import { useGuidanceGroupActionsContext, useGuidanceGroupContext } from '../GuidanceGroupsContextProvider';
import ConfirmationModal from '@crema/components/AppConfirmationModal';
import AppInfoView from '@crema/components/AppInfoView';
import AddEditGuidanceGroup from '../AddEditGuidanceGroup';


const Models = ({ }) => {
    const { openDeleteModel, openAddEditViewModel } = useGuidanceGroupContext();
    const { onCloseDeleteModel, onConfirmDeleteModel } = useGuidanceGroupActionsContext();
    return (
        <>
            {openDeleteModel && <ConfirmationModal
                open={openDeleteModel}
                onDeny={onCloseDeleteModel}
                onConfirm={onConfirmDeleteModel}
                modalTitle={"حذف عنصر "}
                paragraph={"هل أنت متأكد من عملية الحذف ؟"}
            />}

            {openAddEditViewModel && <AddEditGuidanceGroup />}

        </>
    );
};

export default Models;
