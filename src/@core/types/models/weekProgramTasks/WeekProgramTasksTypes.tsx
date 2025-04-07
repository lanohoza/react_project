import { TechnicalCardYearDto } from "../technicalCards/TechnicalCardTypes";

// Enums
export enum DaysOfWeek {
  Sunday = "Sunday",
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  // Friday = "Friday",
  // Saturday = "Saturday",
}

export const arabicDaysMap = {
  [DaysOfWeek.Sunday]: "الأحد",
  [DaysOfWeek.Monday]: "الاثنين",
  [DaysOfWeek.Tuesday]: "الثلاثاء",
  [DaysOfWeek.Wednesday]: "الأربعاء",
  [DaysOfWeek.Thursday]: "الخميس",
  // [DaysOfWeek.Friday]: "الجمعة",
  // [DaysOfWeek.Saturday]: "السبت",
};

export enum Period {
  Morning = "Morning",
  Evening = "Evening",
}

export const arabicPeriodMap = {
  [Period.Morning]: "الصباحية",
  [Period.Evening]: "المسائية",
};


// DTO Type
export type AddEditWeekProgramTaskDto = {
  id?: number;
  days: DaysOfWeek;
  period: Period;
  descrption: string;
  idWeekProgram?: number | null;
  idTask: number;
  titleTask: string;
  selected: boolean;
};

// DTO Type
export type AddEditWeekProgramTaskDtoToDisplay = {
  id?: number;
  days: DaysOfWeek;
  period: Period;
  descrption: string;
  idWeekProgram?: number | null;
  titleTask: string;
  selected: boolean;
};

export type AddEditWeekProgramTaskDtoToDocument = {
  id?: number;
  days: DaysOfWeek;
  period: Period;
  descrption: string;
  idWeekProgram?: number | null;
  titleTask: string;
  selected: boolean;
};