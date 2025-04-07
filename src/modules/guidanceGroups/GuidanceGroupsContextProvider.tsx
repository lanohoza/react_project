'use client';
import { getAllScholerYears } from '@core/services/YearService';
import { ModeComponent, Page } from '@core/types/models/core/models';
import { Year } from '@core/types/models/year/YearTypes';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { message } from 'antd';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Difficulty } from '@core/types/models/difficulty/DifficultyTypes';
import { getAllDifficulties } from '@core/services/DifficultyService';
import { GetGuidanceGroupDto, GuidanceGroup } from '@core/types/models/guidanceGroup/GuidanceGroupTypes';
import { deleteGuidanceGroup, getGuidanceGroupById, getGuidanceGroupByIdToEdit, useGetSearchGuidanceGroups } from '@core/services/GuidanceGroupsService';


export type GuidanceGroupContextActions = {
    onEdit: (model: GuidanceGroup) => void;
    onView: (model: GuidanceGroup) => void;
    onDelete: (model: GuidanceGroup) => void;
    onCreate: () => void;
    reload: () => void;
    onSearch: (e: any) => void;
    onChangePage: (page: number) => void
    onCloseModel: () => void,
    onCloseDeleteModel: (open: boolean) => void,
    onConfirmDeleteModel: () => void,
    setSelectedIdYear: (idYear: number) => void
    setDetailOpen: (open: boolean) => void,


};
export type GuidanceGroupContextData = {
    guidanceGroupsPage: Page<GetGuidanceGroupDto>,
    loading: boolean,
    page: number,
    search: string,
    openAddEditViewModel: boolean,
    detailOpen: boolean,
    selectedRow: GuidanceGroup,
    modeAddEditViewModel: ModeComponent,
    initialData: GuidanceGroup,
    openDeleteModel: boolean
    years: Year[],
}
const GuidanceGroupContext = createContext<GuidanceGroupContextData>({
    guidanceGroupsPage: {} as Page<GetGuidanceGroupDto>,
    loading: true,
    openAddEditViewModel: false,
    detailOpen: false,
    initialData: {} as GuidanceGroup,
    selectedRow: {} as GuidanceGroup,
    modeAddEditViewModel: ModeComponent.create,
    page: 0,
    search: '',
    openDeleteModel: false,
    years: [],
});

const GuidanceGroupActionsContext = createContext<GuidanceGroupContextActions>({
    onEdit: (model: GuidanceGroup) => { },
    onView: (model: GuidanceGroup) => { },
    onDelete: (model: GuidanceGroup) => { },
    onCloseModel: () => { },
    onCloseDeleteModel: (open: boolean) => { },
    setDetailOpen: (open: boolean) => { },
    onCreate: () => { },
    reload: () => { },
    onSearch: (e: any) => { },
    onChangePage: (page: number) => { },
    onConfirmDeleteModel: () => { },
    setSelectedIdYear: (idYear: number) => { }


});

export const useGuidanceGroupContext = () => useContext(GuidanceGroupContext);

export const useGuidanceGroupActionsContext = () => useContext(GuidanceGroupActionsContext);

type GuidanceGroupContextProviderProps = {
    children: ReactNode;
};

const GuidanceGroupContextProvider: React.FC<GuidanceGroupContextProviderProps> = ({
    children,
}) => {
    const infoViewActionsContext = useInfoViewActionsContext();
    const [{ apiData: guidanceGroupsPage, loading }, { setQueryParams, fetch }] = useGetSearchGuidanceGroups()
    const [years, setYears] = useState<Year[]>([] as Year[]);

    const [page, setPage] = useState<number>(0);
    const [search, setSearchQuery] = useState('');
    const [open, setOpen] = React.useState(false);
    const [detailOpen, setDetailOpen] = React.useState(false);
    const [openDeleteModel, setOpenDeleteModel] = useState(false);
    const [mode, setMode] = React.useState(ModeComponent.create);
    const [idToDelete, setIdToDelete] = React.useState(-1);
    const [initialData, setInitialData] = React.useState<GuidanceGroup>(undefined);

    const [selectedIdYear, setSelectedIdYear] = useState<number>(-1);
    const [selectedRow, setSelectedRow] = useState<GuidanceGroup>(undefined);


    const handleClose = () => setOpen(false);
    const onCloseDeleteModel = () => setOpenDeleteModel(false);


    useEffect(() => {
        getAllScholerYears(infoViewActionsContext).then((years) => setYears(years));

    }, []);
    const onChangePage = (page: number) => {
        setPage(page);
    };
    const reload = () => {
        setInitialData({} as GuidanceGroup);
        fetch();
    }
    useEffect(() => {
        reloadData();
    }, [search, page, selectedIdYear]);

    const reloadData = () => {
        if (selectedIdYear != -1) {
            const realPage = page - 1;
            setQueryParams({
                search,
                page: realPage,
                idYear: selectedIdYear,
            });
        }
    };
    const onSearchList = (e: any) => {
        setSearchQuery(e.target.value);
        setPage(0);
    };
    const onSelectToView = (guidanceGroup: GuidanceGroup) => {
        getGuidanceGroupById(guidanceGroup.id, infoViewActionsContext).then(guidanceGroupdto => {
            setSelectedRow(guidanceGroupdto);
            setDetailOpen(true);
        })

    };
    const onSelectToEdit = (guidanceGroup: GuidanceGroup) => {
        getGuidanceGroupByIdToEdit(guidanceGroup.id, infoViewActionsContext).then(guidanceGroupdto => {
            setMode(ModeComponent.edit);
            setInitialData(guidanceGroupdto);
            setOpen(true);
        })
    };
    const onSelectToDelete = (guidanceGroup: GuidanceGroup) => {
        setOpenDeleteModel(true);
        setIdToDelete(guidanceGroup.id);
    };

    const onSelectCreate = () => {
        setMode(ModeComponent.create);
        setInitialData(undefined);
        setOpen(true);
    };
    const setDetailOpenClsoe = (open: boolean) => {
        setSelectedRow(undefined);
        setDetailOpen(false);
    };

    const onConfirmDeleteModel = () => {
        if (idToDelete != -1)
            deleteGuidanceGroup(idToDelete, infoViewActionsContext, () => {
                message.success('تم الحذف بنجاح');
                onCloseDeleteModel();
                setIdToDelete(-1);
                fetch();
            })
    }
    return (
        <GuidanceGroupContext.Provider
            value={{
                guidanceGroupsPage: guidanceGroupsPage,
                loading: loading,
                years: years,
                page: page,
                search: search,
                initialData: initialData,
                detailOpen,
                selectedRow,
                openAddEditViewModel: open,
                modeAddEditViewModel: mode,
                openDeleteModel: openDeleteModel,
            }}
        >
            <GuidanceGroupActionsContext.Provider
                value={{
                    onEdit: onSelectToEdit,
                    onView: onSelectToView,
                    onDelete: onSelectToDelete,
                    onCreate: onSelectCreate,
                    reload: reload,
                    setSelectedRow,
                    setDetailOpen: setDetailOpenClsoe,
                    onSearch: onSearchList,
                    onChangePage: onChangePage,
                    onCloseModel: handleClose,
                    onCloseDeleteModel: onCloseDeleteModel,
                    onConfirmDeleteModel: onConfirmDeleteModel,
                    setSelectedIdYear: setSelectedIdYear

                }}
            >
                {children}
            </GuidanceGroupActionsContext.Provider>
        </GuidanceGroupContext.Provider>
    );
};

export default GuidanceGroupContextProvider;
