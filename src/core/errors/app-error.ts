import { ERROR } from './error-code';
import { ERROR_MESSAGE } from './error-message';

export class AppError extends Error {
  public readonly code: ERROR;
  public readonly error: string;
  public readonly status: number = 500;

  constructor(code: ERROR) {
    super(code);
    this.code = code;
    this.error = ERROR_MESSAGE[code];
  }
}
