'use client';
import React, { useEffect, useState } from 'react';
import { PDFViewer, View, Text, Document, Page } from '@react-pdf/renderer';
import DocumnetView from '@core/components/DocumnetView';
import { useSearchParams } from 'next/navigation';
import dayjs from 'dayjs';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { getDailyNotebookData } from '@core/services/NotebookService';
import { DailyNotebookDto } from '@core/types/models/notebook/DailyNotebookTypes';
import DailyNotebookDocument from '@core/Documents/Notebooks/DailyNotebookDocument';


const DailyNotebook = ({ }) => {
    const searchParams = useSearchParams();
    const infoViewActionsContext = useInfoViewActionsContext();
    const [dailyNotebookDto, setDailyNotebookDto] = useState<DailyNotebookDto>({} as DailyNotebookDto);
    const loadData = () => {
        const d = searchParams.get('d');
        const timestamp = parseInt(d, 10);
        const day = dayjs(timestamp);
        getDailyNotebookData(day.format("YYYY-MM-DD"), infoViewActionsContext).then(datasource => setDailyNotebookDto(datasource))
    }

    useEffect(() => {
        loadData();
    }, [])
    return (
        <>
            <DocumnetView >
                <DailyNotebookDocument datasource={dailyNotebookDto}></DailyNotebookDocument>
            </DocumnetView>
        </>
    );
};

export default DailyNotebook;
