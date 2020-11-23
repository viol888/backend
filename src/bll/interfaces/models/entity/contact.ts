import { ObjectId } from 'mongodb';
import { IBaseEntity, IInformation } from '..';

export interface IContact extends IBaseEntity {
  info: string;
  fio: string;
  birthDay: string;
  infoId: string;
};

export type IContactFilter = Partial<IContact>;
