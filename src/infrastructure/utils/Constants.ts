export const APP_NAME = "api";

export enum HttpCode {
  OK = 200,
  Created = 201,
  BadRequest = 400,
  NotFound = 404,
  Unauthorized = 401,
  Forbidden = 403,
  TooManyRequests = 429,
  InternalServerError = 500,
  ServiceUnavailable = 503,
}

export enum HttpHeader {
  Authorization = "Authorization",
  ContentType = "Content-Type",
  ContentDisposition = "Content-Disposition",
}

export enum AppErrorCode {
  ValidationFailed,
  LoginFailed,
  ServerFailure,
  RecordNotFound,
  TooManyRequest,
  BadRequest,
}

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

export enum Sort {
  ASC = "ASC",
  DESC = "DESC",
}
