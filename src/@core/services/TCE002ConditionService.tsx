import { TCE002ConditionDto, TCE002ConditionToDisplayDto } from '@core/types/models/script/TCE002ConditionDto/TCE002ConditionTypes';
import { InfoViewActions } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { deleteDataApi, getDataApi, postDataApi, putDataApi, useGetDataApi } from '@crema/hooks/APIHooks';
import { environment } from '../../envirenement/environnement';
import { Page } from '@core/types/models/core/models';

const API_URL = `${environment._API}api/v1/tce002-conditions`;


export const getAllTCE002Conditions = (
    infoViewActionsContext: InfoViewActions
): Promise<TCE002ConditionDto[]> => {
    return getDataApi<TCE002ConditionDto[]>(`${API_URL}/all`, infoViewActionsContext);
};


export const getTCE002ConditionById = async (
    id: number,
    infoViewActionsContext: InfoViewActions
): Promise<TCE002ConditionToDisplayDto | null> => {
    return getDataApi<TCE002ConditionToDisplayDto>(`${API_URL}/findById/${id}`, infoViewActionsContext);
};


export const createTCE002Condition = async (
    dto: TCE002ConditionDto,
    infoViewActionsContext: InfoViewActions,
    reCallAPI?: () => void
): Promise<void> => {
    return postDataApi(`${API_URL}/create`, infoViewActionsContext, dto)
        .then(() => {
            if (reCallAPI) {
                reCallAPI();
            }
        })
        .catch((error) => {
            infoViewActionsContext.fetchError("حدثت مشكلة , يرجى إعادة المحاولة لاحقا");
        });
};


export const updateTCE002Condition = async (
    id: number,
    dto: TCE002ConditionDto,
    infoViewActionsContext: InfoViewActions,
    reCallAPI?: () => void
): Promise<void> => {
    return putDataApi(`${API_URL}/update/${id}`, infoViewActionsContext, dto)
        .then(() => {
            if (reCallAPI) {
                reCallAPI();
            }
        })
        .catch((error) => {
            infoViewActionsContext.fetchError("حدثت مشكلة , يرجى إعادة المحاولة لاحقا");
        });
};


export const deleteTCE002Condition = async (
    id: number,
    infoViewActionsContext: InfoViewActions,
    reCallAPI?: () => void
): Promise<void> => {
    return deleteDataApi(`${API_URL}/delete/${id}`, infoViewActionsContext)
        .then(() => {
            if (reCallAPI) {
                reCallAPI();
            }
        })
        .catch((error) => {
            infoViewActionsContext.fetchError("حدثت مشكلة , يرجى إعادة المحاولة لاحقا");
        });
};

export const useGetAllTCE002Condition = () => {
    return useGetDataApi<Page<TCE002ConditionToDisplayDto>>(
        `${API_URL}/search`,
        {} as Page<TCE002ConditionToDisplayDto>,
    );
};