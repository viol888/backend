import { IInformationFilter } from '../../bll/interfaces/models';
import { IMongooseInformation } from '../mongoose/interfaces';
import { InformationModel } from '../mongoose/models';
import { Repository } from './repository';

export class InfoRepository extends Repository<IMongooseInformation, IInformationFilter> {
  constructor() {
    super(InformationModel);
  }

  public async getAsync(id: string): Promise<IMongooseInformation> {
    const result = await this._model.findById(id).populate('contactList');
    return result;
  }

  public async getAllAsync(): Promise<IMongooseInformation[]> {
    const result = await this._model.find().sort({stayDateStart: '1'}).populate('contactList');
    return result;
  }

  public async findAsync(conditions: IInformationFilter): Promise<IMongooseInformation | null> {
    const result = await this._model.findOne(conditions as any).populate('contactList');
    return result;
  }

  public async findManyAsync(conditions: IInformationFilter): Promise<IMongooseInformation[]> {
    const result = await this._model.find(conditions as any).sort({stayDateStart: '1'}).populate('contactList');
    return result;
  }
}
