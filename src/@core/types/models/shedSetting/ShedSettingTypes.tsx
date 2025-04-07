import { DiagnosticType } from "@core/types/enums/DiagnosticType";

export type ShedSettingDto = {
    id: number | null;
    idShedCategory: number;
    target: DiagnosticType;
    reference: string;
    syndromeDiagnostic: string;
    number?: number;
    supportCounselors: number[];
    supportStudents: number[];
    requiredProcedures: number[];
    directionSheds: number[];
    idSpeciality: number;
    groupName: string;
    hasGroup: boolean;
}

export type ShedSettingToDisplayDto = {
    id: number | null;
    shedCategory: string;
    target: DiagnosticType;
    reference: string;
    syndromeDiagnostic: string;
    number: number | null;
    supportCounselors: number[];
    supportStudents: number[];
    requiredProcedures: number[];
    directionSheds: number[];
}

export type ShedSettingMenuDto = {
    id: number | null;
    syndromeDiagnostic: string;
}

