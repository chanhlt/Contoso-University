import { AppError } from './app.error';

export class BadRequestError extends AppError {
  public override readonly status = 400;
}
