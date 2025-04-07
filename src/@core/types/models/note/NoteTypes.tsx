
export interface Note {
  results: ResultDto[];
  average: AverageDto;
  idStudent: number;
  idTrimestre: number;
}
export interface ResultDto {
  id: number;
  value: number;
  idSubjectLevel: number;
}

export interface AverageDto {
  id: number;
  value: number;
}
export interface GetNoteDto {
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
}
