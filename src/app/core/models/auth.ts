import { IUser } from './user';

export interface ICredentials {
  username: string;
  password: string;
}

export interface ISession {
  token: string;
  user: IUser;
  message?: string;
}
