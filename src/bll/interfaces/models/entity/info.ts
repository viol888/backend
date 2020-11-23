import { IBaseEntity } from './baseEntity';
import { IContact } from './contact';

export interface IInformation extends IBaseEntity {
  fio: string;
  stayDateStart: string;
  stayDateEnd: string;
  department: string;
  contactList: IContact[];
};

export type IInformationFilter = Partial<IInformation>;
