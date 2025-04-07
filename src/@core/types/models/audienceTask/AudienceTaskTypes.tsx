import { Audience } from "../audience/AudienceTypes";
import { TechnicalCard } from "../technicalCards/TechnicalCardTypes";

export type AudienceTask = {
    id?: number;
    technicalCard?: TechnicalCard;
    audience: Audience;
}