import { AppErrorCode, HttpCode } from "@utils/Constants";
import * as Wrapper from "@utils/Wrapper";
import { IPersonDto } from "./personDto";
import { IPersonRepository } from "./personRepository";
import { IGetAllPersonSchema } from "./personValidators";

export class PersonDomain {
  repository: IPersonRepository;
  constructor(repoObjection: IPersonRepository) {
    this.repository = repoObjection;
  }
  async getAll(
    model: IGetAllPersonSchema
  ): Promise<Wrapper.BaseResponse<IPersonDto[]>> {
    const result: IPersonDto[] = await this.repository.find(model);
    return Wrapper.success(result);
  }
  async getDetail(
    id: number
  ): Promise<Wrapper.BaseResponse<IPersonDto | null>> {
    const result: IPersonDto | null = await this.repository.findOne(id);
    if (!result) {
      return Wrapper.error(
        HttpCode.NotFound,
        AppErrorCode.RecordNotFound,
        "Data not found",
        null
      );
    }
    return Wrapper.success(result);
  }
}
