import { Commune } from "../commune/CommuneTypes";
import { Establishment } from "../etablissement/EstablishmentTypes";

export type User = {
  id?: number;
  firstName: string;
  lastName: string;
  username: string;
  image?: string;
  addresse: string;
  email: string;
  faxNumber?: string;
  phoneNumber: string;
  webSite?: string;
  password: string;
  idCommune: Commune;
  code?: number;
  idEstablishment: Establishment;
  active: boolean;
  userAttestationPath?: string;
}
