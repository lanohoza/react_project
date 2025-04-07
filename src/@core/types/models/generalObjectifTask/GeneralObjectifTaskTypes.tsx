import { GeneralObjective } from "../generalObjective/GeneralObjectiveTypes";
import { TechnicalCard } from "../technicalCards/TechnicalCardTypes";

export type GeneralObjectifTask = {
  id?: number;
  generalObjective: GeneralObjective;
  technicalCard?: TechnicalCard;
}
