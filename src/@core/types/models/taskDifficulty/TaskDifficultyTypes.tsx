import { Difficulty } from "../difficulty/DifficultyTypes";
import { OfficialTxt } from "../officialTxt/OfficialTxtTypes";
import { TechnicalCard } from "../technicalCards/TechnicalCardTypes";

export type TaskDifficulty = {
    id?: number;
    difficulty:Difficulty;
    technicalCard?: TechnicalCard;
  }
  