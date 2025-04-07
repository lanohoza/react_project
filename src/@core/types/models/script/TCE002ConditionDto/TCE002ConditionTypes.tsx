import { DiagnosticType } from '@core/types/enums/DiagnosticType';
import { TCE002ConditionOperate } from '@core/types/enums/TCE002ConditionOperate';

export type TCE002ConditionDto = {
  id: number | null;
  average: number;
  averageMax: number;
  operate: TCE002ConditionOperate;
  idShedSetting: number;
  target: DiagnosticType;
  subjectIds: number[];
  idLevel:number;

};

export type TCE002ConditionToDisplayDto = {
  id: number | null;
  average: number;
  averageMax: number;
  operate: TCE002ConditionOperate;
  idShedSetting: number;
  idShedSettingCategory: number;
  shedSetting: string;
  target: DiagnosticType;
  subjectIds: number[];
  idLevel:number;
  subjectTitle: string[];
};