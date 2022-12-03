import { constants } from 'http2';

export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadRequestError';
    this.statusCode = constants.HTTP_STATUS_BAD_REQUEST;
  }
}
