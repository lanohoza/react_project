export type AddEditWeekProgramDto = {
    id: number;
    startWeek: string;
    endWeek: string;
    urlDoc?: string;
    type: TypeWeekProgram;
    idMonth: number;
    weekNumber:number;
};

export enum TypeWeekProgram {
    AUTO = 'auto',
    CUSTOM = 'custom',
  }