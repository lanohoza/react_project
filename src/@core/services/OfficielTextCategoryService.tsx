import axios from '@crema/services/axios/index';
import { environment } from '../../envirenement/environnement';
import { InfoViewActions, useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { PopUp } from '@core/types/models/popup/PopUpTypes';
import { Page } from '@core/types/models/core/models';
import { deleteDataApi, getDataApi, postDataApi, useGetDataApi } from '@crema/hooks/APIHooks';
import jwtAxios from '@crema/services/auth/jwt-auth/index';
import { OfficielTextCategory } from '@core/types/models/officielTextCategory/OfficielTextCategoryTypes';

const API_URL = `${environment._API}api/v1/official-txts-category`;

// Get all PopUps
export const getAllOfficielTextCategory = async (infoViewActionsContext: InfoViewActions): Promise<OfficielTextCategory[]> => {

  return getDataApi<OfficielTextCategory[]>(`${API_URL}/all`, infoViewActionsContext)

};