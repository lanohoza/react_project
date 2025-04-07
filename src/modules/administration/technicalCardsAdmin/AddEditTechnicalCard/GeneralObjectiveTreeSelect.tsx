'use client';
import React from 'react';
import AppsContainer from '@crema/components/AppsContainer';
import AppPageMeta from '@crema/components/AppPageMeta';
import DynamicTreeSelect from '@core/components/DynamicTreeSelect';
import { deleteGeneralObjective, saveFromAdmin, saveGeneralObjective } from '@core/services/GeneralObjectiveService';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { SourceTechnicalCard } from '@core/types/enums/SourceTechnicalCard';


//import { StyledLinkBtn } from '../Confirmation/index.styled';


const GeneralObjectiveTreeSelect = ({ dataTree, reload, onChange, value,disabled }) => {
    const infoViewActionsContext = useInfoViewActionsContext()
    const OnSaveItem = (item) => {
        // item.source = SourceTechnicalCard.ADMIN;
        return saveFromAdmin(item, infoViewActionsContext).then(() => {
            reload();
            infoViewActionsContext.showMessage("تم الحفظ بنجاح");
        });
    }
    const OnRemoveItem = (item) => {
        deleteGeneralObjective(item.id, infoViewActionsContext).then(() => {
            reload();
            infoViewActionsContext.showMessage("تم الحذف لنجاح بنجاح");
        });
    }

    return (
        <>
            <DynamicTreeSelect disabled={disabled} value={value} OnRemoveItem={OnRemoveItem} onChange={onChange} OnSaveItem={OnSaveItem} dataTree={dataTree} itemName='هدف عام' childItemName='هدف تنفيذي' itemsTitle="الأهداف العامة" childItemsTitle="الاهداف التنفيذية"></DynamicTreeSelect>
        </>
    );
};

export default GeneralObjectiveTreeSelect;
