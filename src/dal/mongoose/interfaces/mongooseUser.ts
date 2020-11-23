import { IBaseDocument } from '.';

export interface IMongooseUser extends IBaseDocument {
  userName: string;
  passwordHash: string;
}
