import * as express from 'express';
import { body } from 'express-validator';
import { Controller } from './controller';
import { IController } from '../interfaces/controllers/controller';
import { AuthService } from '../../bll/services/authService';
import { validate } from '../helpers/validationHelpers';

export class AuthController extends Controller implements IController {
  public path = 'auth';

  private authService = new AuthService();

  constructor() {
    super();
    this.config();
  }

  private config(): void {
  // #region basic auth

    // login
    this.router.post(`/${this.path}/login`, validate([
      body('userName', 'Вы должны отправить имя пользователя').not().isEmpty(),
      body('password', 'Вы должны отправить пароль').not().isEmpty()
    ]), async (request: express.Request, response: express.Response) => {
      const result = await this.authService.login(request.body);
      return this.sendResult(response, result);
    });

    // register
    // this.router.post(`/${this.path}/register`, validate([
    //   body('name', 'Вы должны отправить имя').not().isEmpty(),
    //   body('email', 'Вы должны отправить валидный адрес электронной почты').isEmail(),
    //   body('password', 'Вы должны отправить пароль').not().isEmpty(),
    //   body('phone', 'Вы должны указать телефон').not().isEmpty()
    // ]), async (request: express.Request, response: express.Response) => {
    //   const result = await this.authService.register(request.body);
    //   return this.sendResult(response, result);
    // });

    // this.router.get(`/${this.path}/isAdmin`, privateRoutesMiddleware, async (request: IUserRequest, response: express.Response) => {
    //   const result = await this.authService.isAdmin(request.user);
    //   return this.sendResult(response, result);
    // });
    
    // this.router.get(`/${this.path}`, async (request: express.Request, response: express.Response) => {
    //   return this.sendResult(response, {status: 200, body: { message: 'Ok' } });
    // });
  }
}
