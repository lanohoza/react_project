import { SourceTechnicalCard } from "@core/types/enums/SourceTechnicalCard";
import { User } from "../user/UserTypes";

export type HumanTool = {
    id?: number;
    firstName: string;
    lastName: string;
    adresse: string;
    createdBy?: number;
    source:SourceTechnicalCard;
  }