import { IBaseEntity, IBaseEntityFilter } from './entity/baseEntity';
import { IActionResult } from './actionResult';
import { IServiceError } from './serviceError';
import { IServiceResult } from './serviceResult';
import { IUser, IUserFilter } from './entity/user';
import { IInformation, IInformationFilter } from './entity/info';
import { IContact, IContactFilter } from './entity/contact';

export {
  IBaseEntity,
  IUser,
  IContact,
  IInformation,
  IActionResult,
  IServiceError,
  IServiceResult
};

export {
  IBaseEntityFilter,
  IUserFilter,
  IContactFilter,
  IInformationFilter
};