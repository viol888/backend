import { Enviroment } from '../enums/env.enum';
import { IConfiguration } from '../interfaces/configuration';
import { prodConfig } from '../configurations/production';
import { devConfig } from '../configurations/development';

export const getConfig = (): IConfiguration => {
  switch (process.env.NODE_ENV) {
    case Enviroment.PRODUCTION:
      return prodConfig;
    case Enviroment.DEVELOPMENT:
      return devConfig;
    default:
      return devConfig;
  }
};
