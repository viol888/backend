
import * as express from 'express';
import { IServiceError } from '../../bll/interfaces/models/serviceError';
import { IServiceResult } from '../../bll/interfaces/models/serviceResult';
import { ServiceError } from '../../bll/models/serviceError';
import { IController } from '../interfaces/controllers/controller';

export abstract class Controller implements IController {
  public abstract path: string;

  public router: express.Router = express.Router();

  public sendResult<T>(response: express.Response, result: IServiceResult<T> | IServiceError): express.Response {
    if (result instanceof ServiceError) {
      return response.status(result.status).send({ error: result.message });
    }
    return response.status(result.status).send({ data: (result as IServiceResult<T>).body });
  }
}
