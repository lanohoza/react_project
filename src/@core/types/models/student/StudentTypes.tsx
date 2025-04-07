
export interface Student {
  id: number | null;
  nbrRakmana: string;
  codeStudent: string;
  firstName: string;
  lastName: string;
  sexe: string;
  birthDate: string; // ISO format string
  placeBirth: string;
  schoolingSystem: string;
  idClasse: number | null;
  repeatClasseActual: boolean;
  nbrRepeatClasse: number | null;
  fatherProfession: string;
  motherProfession: string;
  tutorName: string;
  tutorMobPhone: string;
  tutorEmail: string;
  dateStudentInscription: string; // ISO format string
  healthProblem: string;
  isMotherOrphan: boolean;
  isFatherOrphan: boolean;
  isNeed: boolean;
  isDisease: boolean;
  isMain: boolean;
  classeTitle: string;

  idStudentClasse:number
}

export interface GetStudentDto {
  id: number | null;
  nbrRakmana: string;
  codeStudent: string;
  firstName: string;
  lastName: string;
  sexe: string;
  birthDate: string; // ISO format string
  placeBirth: string;
  schoolingSystem: string;
  classeTitle: string;
  idClasse: number | null;
  repeatClasseActual: boolean;
  nbrRepeatClasse: number | null;
  fatherProfession: string;
  motherProfession: string;
  tutorName: string;
  tutorMobPhone: string;
  tutorEmail: string;
  dateStudentInscription: string; // ISO format string
  healthProblem: string;
  isMotherOrphan: boolean;
  isFatherOrphan: boolean;
  isNeed: boolean;
  isDisease: boolean;
  isMain: boolean;

}

export interface StudentNoteDto {

  id: number | null;
  nbrRakmana: string;
  codeStudent: string;
  firstName: string;
  lastName: string;
  sexe: string;
  birthDate: string; // ISO format string
  reserveStatus: string;
}

export interface StudentDesireDto {

  id: number | null;
  nbrRakmana: string;
  codeStudent: string;
  firstName: string;
  lastName: string;
  sexe: string;
  birthDate: string; // ISO format string
  reserveStatus: string;
  guidanceSpecialities: {}
}
export enum ReserveStatus {
  reserved = "محجوز", unreserved = "لم يحجز"
}
