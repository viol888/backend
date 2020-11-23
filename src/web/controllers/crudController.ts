import * as express from 'express';
import { Document, Model } from 'mongoose';
import { param } from 'express-validator';
import { Controller } from './controller';
import { ICrudService } from '../../bll/interfaces/services/crudService';
import { CrudService } from '../../bll/services/crudService';
import { IBaseEntityFilter, IBaseEntity } from '../../bll/interfaces/models/entity/baseEntity';
import { validate } from '../helpers/validationHelpers';
import { IController } from '../interfaces/controllers/controller';
import { privateRoutesMiddleware } from '../helpers/tokenHelpers';

export class CrudController<
    TViewModel extends IBaseEntity,
    TEntityModel extends Document,
    TFilterModel extends IBaseEntityFilter
  > extends Controller implements IController {
  public path: string;

  private service: ICrudService<TViewModel, TEntityModel, TFilterModel>;

  constructor(path: string, model: Model<TEntityModel, {}>, service?: ICrudService<TViewModel, TEntityModel, TFilterModel>) {
    super();
    this.path = path;
    this.service = service || new CrudService<TViewModel, TEntityModel, TFilterModel>(model);
    this.config();
  }

  private config(): void {
    this.router.post(`/${this.path}`, privateRoutesMiddleware, async (request: express.Request, response: express.Response) => {
      const result = await this.service.add(request.body);
      return this.sendResult(response, result);
    });

    this.router.put(`/${this.path}`, privateRoutesMiddleware, async (request: express.Request, response: express.Response) => {
      const result = await this.service.update(request.body);
      return this.sendResult(response, result);
    });

    this.router.delete(`/${this.path}/:id`, privateRoutesMiddleware, validate([
      param('id', 'Отсутствует id').not().isEmpty()
    ]), async (request: express.Request, response: express.Response) => {
      const result = await this.service.delete(request.params.id);
      return this.sendResult(response, result);
    });

    this.router.get(`/${this.path}`, privateRoutesMiddleware, async (request: express.Request, response: express.Response) => {
      const result = await this.service.findMany(request.query as any);
      return this.sendResult(response, result);
    });

    this.router.get(`/${this.path}/:id`, privateRoutesMiddleware, validate([
      param('id', 'Отсутствует id').not().isEmpty()
    ]), async (request: express.Request, response: express.Response) => {
      const result = await this.service.get(request.params.id);
      return this.sendResult(response, result);
    });
  }
}
