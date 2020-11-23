import { IBaseDocument } from '.';

export interface IMongooseWorker extends IBaseDocument {
  fio: string;
  positiveResultDate: string;
  position: string;
}
