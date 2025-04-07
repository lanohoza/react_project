'use client';
import { Desire } from '@core/types/models/desire/DesireTypes';
import { ModeComponent, Page } from '@core/types/models/core/models';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { message } from 'antd';
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';
import { GetClasseDto } from '@core/types/models/classe/ClasseTypes';
import { getAllClassesByYear } from '@core/services/ClasseService';
import { Year } from '@core/types/models/year/YearTypes';
import { getAllScholerYears } from '@core/services/YearService';
import { useGetSearchStudentsWithDesires } from '@core/services/StudentService';
import { StudentDesireDto } from '@core/types/models/student/StudentTypes';
import { deleteDesire } from '@core/services/DesireService';

export type DesireContextActions = {
    onEdit: (model: Desire) => void;
    onView: (model: Desire) => void;
    onDelete: (model: Desire) => void;
    onCreate: () => void;
    reload: () => void;
    onSearch: (e: any) => void;
    onChangePage: (page: number) => void;
    onCloseModel: () => void;
    onCloseDeleteModel: (open: boolean) => void;
    onConfirmDeleteModel: () => void;
    onSelectYear: (idYear: number) => void;
    onChangeClass: (id: number) => void;
    setOpenAddEditByClassModel: (bool: boolean) => void;
    setOpenAddEditModel: (bool: boolean) => void;
    setSelectedIdStudent: (idStudent: number) => void;

};
export type DesireContextData = {
    classes: GetClasseDto[];
    years: Year[];
    selectedIdClasse: number,
    desiresPage: Page<StudentDesireDto>;
    loading: boolean;
    page: number;
    search: string;
    openAddEditViewModel: boolean;
    modeAddEditViewModel: ModeComponent;
    initialData: Desire;
    openDeleteModel: boolean;
    openAddEditByClassModel: boolean;
    openAddEditModel: boolean;
    selectedIdStudent: number

};
const DesireContext = createContext<DesireContextData>({
    classes: [],
    years: [],
    selectedIdClasse: -1,
    desiresPage: {} as Page<StudentDesireDto>,
    loading: true,
    openAddEditViewModel: false,
    initialData: {} as Desire,
    modeAddEditViewModel: ModeComponent.create,
    page: 0,
    search: '',
    openDeleteModel: false,
    openAddEditByClassModel: false,
    openAddEditModel: false,
    selectedIdStudent: undefined

});

const DesireActionsContext = createContext<DesireContextActions>({
    onEdit: (model: Desire) => { },
    onView: (model: Desire) => { },
    onDelete: (model: Desire) => { },
    onCloseModel: () => { },
    onCloseDeleteModel: (open: boolean) => { },
    onCreate: () => { },
    reload: () => { },
    onSearch: (e: any) => { },
    onChangePage: (page: number) => { },
    onConfirmDeleteModel: () => { },
    onSelectYear: (idYear: number) => { },
    onChangeClass: (id: number) => { },
    setOpenAddEditByClassModel: (bool: boolean) => { },
    setOpenAddEditModel: (bool: boolean) => { },
    setSelectedIdStudent: (idStudent: number) => { }

});

export const useDesireContext = () => useContext(DesireContext);

export const useDesireActionsContext = () => useContext(DesireActionsContext);

type DesireContextProviderProps = {
    children: ReactNode;
};

const DesireContextProvider: React.FC<DesireContextProviderProps> = ({
    children,
}) => {
    const infoViewActionsContext = useInfoViewActionsContext();
    const [{ apiData: desiresPage, loading }, { setQueryParams, fetch }] =
        useGetSearchStudentsWithDesires();
    const [classes, setClasses] = useState<GetClasseDto[]>([] as GetClasseDto[]);
    const [years, setYears] = useState<Year[]>([] as Year[]);

    useEffect(() => {
        getAllScholerYears(infoViewActionsContext).then((years) => setYears(years));
    }, []);

    const [page, setPage] = useState<number>(0);
    const [selectedIdClasse, setSelectedIdClasse] = useState<number>(-1);
    const [search, setSearchQuery] = useState('');
    const [open, setOpen] = React.useState(false);

    const [openAddEditByClassModel, setOpenAddEditByClassModel] = React.useState(false);
    const [openAddEditModel, setOpenAddEditModel] = React.useState(false);
    const [selectedIdStudent, setSelectedIdStudent] = useState<number>(-1);

    const [openDeleteModel, setOpenDeleteModel] = useState(false);
    const [mode, setMode] = React.useState(ModeComponent.create);
    const [idToDelete, setIdToDelete] = React.useState(-1);
    const [initialData, setInitialData] = React.useState<Desire>(undefined);


    const handleClose = () => setOpen(false);
    const onCloseDeleteModel = () => setOpenDeleteModel(false);
    const onChangePage = (page: number) => {
        setPage(page);
    };
    const onSelectYear = (idYear: number) => {
        getAllClassesByYear(idYear, infoViewActionsContext).then((classedtos) =>
            setClasses(classedtos),
        );
    };
    const reload = () => {
        setInitialData({} as Desire);
        fetch();
    };
    useEffect(() => {
        reloadData();
    }, [search, page, selectedIdClasse]);
    const reloadData = () => {
        if (selectedIdClasse != -1) {
            const realPage = page - 1;
            setQueryParams({
                search,
                page: realPage,
                IdClasse: selectedIdClasse,
            });
        }
    };
    const onSearchList = (e: any) => {
        setSearchQuery(e.target.value);
        setPage(0);
    };
    const onSelectToView = (desire: Desire) => {
        setMode(ModeComponent.view);

    };
    const onSelectToEdit = (student: Desire) => {
        setMode(ModeComponent.edit);
        setSelectedIdStudent(student.id);
        setOpenAddEditModel(true);
    };
    const onSelectToDelete = (desire: Desire) => {
        setOpenDeleteModel(true);
        setIdToDelete(desire.id);
        setOpenAddEditModel(true);
    };

    const onSelectCreate = () => {
        setMode(ModeComponent.create);
        setInitialData(undefined);
        setOpen(true);
    };
    const onConfirmDeleteModel = () => {

    };

    const onChangeClass = (id: number) => {
        setSelectedIdClasse(id);
    };

    return (
        <DesireContext.Provider
            value={{
                selectedIdClasse: selectedIdClasse,
                years: years,
                classes: classes,
                desiresPage: desiresPage,
                loading: loading,
                page: page,
                search: search,
                initialData: initialData,
                openAddEditViewModel: open,
                modeAddEditViewModel: mode,
                openDeleteModel: openDeleteModel,
                openAddEditByClassModel: openAddEditByClassModel,
                openAddEditModel: openAddEditModel,
                selectedIdStudent: selectedIdStudent

            }}
        >
            <DesireActionsContext.Provider
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
                    onSelectYear: onSelectYear,
                    onChangeClass: onChangeClass,
                    setOpenAddEditByClassModel: setOpenAddEditByClassModel,
                    setOpenAddEditModel: setOpenAddEditModel,
                    setSelectedIdStudent: setSelectedIdStudent
                }}
            >
                {children}
            </DesireActionsContext.Provider>
        </DesireContext.Provider>
    );
};

export default DesireContextProvider;
