import { User } from "../user/UserTypes";

export type UserLogInResponse = {
    token: string;
    type: string;
    user: User;
  }