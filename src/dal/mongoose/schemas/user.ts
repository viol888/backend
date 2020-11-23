import * as mongoose from 'mongoose';
import { IMongooseUser } from '../interfaces';
import { simpleUserTransform } from '../../../bll/utils/utils';

const { Schema } = mongoose;

export const userSchema = new Schema<IMongooseUser>({
  userName: {
    type: String,
    required: true,
    trim: true
  },
  passwordHash: {
    type: String,
    required: false
  },
}, { collection: 'users' })
  .set('toObject', { transform: simpleUserTransform, versionKey: false });
