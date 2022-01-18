import { Request, Response, Router } from "express";
import { AppErrorCode, HttpCode } from "@utils/Constants";
import * as Wrapper from "@utils/Wrapper";
import * as logger from "@components/logger";
import { PersonRepository } from "./personRepository";
import { PersonDomain } from "./personDomain";
import dummyPerson from "@faker/person.json";
import * as validator from "./personValidators";

const context = "Domain.Person.Handler";
const repository = new PersonRepository(dummyPerson);
const domain = new PersonDomain(repository);

export function GetRouter(): Router {
  const router = Router();
  router.get("/", getList);
  router.get("/:id", getDetail);

  return router;
}

export async function getList(req: Request, res: Response) {
  const scope = getList.name;
  const validationResult = validator.GetAllPersonSchema.validate(req.query);
  if (validationResult.error) {
    const errors = "Validation failed for " + scope;
    logger.error(context, errors, scope, validationResult.error.message);

    return Wrapper.send(
      res,
      Wrapper.error(
        HttpCode.BadRequest,
        AppErrorCode.ValidationFailed,
        errors,
        validationResult.error.message
      )
    );
  }

  const { format } = validationResult.value;
  delete validationResult.value.format;
  const result = await domain.getAll(validationResult.value);

  if (format === "xml") {
    return Wrapper.sendXml(res, result.data ?? [], "persons", "person");
  }

  return Wrapper.send(res, result);
}

export async function getDetail(req: Request, res: Response): Promise<void> {
  const scope = getList.name;
  const { id } = req.params;
  const validationResult = validator.GetDetailPersonSchema.validate(req.query);
  if (validationResult.error) {
    const errors = "Validation failed for " + scope;
    logger.error(context, errors, scope, validationResult.error.message);

    return Wrapper.send(
      res,
      Wrapper.error(
        HttpCode.BadRequest,
        AppErrorCode.ValidationFailed,
        errors,
        validationResult.error.message
      )
    );
  }
  const { format } = validationResult.value;
  delete validationResult.value.format;
  const result = await domain.getDetail(Number(id));
  if (format === "xml") {
    return Wrapper.sendXml(res, result.data, "persons", "person");
  }
  return Wrapper.send(res, result);
}
