import { CrudController } from './crudController';
import { InformationModel, ContactModel, WorkerModel } from '../../dal/mongoose/models';
import { AuthController } from './authController';
import { InfoService } from '../../bll/services/infoService';
import { ContactService } from '../../bll/services/contactService';

export const getAllRoutes = () => {
  const infoController = new CrudController('info', InformationModel, new InfoService());
  const contactController = new CrudController('contact', ContactModel, new ContactService());
  const authController = new AuthController();
  const workerController = new CrudController('worker', WorkerModel);

  return [
    infoController.router,
    contactController.router,
    authController.router,
    workerController.router
  ];
};
