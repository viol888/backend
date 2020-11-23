import { Document, Model, QueryFindOneAndUpdateOptions } from 'mongoose';
import { IRepository } from '../interfaces/repositories';
import { IBaseEntityFilter } from '../../bll/interfaces/models/entity/baseEntity';

export class Repository<
    TEntityModel extends Document,
    TFilterModel extends IBaseEntityFilter
  > implements IRepository<TEntityModel, TFilterModel> {
  protected _model: Model<TEntityModel>;

  constructor(model: Model<TEntityModel>) {
    this._model = model;
  }

  public async addAsync(entity: TEntityModel): Promise<TEntityModel> {
    const result = await this._model.create(entity);
    return result;
  }

  public async addListAsync(entityArray: TEntityModel[]): Promise<TEntityModel[]> {
    const result = await this._model.insertMany(entityArray);
    return result;
  }

  public async updateAsync(id: string, update: TFilterModel): Promise<TEntityModel> {
    const options: QueryFindOneAndUpdateOptions = { new: true, runValidators: true };
    const result = await this._model.findByIdAndUpdate(id, update, options);
    return result;
  }

  public async removeAsync(id: string): Promise<void> {
    await this._model.findByIdAndDelete(id);
  }

  public async removeListAsync(ids: string[]): Promise<void> {
    await this._model.deleteMany({ id: { $in: ids } as any});
  }

  public async countAsync(): Promise<number> {
    const count = await this._model.count({});
    return count;
  }

  public async countFilteredAsync(conditions: TFilterModel): Promise<number> {
    const count = await this._model.count(conditions as any);
    return count;
  }

  public async getAsync(id: string): Promise<TEntityModel> {
    const result = await this._model.findById(id);
    return result;
  }

  public async getAllAsync(): Promise<TEntityModel[]> {
    const result = await this._model.find();
    return result;
  }

  public async findAsync(conditions: TFilterModel): Promise<TEntityModel> {
    const result = await this._model.findOne(conditions as any);
    return result;
  }

  public async findManyAsync(conditions: TFilterModel): Promise<TEntityModel[]> {
    const result = await this._model.find(conditions as any);
    return result;
  }
}
