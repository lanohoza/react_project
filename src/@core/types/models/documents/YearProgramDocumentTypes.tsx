import TechnicalCardDocument from '@core/Documents/TechnicalCard';

export type CurrentYearProgramDto = {

    wilayaName: string;
    userName: string;
    establishmentName: string;
    yearTitle: string;


    tasks: CurrentYearProgramTaskDto[];


}
export type CurrentYearProgramTaskDto = {


    month: string;

    week: string;
    taskTitle: string;
    generalObjectsTitles: IdValueDto[];

}
export type IdValueDto = {

    id: number;
    value: string;
}



export type TechnicalCardDocumentDto = {
    code: string;
    wilayaName: string;
    userName: string;
    establishmentName: string;
    yearTitle: string;
    title: string;
    type: string;
    category: string;
    audiences: string[];
    materielToots: string;
    actionTitles: string[];
    humanTools: string[];
    generalObjectsTitles: string[];
    operateObjectsTitles: string[];
    difficulties: string[];
    officialTxts: TechnicalCardDocumentDtoOfficialTxtDto[];
    trimestreTitle: string;
    monthTitle: string;
    weekTitle: string;
    feedback: string;
}
export type TechnicalCardDocumentDtoOfficialTxtDto = {
    id: number;
    number: string;
    title: string;
    date: string;
}