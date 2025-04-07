import { SourceTechnicalCard } from '@core/types/enums/SourceTechnicalCard';
import { User } from '../user/UserTypes';

export type GeneralObjective = {
  id?: number;
  content: string;
  source:SourceTechnicalCard,
  createdBy?: User;
};
