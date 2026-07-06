export class ApiError extends Error {
  constructor(
    message: string,
    public readonly code: string = 'UNKNOWN',
    public readonly status?: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = 'Session expired. Please sign in again.') {
    super(message, 'UNAUTHENTICATED', 401);
    this.name = 'UnauthorizedError';
  }
}

export class NetworkError extends ApiError {
  constructor(message = 'Unable to reach CultureOwl. Check your connection.') {
    super(message, 'NETWORK');
    this.name = 'NetworkError';
  }
}
