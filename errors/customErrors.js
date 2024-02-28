import { StatusCodes } from "http-status-codes";

export class DataNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "DataNotFoundError";
    this.StatusCode = StatusCodes.NOT_FOUND;
  }
}

// 400
export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
    this.StatusCode = StatusCodes.BAD_REQUEST;
  }
}
// who the user is(login) 401
export class UnauthenticatedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnauthenticatedError";
    this.StatusCode = StatusCodes.UNAUTHORIZED;
  }
}

// whether user has access 403
export class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnauthorizedError";
    this.StatusCode = StatusCodes.FORBIDDEN;
  }
}
