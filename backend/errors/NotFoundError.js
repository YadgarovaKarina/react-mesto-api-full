import { constants } from 'http2';

export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = constants.HTTP_STATUS_NOT_FOUND;
  }
}
