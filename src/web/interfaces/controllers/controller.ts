import * as express from 'express';
import { IServiceResult } from '../../../bll/interfaces/models/serviceResult';
import { IServiceError } from '../../../bll/interfaces/models/serviceError';

export interface IController {
  router: express.Router;
  path: string;
  sendResult<T>(response: express.Response, result: IServiceResult<T> | IServiceError): express.Response;
}
