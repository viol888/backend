import { ILogin } from '../models/login';
import { IServiceResult, IServiceError } from '../models';

export interface IAuthService {
  login(login: ILogin): Promise<IServiceResult<string> | IServiceError>;
}
