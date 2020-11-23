import * as mongoose from 'mongoose';
import { IMongooseContact } from '../interfaces';
import { defaultTransform } from '../../../bll/utils/utils';

const { Schema } = mongoose;

export const contactSchema = new Schema<IMongooseContact>({
  info: { type: Schema.Types.ObjectId, ref: 'Information' },
  fio: {
    type: String,
    trim: true
  },
  birthDay: {
    type: String
  }
}, { collection: 'contacts' })
  .set('toObject', { transform: defaultTransform, versionKey: false });
