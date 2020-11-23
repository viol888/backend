import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { getConfig } from '../../config/utils/utils';
import { Enviroment } from '../../config/enums/env.enum';
import { getAllRoutes } from '../controllers';
import { DbSeeder } from '../../bll/helpers/dbSeeder';

export class App {
  private app: express.Application;
  private configuration = getConfig();

  constructor() {
    this.app = express();
    this.configApp();
  }

  private configApp() {
    this.setDatabase();
    this.setParsers(true);
    this.setCors();
    this.setRouting();
  }

  private async setDatabase(): Promise<void> {
    try {
      mongoose.set('useNewUrlParser', true);
      mongoose.set('useFindAndModify', false);
      mongoose.set('useCreateIndex', true);
      mongoose.set('useUnifiedTopology', true);
      await mongoose.connect(`${this.configuration.dataBase.host}${this.configuration.dataBase.name}`, { useNewUrlParser: true });
      console.log('MongoDB has started...');
      this.dbSeed();
    } catch (err) {
      console.log(err);
    }
  }

  private async dbSeed(): Promise<void> {
    const seeder = new DbSeeder();
    await seeder.dbSeed();
  }

  private setParsers(useNestedObjects: boolean): void {
    // support application/json
    this.app.use(bodyParser.json());
    // support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: useNestedObjects }));
  }

  private setCors(): void {
    this.app.use(cors({
      origin: (origin, callback) => {
        callback(null, true);
      },
      credentials: true
    }));
  }

  private setRouting(): void {
    const routes = getAllRoutes();
    this.app.use('/api', routes);
  }

  public start(): void {
    switch (process.env.NODE_ENV) {
      case Enviroment.PRODUCTION: {
        this.app.listen(4000, () => {
          console.log(`Express server listening on port 4000, prod enviroment`);
        });
        break;
      }
      case Enviroment.DEVELOPMENT: {
        this.app.listen(4000, () => {
          console.log(`Express server listening on port 4000, dev enviroment`);
        });
        break;
      }
      default: {
        this.app.listen(4000, () => {
          console.log(`Express server listening on port 4000, dev enviroment`);
        });
        break;
      }
    }
  }
}