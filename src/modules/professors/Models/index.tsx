'use client';
import React from 'react';
import { useProfessorActionsContext, useProfessorContext } from '../ProfessorContextProvider';
import ConfirmationModal from '@crema/components/AppConfirmationModal';
import AppInfoView from '@crema/components/AppInfoView';
import AddEditProfessor from '../AddEditProfessor';


const Models = ({ }) => {
    const { openDeleteModel, openAddEditViewModel } = useProfessorContext();
    const { onCloseDeleteModel, onConfirmDeleteModel } = useProfessorActionsContext();
    return (
        <>
            {openDeleteModel && <ConfirmationModal
                open={openDeleteModel}
                onDeny={onCloseDeleteModel}
                onConfirm={onConfirmDeleteModel}
                modalTitle={"حذف عنصر "}
                paragraph={"هل أنت متأكد من عملية الحذف ؟"}
            />}

            {openAddEditViewModel && <AddEditProfessor />}
        </>
    );
};

export default Models;
