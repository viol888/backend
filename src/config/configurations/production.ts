import { IConfiguration } from '../interfaces/configuration';

export const prodConfig: IConfiguration = {
  dataBase: {
    host: 'mongodb://localhost:27017/',
    name: 'covid_info'
  },
  authentication: {
    secret: 'secret',
    saltRounds: 10,
    passportSecret: 'passportSecret'
  },
  baseUsers: {
    admin: {
      userName: 'admin',
      defaultPassword: 'pass4admin'
    }
  }
};