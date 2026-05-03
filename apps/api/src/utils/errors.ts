export class AppError extends Error {
  public readonly isOperational: boolean;

  constructor(
    public readonly statusCode: number,
    message: string,
    isOperational = true
  ) {
    super(message);

    this.isOperational = isOperational;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(404, message);
  }
}

export class BadRequestError extends AppError {
  constructor(message = 'Bad request') {
    super(400, message);
  }
}
