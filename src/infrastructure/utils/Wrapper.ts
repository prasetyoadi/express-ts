import { Response } from "express";

import { HttpCode, AppErrorCode } from "@utils/Constants";
import xml from "xml";
import { parseXml } from "./Helpers";

export interface BaseResponse<T> {
  code: HttpCode;
  success: boolean;
  data: T | Array<T> | null | undefined;
}

export interface PaginationMeta {
  page: number;
  totalData: number;
  totalDataOnPage: number;
  totalPage: number;
}

export interface RedashData {
  columns: Array<any>;
  rows: Array<any>;
}

export interface PaginationResponse<T> extends BaseResponse<T> {
  meta?: PaginationMeta | null;
}

export interface ErrorResponse<T>
  extends BaseResponse<T>,
    PaginationResponse<T> {
  appCode: AppErrorCode;
  message: string;
}

export function success<T>(model: T | null): BaseResponse<T> {
  return {
    code: HttpCode.OK,
    success: true,
    data: model,
  };
}

export function pagination<T>(
  data: Array<T>,
  opts: PaginationMeta
): PaginationResponse<T> {
  return {
    code: HttpCode.OK,
    success: true,
    meta: opts,
    data,
  };
}

export function redashPagination(
  columns: Array<any>,
  rows: Array<any>,
  opts: PaginationMeta
): PaginationResponse<RedashData> {
  return {
    code: HttpCode.OK,
    success: true,
    meta: opts,
    data: {
      columns: columns,
      rows: rows,
    },
  };
}

export function error<T>(
  httpCode: HttpCode,
  appCode: AppErrorCode,
  message: string,
  data: T | null | undefined
): ErrorResponse<T> {
  return {
    code: httpCode,
    appCode: appCode,
    success: false,
    meta: undefined,
    message: message,
    data: data,
  };
}

export function send<T>(res: Response, data: BaseResponse<T>): void {
  res.status(data.code).send(data);
}

export function sendXml(
  res: Response,
  data: any,
  attributes: string,
  attribute: string
): void {
  res.set("Content-Type", "text/xml");
  res.send(
    xml(
      parseXml(
        data !== null ? (Array.isArray(data) ? data : [data]) : [],
        attribute,
        attributes
      ),
      {
        declaration: true,
      }
    )
  );
}
