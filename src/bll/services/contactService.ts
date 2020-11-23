import { ObjectId } from 'mongodb';
import { IMongooseContact } from '../../dal/mongoose/interfaces';
import { ContactModel, InformationModel } from '../../dal/mongoose/models';
import { InfoRepository } from '../../dal/repositories/infoRepository';
import { HttpStatuses } from '../enums';
import { IContact, IContactFilter } from '../interfaces/models';
import { ServiceError, ServiceResult } from '../models';
import { MongooseMapper } from '../utils';
import { CrudService } from './crudService';

export class ContactService extends CrudService<IContact, IMongooseContact, IContactFilter> {
  constructor() {
    super(ContactModel);
  }

  public async add(data: IContact) {
    try {
      const entity = MongooseMapper.mapViewEntity<IContact, IMongooseContact>(data, ContactModel);
      const result = await this._repository.addAsync(entity);
      const info = await InformationModel.findById(new ObjectId(data.info));
      if (info) {
        info.contactList.push(result);
        await info.save();
        result.info = info;
        await result.save();
      }

      return new ServiceResult(HttpStatuses.OK, result.toObject());
    } catch (error) {
      return new ServiceError(HttpStatuses.SERVER_ERROR, error.message);
    }
  }
}
