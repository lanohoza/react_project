import { HumanTool } from "../humanTool/HumanToolTypes";
import { TechnicalCard } from "../technicalCards/TechnicalCardTypes";


export type HumanToolsTask = {
  id?: number;
  humanTool: HumanTool;
  technicalCard: TechnicalCard;
}
