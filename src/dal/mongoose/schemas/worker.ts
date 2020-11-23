import * as mongoose from 'mongoose';
import { defaultTransform } from '../../../bll/utils/utils';
import { IMongooseWorker } from '../interfaces/mongooseWorker';

const { Schema } = mongoose;

export const workerSchema = new Schema<IMongooseWorker>({
  fio: {
    type: String,
    trim: true
  },
  positiveResultDate: {
    type: String
  },
  position: {
    type: String
  }
}, { collection: 'workers' })
  .set('toObject', { transform: defaultTransform, versionKey: false });
