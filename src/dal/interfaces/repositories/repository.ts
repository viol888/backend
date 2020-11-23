import { Document } from 'mongoose';
import { IBaseEntityFilter } from '../../../bll/interfaces/models/entity/baseEntity';

export interface IRepository<TEntityModel extends Document, TFilterModel extends IBaseEntityFilter> {
  addAsync(entity: TEntityModel): Promise<TEntityModel>;
  addListAsync(entityArray: TEntityModel[]): Promise<TEntityModel[]>;
  updateAsync(id: string, update: TFilterModel): Promise<TEntityModel>;
  removeAsync(id: string): Promise<void>;
  removeListAsync(ids: string[]): Promise<void>;
  countAsync(): Promise<number>;
  getAsync(id: string): Promise<TEntityModel>;
  getAllAsync(): Promise<TEntityModel[]>;
  findAsync(conditions: TFilterModel): Promise<TEntityModel>;
  findManyAsync(conditions: TFilterModel): Promise<TEntityModel[]>;
}
