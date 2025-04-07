import { Commune } from "../commune/CommuneTypes";

export type Trimestre = {
  id: number;
  idScolarYear: number;
  start: string;
  end: string;
  type: TrimestreType
  number: number;
  title: string;
}

export enum TrimestreType {
  first, second, bem, bac, third, diagnostic
}