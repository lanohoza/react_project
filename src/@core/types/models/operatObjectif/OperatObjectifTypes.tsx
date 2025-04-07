import { User } from '../user/UserTypes';

export type OperatObjectif = {
  id?: number;
  content: string;
  createdBy?: User;
};
