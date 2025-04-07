import { TypeEstablishment } from "@core/types/enums/TypeEtablissement";

export type TmsReportDto = {
    wilayaName: string;
    userName: string;
    establishmentName: string;
    yearTitle: string;
    type: TypeEstablishment;
    globalData: TmsReportDtoGlobalData;
    specialties: TmsReportDtoSpecialtyData[];
    classesData: TmsReportDtoClassesData[];
    tasks: TmsReportDtoTaskReportDto[];


}
export type TmsReportDtoTaskReportDto = {
    title: string;
    date: String;
}


export type TmsReportDtoClassesData = {
    title: string;
    numberOfStudents: string;
}

export type TmsReportDtoSpecialtyData = {
    title: string;
    numberOfClass: string;
    numberOfStudents: string;
}

export type TmsReportDtoGlobalData = {
    firstNumberOfClass: string;
    secondNumberOfClass: string;
    thirdNumberOfClass: string;
    firstNumberOfStudent: string;
    secondNumberOfStudent: string;
    thirdNumberOfStudent: string;
    fourthNumberOfStudent: string;
    fourthNumberOfClass: string;
}