import { TypeEstablishment } from "@core/types/enums/TypeEtablissement";

export type GeneralStatisticsDto = {
  wilayaName: string;
  userName: string;
  establishmentName: string;
  yearTitle: string;
  type: TypeEstablishment;
  globalData: GlobalData;
  specialties: SpecialtyData[];
  classesData: ClassesData[];
};
/*export type TmsReportDto = {
  wilayaName: string;
  userName: string;
  establishmentName: string;
  yearTitle: string;
  type: TypeEstablishment;
  globalData: GlobalData;
  specialties: SpecialtyData[];
  classesData: ClassesData[];
};
export type ClassesData = {
  title: string;
  numberOfStudents: number;
};
export type SpecialtyData = {
  title: string;
  numberOfClass: number;
  numberOfStudents: number;
};

export type GlobalData = {
  firstNumberOfClass: number;
  secondNumberOfClass: number;
  thirdNumberOfClass: number;
  firstNumberOfStudent: number;
  secondNumberOfStudent: number;
  thirdNumberOfStudent: number;
  fourthNumberOfStudent: number;
  fourthNumberOfClass: number;
};*/

export type StudentsBreaksDto = {
  wilayaName: string;
  userName: string;
  establishmentName: string;
  yearTitle: string;
  classBreakDays: ClassBreakDay[];
};

export type ClassBreakDay = {
  title: string;
  sunday: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
};

export type StudentsDiseasesDto = {
  wilayaName: string;
  userName: string;
  establishmentName: string;
  yearTitle: string;
  diseasesStudents: DiseasesStudent[];
};

export type DiseasesStudent = {
  fullName: string;
  classTitle: string;
};



export type StudentsNeedsDto = {
  wilayaName: string;
  userName: string;
  establishmentName: string;
  yearTitle: string;
  students: Students[];
};

export type Students = {
  fullName: string;
  classTitle: string;
};
export type StudentsMainsDto = {
  wilayaName: string;
  userName: string;
  establishmentName: string;
  yearTitle: string;
  students: Students[];
};


export type ProfessorsBreaksDto = {
  wilayaName: string;
  userName: string;
  establishmentName: string;
  yearTitle: string;
  breakDays: BreakDay[];
};

export type BreakDay = {
  title: string;
  sunday: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
};