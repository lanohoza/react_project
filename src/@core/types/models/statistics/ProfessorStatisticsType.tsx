import { TypeEstablishment } from "@core/types/enums/TypeEtablissement";




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

export type ProfessorsCoordinatorsDto = {
  wilayaName: string;
  userName: string;
  establishmentName: string;
  yearTitle: string;
  professors: ProfessorCoordinator[];
};
export type ProfessorCoordinator = {
  fullName: string;
  subjectTitle: string;
};

export type ProfessorsMainsDto = {
  wilayaName: string;
  userName: string;
  establishmentName: string;
  yearTitle: string;
  professors: ProfessorMain[];
};
export type ProfessorMain = {
  fullName: string;
  classeTitle: string;
  subjectTitle:String
};