import * as jwt from 'jsonwebtoken';
import * as express from 'express';
import * as expressJwt from 'express-jwt';
import { getConfig } from '../../config/utils/utils';
import { HttpStatuses } from '../../bll/enums';
import { UnauthorizedError } from 'express-jwt';

const configuration = getConfig();

const checkToken = expressJwt({ secret: configuration.authentication.secret, algorithms: ['HS256'] });

export const createToken = (payload: object) => jwt.sign(payload, configuration.authentication.secret, {
  algorithm: 'HS256'
});

const handleUnAuthError = (err: UnauthorizedError, request: express.Request, response: express.Response, next: express.NextFunction) => {
  if (err.name === 'UnauthorizedError') {
    return response.status(HttpStatuses.UNAUTHORIZED).send({ error: `Unauthorized: ${err.message}` });
  }
  return next();
};

export const privateRoutesMiddleware = [checkToken, handleUnAuthError];