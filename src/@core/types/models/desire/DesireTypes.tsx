
export interface Desire {
    average: AverageDto;
    idStudent: number;
    idTrimestre: number;
    id:number
  }
  export interface AddEditDesireDto {
    order: number;
    idGuidanceSpeciality: number;
    idStudent: number;
  }
  
  export interface AverageDto {
    id: number;
    value: number;
  }
  export interface GetDesireDto {
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
  