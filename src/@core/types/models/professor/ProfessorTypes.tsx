import { BreakDto } from "../classe/ClasseTypes";
import { ProfessorClassesDto } from "../professorClasses/professorClassesTypes";

export type Professor = {
  id: number;
  firstName: number;
  lastName: number;
  phoneNumber: number;
  email: number;
  coordinator:boolean;
  breaks: BreakDto[];
  classes: number[];
};
