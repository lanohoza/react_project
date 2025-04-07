export type Interview = {
  idShedCategory(arg0: string, idShedCategory: any): unknown;
  id: number;
  type: InterviewType;
  status: InterviewStatus;
  idsSudents;
  idTask;
  idDifficulties;
  idSolutions;
  interviewDate;
  resourceUrl;
  number: number;
  createdDate: string;
  target: string;
  taskTitle: string;
  shedSettings: string[];
  shedCategory: string;
  description: string;
  followupNumber: number;
  idFollowUp: number;
  createType: InterViewCreateType;
  studentDtos:[];
  yearTitle:string
};

export enum InterviewStatus {
  todo = 'todo',
  in_progress = 'in_progress',
  done = 'done',
}
export enum InterViewCreateType {
  automatic = 'automatic',
  manual = 'manual',
}

export enum InterviewType {
  group = 'group',
  single = 'single',
}

export type GetInterviewDto = {
  id: number;
  type: InterviewType;
  status: InterviewStatus;
  idsSudents;
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
};

export type DoInterviewDto = {
  idInterview: number;
  interviewDate: string;
};

export type InterviewReportDto = {
  wilayaName: string;
  userName: string;
  establishmentName: string;
  yearTitle: string;
  interviewByDateDtos: GetInterviewDto[];
};
