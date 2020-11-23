import { IBaseDocument, IMongooseInformation } from '.';

export interface IMongooseContact extends IBaseDocument {
  fio: string;
  birthDay: string;
  info: IMongooseInformation;
}
