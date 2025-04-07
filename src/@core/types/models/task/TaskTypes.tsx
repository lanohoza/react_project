import { TechnicalCard } from '../technicalCards/TechnicalCardTypes';
import { Year } from '../year/YearTypes';

export type Task = {
  id: number;
  status: TaskStatus;
  scolarYear: Year;
  technicalCard: TechnicalCard;
  start: string;
  end: string;
  description?: string;
};

export enum TaskStatus {
  finish = 'finish',
  todo = 'todo',
  in_progress = 'in_progress',
  en_pause = 'en_pause',
  canceled = 'canceled',
  not_completed = 'not_completed',
  pending = 'pending'
};
export interface TaskWithActionsDto {
  id: number;
  category: string;
  type: string;
  title: string;
  code: string;
  runMonth: number;
  runWeek: number;
  statusTask: TaskStatus;
  status: TaskStatus;
  createdDate: string; // Typically use ISO string for dates in TypeScript
  lastModifiedDate: string;
  yearTitle: string;
  actions: ActionTaskDto[];
}
export interface ActionTaskDto {
  id: number;
  status: ActionStatus;
  params: any; // Adjust this according to the type of params
  actionId: number;
  title: string;
  resultType: ActionResultType;
  resultValue: string;
  description: string;
}
export enum ActionStatus {
  finish = "finish", todo = "todo", in_progress = "in_progress"
}
export enum ActionResultType {
  file = 'file', url = 'url', page = "page",script="script"

}