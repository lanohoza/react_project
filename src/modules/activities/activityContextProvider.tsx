'use client';
import { useGetSearchActivities } from '@core/services/ActivityService';
import { Activity, GetActivityDto } from '@core/types/models/activitity/ActivitityTypes';
import { ModeComponent, Page } from '@core/types/models/core/models';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { message } from 'antd';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Filtter } from './Sidebar';


export type ActivityContextActions = {
    onView: (model: Activity) => void;
    reload: () => void;
    onSearch: (e: any) => void;
    onChangePage: (page: number) => void
    setFiltter: (filtter: Filtter) => void
    setOpenActivityReportModal: (open: boolean) => void;

};
export type ActivityContextData = {
    activitiesPage: Page<GetActivityDto>,
    filtter: Filtter,
    loading: boolean,
    page: number,
    openActivityReportModal: boolean,
    search: string,
}
const ActivityContext = createContext<ActivityContextData>({
    activitiesPage: {} as Page<GetActivityDto>,
    loading: true,
    filtter: {} as Filtter,
    page: 0,
    search: '',
    openActivityReportModal: false
});

const ActivityActionsContext = createContext<ActivityContextActions>({
    onView: (model: Activity) => { },
    reload: () => { },
    onSearch: (e: any) => { },
    onChangePage: (page: number) => { },
    setFiltter: (filtter: Filtter) => { },
    setOpenActivityReportModal: (open: boolean) => { },

});

export const useActivityContext = () => useContext(ActivityContext);

export const useActivityActionsContext = () => useContext(ActivityActionsContext);

type ActivityContextProviderProps = {
    children: ReactNode;
};

const ActivityContextProvider: React.FC<ActivityContextProviderProps> = ({
    children,
}) => {
    const infoViewActionsContext = useInfoViewActionsContext();
    const [{ apiData: activitiesPage, loading }, { setQueryParams, fetch }] = useGetSearchActivities()

    const [filtter, setFiltter] = useState<Filtter>({ end: "", start: "" } as Filtter);
    const [page, setPage] = useState<number>(0);
    const [search, setSearchQuery] = useState('');
    const [openActivityReportModal, setOpenActivityReportModal] = useState<boolean>(false);


    useEffect(() => {
    }, []);
    const onChangePage = (page: number) => {
        setPage(page);
    };
    const reload = () => {
        fetch();
    }
    useEffect(() => {
        reloadData();
    }, [search, page, filtter.end, filtter.start]);

    const reloadData = () => {
        const realPage = page - 1;
        setQueryParams({
            search,
            page: realPage,
            start: filtter.start,
            end: filtter.end
        });

    };
    const onSearchList = (e: any) => {
        setSearchQuery(e.target.value);
        setPage(0);
    };
    const onSelectToView = (activity: GetActivityDto) => {

    };



    return (
        <ActivityContext.Provider
            value={{
                activitiesPage: activitiesPage,
                loading: loading,
                filtter: filtter,
                page: page,
                search: search,
                openActivityReportModal: openActivityReportModal
            }}
        >
            <ActivityActionsContext.Provider
                value={{
                    onView: onSelectToView,
                    reload: reload,
                    onSearch: onSearchList,
                    onChangePage: onChangePage,
                    setFiltter: setFiltter,
                    setOpenActivityReportModal: setOpenActivityReportModal

                }}
            >
                {children}
            </ActivityActionsContext.Provider>
        </ActivityContext.Provider>
    );
};

export default ActivityContextProvider;
