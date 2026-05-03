import { AppError } from '@src/utils/errors';
import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const isAppError = err instanceof AppError;
  const statusCode = isAppError ? err.statusCode : 500;

  if (process.env.NODE_ENV === 'development') {
    res.status(statusCode).json({
      status: 'error',
      statusCode,
      message: err.message,
      stack: err.stack,
      error: err,
    });
    return;
  }

  if (isAppError && err.isOperational) {
    res.status(statusCode).json({
      status: 'error',
      statusCode,
      message: err.message,
    });
    return;
  }

  console.error('💥 UNEXPECTED ERROR:', err);

  res.status(500).json({
    status: 'error',
    statusCode: 500,
    message: 'Internal Server Error',
  });
};
