import * as logger from "@components/logger";
import { sortData } from "@utils/Helpers";
import { IPersonAttributes } from "./person";
import { IPersonDto } from "./personDto";
import { IGetAllPersonSchema } from "./personValidators";

const context: string = "Domain.Person.Repository";

export interface IPersonRepository {
  find(model: IGetAllPersonSchema): Promise<IPersonDto[]>;
  findOne(id: number): Promise<IPersonDto | null>;
}

export class PersonRepository implements IPersonRepository {
  data: IPersonAttributes[];
  constructor(persons: IPersonAttributes[]) {
    this.data = persons;
  }
  async find(params: IGetAllPersonSchema): Promise<IPersonDto[]> {
    let data = [...this.data];

    if (params.orderBy) {
      data = sortData(this.data, params.orderBy, params.sort);
    }

    if (params.keyword) {
      data = data.filter((item) => {
        const keyword = params.keyword.toLowerCase();
        return (
          item.firstName.toLowerCase().includes(keyword) ||
          item.lastName.toLowerCase().includes(keyword)
        );
      });
    }

    logger.info(context, "Successfully get data all persons", this.find.name);
    return Promise.resolve(data);
  }
  async findOne(id: number): Promise<IPersonDto | null> {
    const selected = this.data.find((item) => item.id === id);
    logger.info(context, "Successfully get detail person", this.find.name);
    return Promise.resolve(selected ?? null);
  }
}
