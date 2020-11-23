import * as mongoose from 'mongoose';
import { IMongooseInformation } from '../interfaces';
import { defaultTransform } from '../../../bll/utils/utils';

const { Schema } = mongoose;

export const informationSchema = new Schema<IMongooseInformation>({
  fio: {
    type: String,
    trim: true
  },
  stayDateStart: {
    type: String
  },
  stayDateEnd: {
    type: String
  },
  department: {
    type: String
  },
  contactList: [{ type: Schema.Types.ObjectId, ref: 'Contact' }],

}, { collection: 'information' })
  .set('toObject', { transform: defaultTransform, versionKey: false });
