'use client';
import React from 'react';
import { useNoteActionsContext, useNoteContext } from '../NoteContextProvider';
import ConfirmationModal from '@crema/components/AppConfirmationModal';
import AppInfoView from '@crema/components/AppInfoView';
import AddEditClass from '../AddEditNote';
import ImportNoteModel from '../ImportExportModel/ImportModel';
import ExportNoteModel from '../ImportExportModel/ExportModel';


const Models = ({ }) => {
    const { openDeleteModel, openAddEditViewModel, openExportModel, openImportModel } = useNoteContext();
    const { onCloseDeleteModel, onConfirmDeleteModel } = useNoteActionsContext();
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
            {openImportModel && <ImportNoteModel />}
            {openExportModel && <ExportNoteModel />}
        </>
    );
};

export default Models;
