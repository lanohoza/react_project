import { RegimeEstablishment } from '@core/types/enums/RegimeEtablissement';
import { TypeEstablishment } from '@core/types/enums/TypeEtablissement';
import { Commune } from '../commune/CommuneTypes';

export type Establishment = {
  id: number;
  name: string;
  faxNumber?: string;
  adresse: string;
  idCommune: Commune;
  mobileNumber?: string;
  nameAdministrator?: string;
  facebook?: string;
  youtube?: string;
  regime: RegimeEstablishment;
  type: TypeEstablishment;
}
