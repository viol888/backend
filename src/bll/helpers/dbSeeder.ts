import * as bcrypt from 'bcrypt';
import { IDbSeeder } from '../interfaces/helpers/dbSeeder';
import { getConfig } from '../../config/utils/utils';
import { Repository } from '../../dal/repositories';
import { IMongooseUser } from '../../dal/mongoose/interfaces';
import { UserModel } from '../../dal/mongoose/models';
import { IUserFilter } from '../interfaces/models/entity/user';

export class DbSeeder implements IDbSeeder {
  private configuration = getConfig();
  private userRepository = new Repository<IMongooseUser, IUserFilter>(UserModel);

  public async dbSeed(): Promise<void> {
    await this.createBasicUsers();
  }

  private async createBasicUsers(): Promise<void> {
    try {
      const user = await this.userRepository.findAsync({ userName: this.configuration.baseUsers.admin.userName });

      if (!user) {
        const password = this.configuration.baseUsers.admin.defaultPassword;

        const hash = await bcrypt.hash(password, this.configuration.authentication.saltRounds);

        const newUser = new UserModel({
          userName: this.configuration.baseUsers.admin.userName,
          passwordHash: hash
        });

        await this.userRepository.addAsync(newUser);
      }
    } catch (err) {
      console.log(err);
    }
  }
}
