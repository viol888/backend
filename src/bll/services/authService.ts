import * as bcrypt from 'bcrypt';
import { IAuthService } from '../interfaces/services/authService';
import { ILogin } from '../interfaces/models/login';
import { Repository } from '../../dal/repositories';
import { IMongooseUser } from '../../dal/mongoose/interfaces';
import { IUserFilter } from '../interfaces/models/entity/user';
import { UserModel } from '../../dal/mongoose/models';
import { IServiceResult, IServiceError } from '../interfaces/models';
import { ServiceError, ServiceResult } from '../models';
import { HttpStatuses } from '../enums';
import { createToken } from '../../web/helpers/tokenHelpers';
import { getConfig } from '../../config/utils/utils';

export class AuthService implements IAuthService {

  private configuration = getConfig();
  private userRepository = new Repository<IMongooseUser, IUserFilter>(UserModel);

  public async login(login: ILogin): Promise<IServiceResult<string> | IServiceError> {
    try {
      const { userName, password } = login;
      const user = await this.userRepository.findAsync({ userName });

      if (!user) {
        return new ServiceError(HttpStatuses.UNAUTHORIZED, 'Неверные email/пароль');
      }

      const compareResult = await bcrypt.compare(password, user.passwordHash);

      if (compareResult) {
        const tokenInput = {
          id: user.id,
          userName: user.userName
        };
        const token = createToken(tokenInput);
        return new ServiceResult(HttpStatuses.OK, token);
      }
      return new ServiceError(HttpStatuses.UNAUTHORIZED, 'Неверные email/пароль');
    } catch (err) {
      return new ServiceError(HttpStatuses.SERVER_ERROR, err.message);
    }
  }
}
