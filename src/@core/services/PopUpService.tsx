import axios from '@crema/services/axios/index';
import { environment } from '../../envirenement/environnement';
import { InfoViewActions, useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { PopUp } from '@core/types/models/popup/PopUpTypes';
import { Page } from '@core/types/models/core/models';
import { deleteDataApi, getDataApi, postDataApi, useGetDataApi } from '@crema/hooks/APIHooks';
import jwtAxios from '@crema/services/auth/jwt-auth/index';

const API_URL = `${environment._API}api/v1/pop-ups`;

// Get all PopUps
export const useGetAllPopUps = () => {
    return useGetDataApi<Page<PopUp>>(
        `${API_URL}/popups`,
        {} as Page<PopUp>,
    );
};

// Get a PopUp by ID
export const getPopUpById = (id: number, infoViewActionsContext: InfoViewActions): Promise<PopUp | null> => {
    return jwtAxios
        .get(`${API_URL}/findById/${id}`)
        .then((response) => response.data)
        .catch((error) => {
            infoViewActionsContext.fetchError("حدثت مشكلة , يرجى إعادة المحاولة لاحقا");
            throw error;
        });
};

// Create a new PopUp
export const createPopUp = async (
    popUp: PopUp,
    file: File | null,
): Promise<PopUp> => {
    const formData = new FormData();

    formData.append('popUp', new Blob([JSON.stringify(popUp)], { type: 'application/json' }));

    if (file) {
        formData.append('file', file);
    }

    const response = await jwtAxios.post(`${API_URL}/create`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};


// Update an existing PopUp
export const updatePopUp = (
    id: number,
    popUp: PopUp,
    infoViewActionsContext: InfoViewActions,
    reCallAPI?: () => void
): void => {
    jwtAxios
        .put(`${API_URL}/update/${id}`, popUp)
        .then(() => {
            infoViewActionsContext.showMessage("PopUp updated successfully.");
            if (reCallAPI) reCallAPI();
        })
        .catch((error) => {
            infoViewActionsContext.fetchError("حدثت مشكلة , يرجى إعادة المحاولة لاحقا");
            throw error;
        });
};

// Delete a PopUp
export const deletePopUp = async (id: number, infoViewActionsContext: InfoViewActions, reCallAPI?: () => void): Promise<void> => {
    deleteDataApi(`${API_URL}/delete/${id}`, infoViewActionsContext).then(() => {
        if (reCallAPI) {
            reCallAPI();
        }
    })
        .catch((error) => {
            infoViewActionsContext.fetchError("حدثت مشكلة , يرجى إعادة المحاولة لاحقا");
        });
};

export const publish = async (id: number, publish: boolean, infoViewContext: InfoViewActions): Promise<boolean> => {
    return getDataApi(`${API_URL}/publish/${id}/${publish}`, infoViewContext);
};

export const getPublishedPopUpForNotification = async (infoViewContext: InfoViewActions): Promise<PopUp | null> => {
    return getDataApi(`${API_URL}/getPublishedPopUpForNotification`, infoViewContext);
};