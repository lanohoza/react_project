export type Followup = {
    idShedCategory: number;
    shedCategory: string;
    shedSettings: string[];

    id: number;
    type: FollowupType;
    status: FollowupStatus;
    idSudents;
    idTask;
    idDifficulties;
    idSolutions;
    resourceUrl;
    number: number;
    createDate: string;
    target: string;
    taskTitle: string;
    difficulties: string[];
    solutions: string[];
    description: string;
    idStudent: number;
    idGuidanceGroup: number;
    createType: FollowupCreateType;
    studentDtos;
}

export enum FollowupStatus {
    todo="todo", in_progress="in_progress", done="done"

}
export enum FollowupCreateType {
    automatic = "automatic", manual = "manual"

}

export enum FollowupType {
    group = "group", single = "single"

}

export type GetFollowupDto = {

    id: number;
    type: FollowupType;
    status: FollowupStatus;
    idSudents;
    idTask;
    idDifficulties;
    idSolutions;
    resourceUrl;
    number: number;
    createDate: string;
    target: string;
    taskTitle: string;
    difficulties: string[];
    solutions: string[];
    description: string;
}


export type FollowupReportDto = {
    wilayaName: string;
    userName: string;
    establishmentName: string;
    yearTitle: string;
    flowupByDateDtos: GetFollowupDto[];
}