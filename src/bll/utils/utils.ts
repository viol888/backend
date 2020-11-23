import { Model, Document } from 'mongoose';
import { IMongooseUser } from '../../dal/mongoose/interfaces';

export const getRandomCode = () => {
  return Math.floor(Math.random() * (9999 - 1000)) + 1000;
};

export const defaultTransform = (doc: Model<Document>, ret: Document, options: object) => {
  ret.id = ret._id.toString();
  delete ret._id;
  return ret;
};

export const formatString = (str: string, params: object): string => {
  let resultStr = str;
  Object.keys(params).forEach((key) => {
    resultStr = resultStr.replace(`\${${key}}`, params[key]);
  });
  return resultStr;
};

export const simpleUserTransform = (doc: Model<Document>, ret: IMongooseUser, options: object) => {
  ret.id = ret._id.toString();
  delete ret._id;
  delete ret.passwordHash;
  return ret;
};