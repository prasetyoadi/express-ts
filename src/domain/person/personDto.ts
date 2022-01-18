import { IPersonAttributes } from "./person";

export type IPersonDto = IPersonAttributes;

export interface IResponsePerson {
  persons: IPersonDto[];
}