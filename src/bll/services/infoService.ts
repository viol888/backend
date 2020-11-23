import { IMongooseInformation } from '../../dal/mongoose/interfaces';
import { InformationModel } from '../../dal/mongoose/models';
import { InfoRepository } from '../../dal/repositories/infoRepository';
import { IInformation, IInformationFilter } from '../interfaces/models';
import { CrudService } from './crudService';

export class InfoService extends CrudService<IInformation, IMongooseInformation, IInformationFilter> {
  constructor() {
    super(InformationModel, new InfoRepository());
  }  
}
