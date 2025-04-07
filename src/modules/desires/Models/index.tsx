'use client';
import React from 'react';
import ConfirmationModal from '@crema/components/AppConfirmationModal';
import AppInfoView from '@crema/components/AppInfoView';
import AddEditClasseDesire from '../AddEditClasseDesire';
import { useDesireContext, useDesireActionsContext } from '../DesireContextProvider';
import AddEditDesire from '../AddEditDesire';



const Models = ({ }) => {
    const {  openAddEditByClassModel, openAddEditModel } = useDesireContext();
    const { onCloseDeleteModel, onConfirmDeleteModel } = useDesireActionsContext();
    return (
        <>
            {openAddEditByClassModel && <AddEditClasseDesire />}
            {openAddEditModel && <AddEditDesire />}
        </>
    );
};

export default Models;
