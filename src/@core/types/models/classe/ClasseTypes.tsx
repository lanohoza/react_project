
export type Classe = {
  id: number;
  idLevel: number;
  idSpeciality: number;
  title: string;
  number: number;
  idYear: number;
  breaks: BreakDto[]

}

export type GetClasseDto = {
  id: number;
  levelName: number;
  specialityName: number;
  title: string;
  number: number;
  idLevel: number;
  idSpeciality: number;
  idYear: number;
  breaks: BreakDto[]

}

export type BreakDto = {
  id: number
  key: number
  endHour: string;
  startHour: string;
  breakDay: string;
}