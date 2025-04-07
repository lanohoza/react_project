// ShedSettingService.ts

import { ShedSettingDto, ShedSettingMenuDto, ShedSettingToDisplayDto } from '@core/types/models/shedSetting/ShedSettingTypes';
import { InfoViewActions } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { deleteDataApi, getDataApi, postDataApi, putDataApi, trimObjectValues, useGetDataApi } from '@crema/hooks/APIHooks';
import { environment } from '../../envirenement/environnement';
import { Page } from '@core/types/models/core/models';
import { DiagnosticType } from '@core/types/enums/DiagnosticType';
import { sanitizeData } from '@crema/helpers/ApiHelper';

const API_URL = `${environment._API}api/v1/shed-settings`;


export const useGetAllShedSettings = () => {
    return useGetDataApi<Page<ShedSettingDto>>(
        `${API_URL}/all`,
        {} as Page<ShedSettingDto>,
    );
};

/**
 * Get a Shed Setting by ID.
 */
export const getShedSettingById = async (
    id: number,
    infoViewActionsContext: InfoViewActions
): Promise<ShedSettingDto | null> => {
    return getDataApi<ShedSettingDto>(`${API_URL}/findById/${id}`, infoViewActionsContext);
};

export const createShedSetting = async (
    shedSetting: ShedSettingDto,
    infoViewActionsContext: InfoViewActions,
    reCallAPI?: () => void
): Promise<void> => {
    postDataApi(`${API_URL}/create`, infoViewActionsContext, shedSetting)
        .then(() => {
            if (reCallAPI) {
                reCallAPI();
            }
        })
        .catch((error) => {
            infoViewActionsContext.fetchError("حدثت مشكلة , يرجى إعادة المحاولة لاحقا");
        });
};

/**
 * Update an existing Shed Setting.
 */
export const updateShedSetting = async (
    id: number,
    shedSetting: ShedSettingDto,
    infoViewActionsContext: InfoViewActions,
    reCallAPI?: () => void
): Promise<void> => {
    putDataApi(`${API_URL}/update/${id}`, infoViewActionsContext, shedSetting)
        .then(() => {
            if (reCallAPI) {
                reCallAPI();
            }
        })
        .catch((error) => {
            infoViewActionsContext.fetchError("حدثت مشكلة , يرجى إعادة المحاولة لاحقا");
        });
};

/**
 * Delete a Shed Setting.
 */
export const deleteShedSetting = async (
    id: number,
    infoViewActionsContext: InfoViewActions,
    reCallAPI?: () => void
): Promise<void> => {
    deleteDataApi(`${API_URL}/delete/${id}`, infoViewActionsContext)
        .then(() => {
            if (reCallAPI) {
                reCallAPI();
            }
        })
        .catch((error) => {
            infoViewActionsContext.fetchError("حدثت مشكلة , يرجى إعادة المحاولة لاحقا");
        });
};

export const useGetAllShedSetting = () => {
    return useGetDataApi<Page<ShedSettingToDisplayDto>>(
        `${API_URL}/search`,
        {} as Page<ShedSettingToDisplayDto>,
    );
};

export const getAllShedSettingsByFilter = (
    params: any,
    infoViewActionsContext: InfoViewActions
): Promise<ShedSettingMenuDto[]> => {
    return getDataApi<ShedSettingMenuDto[]>(
        `${API_URL}/allFilter`, infoViewActionsContext, params,
    );
};
export const getAllShedSettingsForTce002Condition = (
    target: DiagnosticType,
    idShedCategory: number,
    infoViewActionsContext: InfoViewActions
): Promise<ShedSettingMenuDto[]> => {
    return getDataApi<ShedSettingMenuDto[]>(
        `${API_URL}/allByTargetAndCategory?target=${target}&idShedCategory=${idShedCategory}`,
        infoViewActionsContext
    );
};


export const getAllShedSettingsByCategory= (
    idShedCategory: number,
    infoViewActionsContext: InfoViewActions
): Promise<ShedSettingMenuDto[]> => {
    return getDataApi<ShedSettingMenuDto[]>(
        `${API_URL}/allByCategory/${idShedCategory}`, infoViewActionsContext,
    );
};

export const getAllShedSettingsByInterview= (
    idInterview: number,
    infoViewActionsContext: InfoViewActions
): Promise<ShedSettingMenuDto[]> => {
    return getDataApi<ShedSettingMenuDto[]>(
        `${API_URL}/getByInterview/${idInterview}`, infoViewActionsContext,
    );
};
export const getAllShedSettingsByFollowUp= (
    idFollowUp: number,
    infoViewActionsContext: InfoViewActions
): Promise<ShedSettingMenuDto[]> => {
    return getDataApi<ShedSettingMenuDto[]>(
        `${API_URL}/getByFollowUp/${idFollowUp}`, infoViewActionsContext,
    );
};