import { Context, Next } from 'koa';
import { AppError } from '../../core/errors/app-error';

export const errorHandler = async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (error) {
    if (error instanceof AppError) {
      ctx.status = error.status;
      ctx.body = error;
    } else {
      ctx.status = 500;
      ctx.body = {
        status: 500,
        code: 'UNKNOWN_ERROR',
        error: 'Unknown error'
      };
    }
  }
};
