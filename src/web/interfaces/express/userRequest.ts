import * as express from 'express';
import { IUser } from '../../../bll/interfaces/models';

export interface IUserRequest extends express.Request {
  user: IUser
}
