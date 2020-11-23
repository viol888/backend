import { IBaseDocument } from '.';
import { IMongooseContact } from './mongooseContact';

export interface IMongooseInformation extends IBaseDocument {
  fio: string;
  stayDateStart: string;
  stayDateEnd: string;
  department: string;
  contactList: IMongooseContact[];
}
