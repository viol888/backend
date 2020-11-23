import * as mongoose from 'mongoose';
import { IBaseDocument, IMongooseContact, IMongooseInformation, IMongooseUser } from '../interfaces';
import { IMongooseWorker } from '../interfaces/mongooseWorker';
import { contactSchema, informationSchema, userSchema } from '../schemas';
import { workerSchema } from '../schemas/worker';

const generateModel = <T extends IBaseDocument>(modelName: string, schema: mongoose.Schema<T>) => mongoose.model<T>(modelName, schema);
export const UserModel = generateModel<IMongooseUser>('User', userSchema);
export const InformationModel = generateModel<IMongooseInformation>('Information', informationSchema);
export const ContactModel = generateModel<IMongooseContact>('Contact', contactSchema);
export const WorkerModel = generateModel<IMongooseWorker>('Worker', workerSchema);