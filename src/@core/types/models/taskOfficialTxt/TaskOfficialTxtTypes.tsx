import { OfficialTxt } from "../officialTxt/OfficialTxtTypes";
import { TechnicalCard } from "../technicalCards/TechnicalCardTypes";

export type TaskOfficialTxt = {
    id?: number;
    technicalCard: TechnicalCard;
    officialTxt: OfficialTxt;
  }
  