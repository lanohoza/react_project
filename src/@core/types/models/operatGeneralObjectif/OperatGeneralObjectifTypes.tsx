import { GeneralObjective } from "../generalObjective/GeneralObjectiveTypes";
import { OperatObjectif } from "../operatObjectif/OperatObjectifTypes";

export type OperatGeneralObjectif = {
    id?: number;
    generalObjective: GeneralObjective;
    operatObjectif: OperatObjectif;
  };