import { AppError } from './app-error';

export class NotFoundError extends AppError {
  public override readonly status = 404;
}
