import axios from '@crema/services/axios/index';
import { environment } from '../../envirenement/environnement';
import { getDataApi, postDataApi, putDataApi, useGetDataApi } from '@crema/hooks/APIHooks';
import { InfoViewActions } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { GuidanceSpeciality } from '@core/types/models/guidanceSpeciality/GuidanceSpecialityTypes';
import { TypeEstablishment } from '@core/types/enums/TypeEtablissement';

const API_URL = `${environment._API}api/v1/guidance_specialitie`;


export const getGuidanceSpecialitiesByClass = (selectedIdClasse,infoViewContext: InfoViewActions,
): Promise<GuidanceSpeciality[]> => {
  return getDataApi<GuidanceSpeciality[]>(`${API_URL}/classe/${selectedIdClasse}`, infoViewContext);

};



export const getAdminGuidanceSpecialitiesByEstablishmentType = (type: TypeEstablishment, infoViewContext: InfoViewActions,
): Promise<GuidanceSpeciality[]> => {
  return getDataApi<GuidanceSpeciality[]>(`${API_URL}/admin/establishment_type/${type}`, infoViewContext);

};