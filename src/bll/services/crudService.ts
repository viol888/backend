import { Document, Model } from 'mongoose';
import { IBaseEntity, IBaseEntityFilter, IServiceResult, IServiceError } from '../interfaces/models';
import { ICrudService } from '../interfaces/services';
import { Repository } from '../../dal/repositories';
import { MongooseMapper } from '../utils';
import { ServiceResult, ServiceError } from '../models';
import { HttpStatuses } from '../enums';

export class CrudService<
    TViewModel extends IBaseEntity,
    TEntityModel extends Document,
    TFilterModel extends IBaseEntityFilter
  > implements ICrudService<TViewModel, TEntityModel, TFilterModel> {
  protected _repository: Repository<TEntityModel, TFilterModel>;

  private _model: Model<TEntityModel, {}>;

  constructor(model: Model<TEntityModel, {}>, repository?: Repository<TEntityModel, TFilterModel>) {
    this._repository = repository || new Repository(model);
    this._model = model;
  }

  public async add(data: TViewModel): Promise<IServiceResult<TViewModel> | IServiceError> {
    try {
      const entity = MongooseMapper.mapViewEntity<TViewModel, TEntityModel>(data, this._model);
      const result = await this._repository.addAsync(entity);
      return new ServiceResult(HttpStatuses.OK, (result as any).toObject() as TViewModel);
    } catch (error) {
      return new ServiceError(HttpStatuses.SERVER_ERROR, error.message);
    }
  }

  public async addList(dataList: TViewModel[]): Promise<IServiceResult<TViewModel[]> | IServiceError> {
    try {
      const entityList = dataList.map((data) => MongooseMapper.mapViewEntity<TViewModel, TEntityModel>(data, this._model));
      const result = await this._repository.addListAsync(entityList);
      const returnList = result.map((item) => (item as any).toObject() as TViewModel);
      return new ServiceResult(HttpStatuses.OK, returnList);
    } catch (error) {
      return new ServiceError(HttpStatuses.SERVER_ERROR, error.message);
    }
  }

  public async update(data: TViewModel): Promise<IServiceResult<TViewModel> | IServiceError> {
    try {
      const entity = MongooseMapper.mapViewEntity<TViewModel, TEntityModel>(data, this._model);
      const update = MongooseMapper.mapViewFilter<TViewModel, TFilterModel>(data);
      const result = await this._repository.updateAsync(entity.id, update);
      return new ServiceResult(HttpStatuses.OK, (result as any).toObject() as TViewModel);
    } catch (error) {
      return new ServiceError(HttpStatuses.SERVER_ERROR, error.message);
    }
  }

  public async delete(id: string): Promise<IServiceResult<void> | IServiceError> {
    try {
      await this._repository.removeAsync(id);
      return new ServiceResult(HttpStatuses.OK);
    } catch (error) {
      return new ServiceError(HttpStatuses.SERVER_ERROR, error.message);
    }
  }

  public async get(id: string): Promise<IServiceResult<TViewModel> | IServiceError> {
    try {
      const result = await this._repository.getAsync(id);
      return new ServiceResult(HttpStatuses.OK, (result as any).toObject() as TViewModel);
    } catch (error) {
      return new ServiceError(HttpStatuses.SERVER_ERROR, error.message);
    }
  }

  public async getAll(): Promise<IServiceResult<TViewModel[]> | IServiceError> {
    try {
      const result = await this._repository.getAllAsync();
      const returnList = result.map((item) => (item as any).toObject() as TViewModel);
      return new ServiceResult(HttpStatuses.OK, returnList);
    } catch (error) {
      return new ServiceError(HttpStatuses.SERVER_ERROR, error.message);
    }
  }

  public async find(conditions: TFilterModel): Promise<IServiceResult<TViewModel> | IServiceError> {
    try {
      const result = await this._repository.findAsync(conditions);
      return new ServiceResult(HttpStatuses.OK, (result as any).toObject() as TViewModel);
    } catch (error) {
      return new ServiceError(HttpStatuses.SERVER_ERROR, error.message);
    }
  }

  public async findMany(conditions: TFilterModel): Promise<IServiceResult<TViewModel[]> | IServiceError> {
    try {
      const result = await this._repository.findManyAsync(conditions);
      const returnList = result.map((item) => (item as any).toObject() as TViewModel);
      return new ServiceResult(HttpStatuses.OK, returnList);
    } catch (error) {
      return new ServiceError(HttpStatuses.SERVER_ERROR, error.message);
    }
  }
}
