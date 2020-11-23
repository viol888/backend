import { IBaseEntity } from '..';

export interface IUser extends IBaseEntity {
  userName: string;
  passwordHash: string;
};

export type IUserFilter = Partial<IUser>;
