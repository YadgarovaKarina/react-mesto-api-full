import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../errors/UnauthorizedError.js';

export const auth = (req, res, next) => {
  const { authorization = '' } = req.headers;
  if (!authorization) {
    next(new UnauthorizedError('Необходима авторизация'));
  } else {
    const token = authorization.replace(/^Bearer*\s*/i, '');
    try {
      const decoded = jwt.verify(token, 'some-secret-key');
      req.user = { _id: decoded._id };
      next();
    } catch (err) {
      next(new UnauthorizedError('Необходима авторизация'));
    }
  }
};
