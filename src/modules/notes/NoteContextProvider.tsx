'use client';
import { deleteNote, findNoteByStudentAndTrimestre } from '@core/services/NoteService';
import { Note, GetNoteDto } from '@core/types/models/note/NoteTypes';
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
import { getAllClasses, getAllClassesByYear } from '@core/services/ClasseService';
import { Year } from '@core/types/models/year/YearTypes';
import { getAllScholerYears } from '@core/services/YearService';
import {
    getAllTrimestresByYear,
} from '@core/services/TrimestreService';
import { Trimestre } from '@core/types/models/trimestre/TrimestreTypes';
import { useGetSearchStudentsWithNotes } from '@core/services/StudentService';
import { StudentNoteDto } from '@core/types/models/student/StudentTypes';
import { Subject } from '@core/types/models/subject/SubjectsTypes';
import { getAllSubjectsByClasse } from '@core/services/SubjectService';

export type NoteContextActions = {
    onEdit: (model: Note) => void;
    onView: (model: Note) => void;
    onDelete: (model: Note) => void;
    onCreate: () => void;
    reload: () => void;
    onSearch: (e: any) => void;
    onChangePage: (page: number) => void;
    onCloseModel: () => void;
    onCloseDeleteModel: (open: boolean) => void;
    onConfirmDeleteModel: () => void;
    onSelectYear: (idYear: number) => void;
    onChangeClass: (id: number) => void;
    onChangeTrimestre: (id: number) => void;
    setOpenImportModel: (open: boolean) => void;
    setOpenExportModel: (open: boolean) => void;
};
export type NoteContextData = {
    classes: GetClasseDto[];
    years: Year[];
    subjects: Subject[];
    selectedIdClasse: number,
    trimestres: Trimestre[];
    notesPage: Page<StudentNoteDto>;
    loading: boolean;
    page: number;
    search: string;
    openAddEditViewModel: boolean;
    modeAddEditViewModel: ModeComponent;
    initialData: Note;
    openDeleteModel: boolean;
    selectedIdTrimestre: number,
    openImportModel: boolean,
    openExportModel: boolean


};
const NoteContext = createContext<NoteContextData>({
    classes: [],
    years: [],
    selectedIdClasse: -1,
    subjects: [],
    trimestres: [],
    notesPage: {} as Page<StudentNoteDto>,
    loading: true,
    openAddEditViewModel: false,
    initialData: {} as Note,
    modeAddEditViewModel: ModeComponent.create,
    page: 0,
    search: '',
    openDeleteModel: false,
    selectedIdTrimestre: -1,
    openImportModel: false,
    openExportModel: false
});

const NoteActionsContext = createContext<NoteContextActions>({
    onEdit: (model: Note) => { },
    onView: (model: Note) => { },
    onDelete: (model: Note) => { },
    onCloseModel: () => { },
    onCloseDeleteModel: (open: boolean) => { },
    onCreate: () => { },
    reload: () => { },
    onSearch: (e: any) => { },
    onChangePage: (page: number) => { },
    onConfirmDeleteModel: () => { },
    onSelectYear: (idYear: number) => { },
    onChangeClass: (id: number) => { },
    onChangeTrimestre: (id: number) => { },
    setOpenImportModel: (open: boolean) => { },
    setOpenExportModel: (open: boolean) => {}

});

export const useNoteContext = () => useContext(NoteContext);

export const useNoteActionsContext = () => useContext(NoteActionsContext);

type NoteContextProviderProps = {
    children: ReactNode;
};

const NoteContextProvider: React.FC<NoteContextProviderProps> = ({
    children,
}) => {
    const infoViewActionsContext = useInfoViewActionsContext();
    const [{ apiData: notesPage, loading }, { setQueryParams, fetch }] =
        useGetSearchStudentsWithNotes();
    const [classes, setClasses] = useState<GetClasseDto[]>([] as GetClasseDto[]);
    const [years, setYears] = useState<Year[]>([] as Year[]);
    const [trimestres, setTrimestres] = useState<Trimestre[]>([] as Trimestre[]);
    const [subjects, setSubjects] = useState<Subject[]>([] as Subject[]);

    useEffect(() => {

        getAllScholerYears(infoViewActionsContext).then((years) => setYears(years));
    }, []);

    const [page, setPage] = useState<number>(0);
    const [selectedIdClasse, setSelectedIdClasse] = useState<number>(-1);
    const [selectedIdTrimestre, setSelectedIdTrimestre] = useState<number>(-1);
    const [search, setSearchQuery] = useState('');
    const [open, setOpen] = React.useState(false);
    const [openImportModel, setOpenImportModel] = React.useState(false);
    const [openExportModel, setOpenExportModel] = React.useState(false);

    const [openDeleteModel, setOpenDeleteModel] = useState(false);
    const [mode, setMode] = React.useState(ModeComponent.create);
    const [idToDelete, setIdToDelete] = React.useState(-1);
    const [initialData, setInitialData] = React.useState<Note>(undefined);


    const handleClose = () => setOpen(false);
    const onCloseDeleteModel = () => setOpenDeleteModel(false);
    const onChangePage = (page: number) => {
        setPage(page);
    };
    const onSelectYear = (idYear: number) => {
        getAllTrimestresByYear(idYear, infoViewActionsContext).then((trimestre) =>
            setTrimestres(trimestre),
        );
        getAllClassesByYear(idYear,infoViewActionsContext).then((classedtos) =>
            setClasses(classedtos),
        );
    };
    const reload = () => {
        setInitialData({} as Note);
        fetch();
    };
    useEffect(() => {
        reloadData();
    }, [search, page, selectedIdClasse, selectedIdTrimestre]);
    const reloadData = () => {
        if (selectedIdClasse != -1 && selectedIdTrimestre != -1) {
            const realPage = page - 1;
            setQueryParams({
                search,
                page: realPage,
                IdClasse: selectedIdClasse,
                IdTrimestre: selectedIdTrimestre,
            });
        }
    };
    const onSearchList = (e: any) => {
        setSearchQuery(e.target.value);
        setPage(0);
    };
    const onSelectToView = (studentNoteDto: StudentNoteDto) => {
        setMode(ModeComponent.view);
        getAllSubjectsByClasse(selectedIdClasse,infoViewActionsContext).then(subjects=>setSubjects(subjects));
        findNoteByStudentAndTrimestre(studentNoteDto.id, selectedIdTrimestre, infoViewActionsContext).then(note => { setInitialData(note); setOpen(true); }
        );
    };
    const onSelectToEdit = (studentNoteDto: StudentNoteDto) => {
        setMode(ModeComponent.edit);
        getAllSubjectsByClasse(selectedIdClasse,infoViewActionsContext).then(subjects=>setSubjects(subjects));
        findNoteByStudentAndTrimestre(studentNoteDto.id, selectedIdTrimestre, infoViewActionsContext).then(note => { setInitialData(note); setOpen(true); });
    };
    const onSelectToDelete = (note: GetNoteDto) => {
        setOpenDeleteModel(true);
        setIdToDelete(note.id);
    };

    const onSelectCreate = () => {
        setMode(ModeComponent.create);
        setInitialData(undefined);
        setOpen(true);
    };
    const onConfirmDeleteModel = () => {
        if (idToDelete != -1)
            deleteNote(idToDelete, infoViewActionsContext, () => {
                message.success('تم الحذف بنجاح');
                onCloseDeleteModel();
                setIdToDelete(-1);
                fetch();
            });
    };

    const onChangeClass = (id: number) => {
        setSelectedIdClasse(id);
    };
    const onChangeTrimestre = (id: number) => {

        setSelectedIdTrimestre(id);
    };
    return (
        <NoteContext.Provider
            value={{
                trimestres: trimestres,
                selectedIdClasse: selectedIdClasse,
                selectedIdTrimestre: selectedIdTrimestre,
                subjects: subjects,
                years: years,
                classes: classes,
                notesPage: notesPage,
                loading: loading,
                page: page,
                search: search,
                initialData: initialData,
                openAddEditViewModel: open,
                modeAddEditViewModel: mode,
                openDeleteModel: openDeleteModel,
                openImportModel: openImportModel,
                openExportModel:openExportModel
            }}
        >
            <NoteActionsContext.Provider
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
                    onChangeTrimestre: onChangeTrimestre,
                    setOpenImportModel:setOpenImportModel,
                    setOpenExportModel:setOpenExportModel

                }}
            >
                {children}
            </NoteActionsContext.Provider>
        </NoteContext.Provider>
    );
};

export default NoteContextProvider;
