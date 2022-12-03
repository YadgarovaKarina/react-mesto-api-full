import { constants } from 'http2';

export class ServerError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ServerError';
    this.statusCode = constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
  }
}
