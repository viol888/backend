import { Document, Model } from 'mongoose';
import { ObjectID } from 'mongodb';
import { IBaseEntity, IBaseEntityFilter } from '../../bll/interfaces/models/entity/baseEntity';

export class MongooseMapper {
  public static mapViewEntity<
  TViewModel extends IBaseEntity,
  TEntityModel extends Document
  >(viewModel: TViewModel, MongooseModel: Model<TEntityModel>): TEntityModel {
    viewModel._id = new ObjectID(viewModel.id);
    const entityModel = new MongooseModel();
    Object.keys(viewModel).forEach((key) => {
      entityModel[key] = viewModel[key];
    });
    return entityModel;
  }

  public static mapViewFilter<
  TViewModel extends IBaseEntity,
  TFilterModel extends IBaseEntityFilter
  >(viewModel: TViewModel): TFilterModel {
    const filterModel = {} as TFilterModel;
    Object.keys(viewModel).forEach((key) => {
      filterModel[key] = viewModel[key];
    });
    return filterModel;
  }
}
