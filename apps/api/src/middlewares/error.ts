import { mapToAppError } from '@src/utils/errorMapper.js';
import { AppError } from '@src/utils/errors';
import { ErrorRequestHandler } from 'express';

function normalizeThrownValue(error: unknown) {
  if (error instanceof Error) {
    return {
      message: error.message,
      stack: error.stack,
      raw: error,
    };
  }

  return {
    message: 'Unknown error',
    raw: error,
  };
}

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const error = mapToAppError(err);
  const normalizedError = normalizeThrownValue(error);
  const isAppError = error instanceof AppError;
  const statusCode = isAppError ? error.statusCode : 500;

  if (process.env.NODE_ENV === 'development') {
    res.status(statusCode).json({
      status: 'error',
      statusCode,
      code: isAppError ? error.code : undefined,
      message: normalizedError.message,
      stack: normalizedError.stack,
      error: normalizedError.raw,
    });
    return;
  }

  if (isAppError && error.isOperational) {
    res.status(statusCode).json({
      status: 'error',
      statusCode,
      code: error.code,
      message: error.message,
    });
    return;
  }

  console.error('💥 UNEXPECTED ERROR:', error);

  res.status(500).json({
    status: 'error',
    statusCode: 500,
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Internal Server Error',
  });
};
