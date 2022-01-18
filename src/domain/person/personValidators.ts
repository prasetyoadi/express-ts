import joi from "joi";

export const GetAllPersonSchema = joi.object({
  format: joi.string().optional().valid("xml", "json").default("json"),
  orderBy: joi
    .string()
    .optional()
    .valid("firstName", "lastName", "id")
    .default("id"),
  sort: joi.string().optional().valid("asc", "desc").default("asc"),
  keyword: joi.string().optional(),
});

export const GetDetailPersonSchema = joi.object({
  format: joi.string().optional().valid("xml", "json").default("json"),
});

export interface IGetAllPersonSchema {
  format?: string;
  orderBy: string;
  sort: string;
  keyword: string;
}

export interface IGetDetailPersonSchema {
  format?: string;
}

export interface IDetailPersonSchema {
  id: string;
}
