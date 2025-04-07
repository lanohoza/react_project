import { TypeEstablishmentEmployees } from "@core/types/enums/TypeEstablishmentEmployees";

export type EstablishmentEmployees = {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    type: TypeEstablishmentEmployees;
    idCreatedBy: number;
}