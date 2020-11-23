import * as express from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import { HttpStatuses } from '../../bll/enums/httpStatuses';

export const validate = (validations: ValidationChain[]) => {
  return async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(request)));
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      const error = errors.array()[0].msg;
      return response.status(HttpStatuses.BAD_REQUEST).send({ error });
    }
    return next();
  };
};

export const isEqual = (first: string | number | boolean, second: string | number | boolean, errorMessage: string) => {
  if (first !== second) {
    throw new Error(errorMessage);
  }
  return first;
};
