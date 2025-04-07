import { TechnicalCardType } from '@core/types/enums/TypeTcTask';
import { TechnicalCardCategory } from '../TechnicalCardCategory/TechnicalCardCategoryTypes';
import { SourceTechnicalCard } from '@core/types/enums/SourceTechnicalCard';
import { TypeEstablishment } from '@core/types/enums/TypeEtablissement';


export type TechnicalCard = {
  id: number;
  code: number;
  idTcCategory: number;
  type: TechnicalCardType;
  title: string;
  materielToots: string;
  feedback: string;
  createDate: string;
  runMonth: number;
  runWeek: number;
  generalObjectiveIds: number[];
  audienceIds: number[];
  humanToolIds: number[];
  officialTxtIds: number[];
  difficultyIds: number[];
  defaultTc:boolean;
  typeEstablishment:TypeEstablishment;
};
export type TechnicalCardYearDto = {
  id: number;
  idTcCategory: number;
  type: TechnicalCardType;
  title: string;
  materielToots: string;
  feedback: string;
  createDate: string;
  runMonth: number;
  runWeek: number;
  idTask: number;
  statusTask: string;
  idYear: number;
  createdDateTask: string;
  lastModifiedDateTask: string;
  descriptionTask: string;
  defaultTc:boolean;
  source:SourceTechnicalCard;
}