'use client';
import { getAllScholerYears } from '@core/services/YearService';
import { deleteClasse, getClasseById, useGetSearchClasses } from '@core/services/ClasseService';
import { Classe, GetClasseDto } from '@core/types/models/classe/ClasseTypes';
import { ModeComponent, Page } from '@core/types/models/core/models';
import { Year } from '@core/types/models/year/YearTypes';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { message } from 'antd';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';


export type ClasseContextActions = {
    onEdit: (model: Classe) => void;
    onView: (model: Classe) => void;
    onDelete: (model: Classe) => void;
    onCreate: () => void;
    reload: () => void;
    onSearch: (e: any) => void;
    onChangePage: (page: number) => void
    onCloseModel: () => void,
    onCloseDeleteModel: (open: boolean) => void,
    onConfirmDeleteModel: () => void,
    setSelectedIdYear: (idYear: number) => void


};
export type ClasseContextData = {
    classesPage: Page<GetClasseDto>,
    loading: boolean,
    page: number,
    search: string,
    openAddEditViewModel: boolean,
    modeAddEditViewModel: ModeComponent,
    initialData: Classe,
    openDeleteModel: boolean
    years: Year[]
}
const ClasseContext = createContext<ClasseContextData>({
    classesPage: {} as Page<GetClasseDto>,
    loading: true,
    openAddEditViewModel: false,
    initialData: {} as Classe,
    modeAddEditViewModel: ModeComponent.create,
    page: 0,
    search: '',
    openDeleteModel: false,
    years: []
});

const ClasseActionsContext = createContext<ClasseContextActions>({
    onEdit: (model: Classe) => { },
    onView: (model: Classe) => { },
    onDelete: (model: Classe) => { },
    onCloseModel: () => { },
    onCloseDeleteModel: (open: boolean) => { },
    onCreate: () => { },
    reload: () => { },
    onSearch: (e: any) => { },
    onChangePage: (page: number) => { },
    onConfirmDeleteModel: () => { },
    setSelectedIdYear: (idYear: number) => { }


});

export const useClasseContext = () => useContext(ClasseContext);

export const useClasseActionsContext = () => useContext(ClasseActionsContext);

type ClasseContextProviderProps = {
    children: ReactNode;
};

const ClasseContextProvider: React.FC<ClasseContextProviderProps> = ({
    children,
}) => {
    const infoViewActionsContext = useInfoViewActionsContext();
    const [{ apiData: classesPage, loading }, { setQueryParams, fetch }] = useGetSearchClasses()
    const [years, setYears] = useState<Year[]>([] as Year[]);

    const [page, setPage] = useState<number>(0);
    const [search, setSearchQuery] = useState('');
    const [open, setOpen] = React.useState(false);
    const [openDeleteModel, setOpenDeleteModel] = useState(false);
    const [mode, setMode] = React.useState(ModeComponent.create);
    const [idToDelete, setIdToDelete] = React.useState(-1);
    const [initialData, setInitialData] = React.useState<Classe>(undefined);

    const [selectedIdYear, setSelectedIdYear] = useState<number>(-1);


    const handleClose = () => setOpen(false);
    const onCloseDeleteModel = () => setOpenDeleteModel(false);


    useEffect(() => {
        getAllScholerYears(infoViewActionsContext).then((years) => setYears(years));
    }, []);
    const onChangePage = (page: number) => {
        setPage(page);
    };
    const reload = () => {
        setInitialData({} as Classe);
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
    const onSelectToView = (classe: Classe) => {
        getClasseById(classe.id, infoViewActionsContext).then(classedto => {
            setMode(ModeComponent.view);
            setInitialData(classedto);
            setOpen(true);
        })

    };
    const onSelectToEdit = (classe: Classe) => {
        getClasseById(classe.id, infoViewActionsContext).then(classedto => {
            setMode(ModeComponent.edit);
            setInitialData(classedto);
            setOpen(true);
        })
    };
    const onSelectToDelete = (classe: Classe) => {
        setOpenDeleteModel(true);
        setIdToDelete(classe.id);
    };

    const onSelectCreate = () => {
        setMode(ModeComponent.create);
        setInitialData(undefined);
        setOpen(true);
    };

    const onConfirmDeleteModel = () => {
        if (idToDelete != -1)
            deleteClasse(idToDelete, infoViewActionsContext, () => {
                message.success('تم الحذف بنجاح');
                onCloseDeleteModel();
                setIdToDelete(-1);
                fetch();
            })
    }
    return (
        <ClasseContext.Provider
            value={{
                classesPage: classesPage,
                loading: loading,
                years: years,
                page: page,
                search: search,
                initialData: initialData,
                openAddEditViewModel: open,
                modeAddEditViewModel: mode,
                openDeleteModel: openDeleteModel
            }}
        >
            <ClasseActionsContext.Provider
                value={{
                    onEdit: onSelectToEdit,
                    onView: onSelectToView,
                    onDelete: onSelectToDelete,
                    onCreate: onSelectCreate,
                    reload: reload,
                    onSearch: onSearchList,
                    onChangePage: onChangePage,
                    onCloseModel: handleClose,
                    onCloseDeleteModel: onCloseDeleteModel,
                    onConfirmDeleteModel: onConfirmDeleteModel,
                    setSelectedIdYear: setSelectedIdYear

                }}
            >
                {children}
            </ClasseActionsContext.Provider>
        </ClasseContext.Provider>
    );
};

export default ClasseContextProvider;
