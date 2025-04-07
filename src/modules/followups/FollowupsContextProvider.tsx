'use client';
import { getAllScholerYears } from '@core/services/YearService';
import { deleteFollowup, getFollowupById, useGetSearchFollowups } from '@core/services/FlowUpService';
import { Followup, FollowupStatus, FollowupType, GetFollowupDto } from '@core/types/models/followUp/FollowupTypes';
import { ModeComponent, Page } from '@core/types/models/core/models';
import { Year } from '@core/types/models/year/YearTypes';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { message } from 'antd';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Difficulty } from '@core/types/models/difficulty/DifficultyTypes';
import { getAllDifficulties } from '@core/services/DifficultyService';


export type FollowupContextActions = {
    onEdit: (model: Followup) => void;
    onView: (model: Followup) => void;
    onDelete: (model: Followup) => void;
    onCreate: () => void;
    reload: () => void;
    onSearch: (e: any) => void;
    onChangePage: (page: number) => void
    onCloseModel: () => void,
    onCloseDeleteModel: (open: boolean) => void,
    onConfirmDeleteModel: () => void,
    setSelectedIdYear: (idYear: number) => void,
    setChangeType: (type: FollowupType) => void,
    closeDetailOpen: () => void,
    setChangeStatus: (status: FollowupStatus) => void,

};
export type FollowupContextData = {
    followpsPage: Page<GetFollowupDto>,
    loading: boolean,
    page: number,
    search: string,
    openAddEditViewModel: boolean,
    modeAddEditViewModel: ModeComponent,
    initialData: Followup,
    openDeleteModel: boolean
    years: Year[],
    difficulties: Difficulty[],
    selectedRow: Followup,
    detailOpen: boolean,



}
const FollowupContext = createContext<FollowupContextData>({
    followpsPage: {} as Page<GetFollowupDto>,
    loading: true,
    openAddEditViewModel: false,
    initialData: {} as Followup,
    modeAddEditViewModel: ModeComponent.create,
    page: 0,
    search: '',
    openDeleteModel: false,
    selectedRow: {} as Followup,
    detailOpen: false,
    years: [],
    difficulties: []
});

const FollowupActionsContext = createContext<FollowupContextActions>({
    onEdit: (model: Followup) => { },
    onView: (model: Followup) => { },
    onDelete: (model: Followup) => { },
    onCloseModel: () => { },
    onCloseDeleteModel: (open: boolean) => { },
    onCreate: () => { },
    reload: () => { },
    onSearch: (e: any) => { },
    onChangePage: (page: number) => { },
    onConfirmDeleteModel: () => { },
    setSelectedIdYear: (idYear: number) => { },
    setChangeType: (type: FollowupType) => { },
    setChangeStatus: (status: FollowupStatus) => { },
    closeDetailOpen: () => { },

});

export const useFollowupContext = () => useContext(FollowupContext);

export const useFollowupActionsContext = () => useContext(FollowupActionsContext);

type FollowupContextProviderProps = {
    children: ReactNode;
};

const FollowupContextProvider: React.FC<FollowupContextProviderProps> = ({
    children,
}) => {
    const infoViewActionsContext = useInfoViewActionsContext();
    const [{ apiData: followpsPage, loading }, { setQueryParams, fetch }] = useGetSearchFollowups()
    const [years, setYears] = useState<Year[]>([] as Year[]);
    const [difficulties, setDifficulties] = useState<Difficulty[]>([]);

    const [page, setPage] = useState<number>(0);
    const [search, setSearchQuery] = useState('');
    const [open, setOpen] = React.useState(false);
    const [openDeleteModel, setOpenDeleteModel] = useState(false);
    const [mode, setMode] = React.useState(ModeComponent.create);
    const [idToDelete, setIdToDelete] = React.useState(-1);
    const [initialData, setInitialData] = React.useState<Followup>(undefined);
    const [detailOpen, setDetailOpen] = React.useState(false);

    const [selectedType, setSelectedType] = useState<FollowupType>(undefined);
    const [selectedStatus, setSelectedStatus] = useState<FollowupStatus>(undefined);
    const [selectedIdYear, setSelectedIdYear] = useState<number>(-1);
    const [selectedRow, setSelectedRow] = useState<Followup>(undefined);


    const handleClose = () => setOpen(false);
    const onCloseDeleteModel = () => setOpenDeleteModel(false);


    useEffect(() => {
        getAllScholerYears(infoViewActionsContext).then((years) => setYears(years));
        getAllDifficulties(infoViewActionsContext).then(difficultieDtos => setDifficulties(difficultieDtos));

    }, []);
    const onChangePage = (page: number) => {
        setPage(page);
    };
    const reload = () => {
        setInitialData({} as Followup);
        fetch();
    }
    useEffect(() => {
        reloadData();
    }, [search, page, selectedIdYear, selectedType, selectedStatus]);
    const setChangeType = (type: FollowupType) => {
        setSelectedType(type);
    }
    const reloadData = () => {
        if (selectedIdYear != -1 ) {
            const realPage = page - 1;
            setQueryParams({
                search,
                page: realPage,
                idYear: selectedIdYear,
                type: selectedType,
                status: selectedStatus
            });
        }
    };
    const onSearchList = (e: any) => {
        setSearchQuery(e.target.value);
        setPage(0);
    };
    const onSelectToView = (flowUp: Followup) => {
        getFollowupById(flowUp.id, infoViewActionsContext).then(flowUpdto => {
            setSelectedRow(flowUpdto);
            setDetailOpen(true);
        })

    };

    const closeDetailOpen = () => {

        setSelectedRow(undefined);
        setDetailOpen(false);
    }
    const onSelectToEdit = (flowUp: Followup) => {
        getFollowupById(flowUp.id, infoViewActionsContext).then(flowUpdto => {
            setMode(ModeComponent.edit);
            setInitialData(flowUpdto);
            setOpen(true);
        })
    };
    const onSelectToDelete = (flowUp: Followup) => {
        setOpenDeleteModel(true);
        setIdToDelete(flowUp.id);
    };

    const onSelectCreate = () => {
        setMode(ModeComponent.create);
        setInitialData(undefined);
        setOpen(true);
    };

    const onConfirmDeleteModel = () => {
        if (idToDelete != -1)
            deleteFollowup(idToDelete, infoViewActionsContext, () => {
                message.success('تم الحذف بنجاح');
                onCloseDeleteModel();
                setIdToDelete(-1);
                fetch();
            })
    }
    return (
        <FollowupContext.Provider
            value={{
                followpsPage: followpsPage,
                loading: loading,
                years: years,
                page: page,
                search: search,
                initialData: initialData,
                openAddEditViewModel: open,
                modeAddEditViewModel: mode,
                openDeleteModel: openDeleteModel,
                difficulties: difficulties,
                detailOpen,
                selectedRow,
            }}
        >
            <FollowupActionsContext.Provider
                value={{
                    onEdit: onSelectToEdit,
                    onView: onSelectToView,
                    onDelete: onSelectToDelete,
                    onCreate: onSelectCreate,
                    reload: reload,
                    closeDetailOpen,
                    setChangeType,
                    onSearch: onSearchList,
                    onChangePage: onChangePage,
                    onCloseModel: handleClose,
                    onCloseDeleteModel: onCloseDeleteModel,
                    onConfirmDeleteModel: onConfirmDeleteModel,
                    setSelectedIdYear: setSelectedIdYear,
                    setChangeStatus: setSelectedStatus

                }}
            >
                {children}
            </FollowupActionsContext.Provider>
        </FollowupContext.Provider>
    );
};

export default FollowupContextProvider;
