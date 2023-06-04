import { UserEntity } from "../../../../Entities/UserEntity";
import { IUserRepositoryContract } from "../../../../Infra/Contracts/Repositories/IUserRepository.Contract";
import { CustomErrorResponse } from "../../../../utils/CustomErrorResponse";
import { hashPasswordValidate } from "../../../../utils/hashPassword";
import { hashPassword } from "../../../../utils/hashPassword";
import { IUserPayload, createToken } from "../../../../utils/tokenService";
import { SignInDTOSchema, SignInDTOSchemaType } from "./Core/SignIn.DTO.Schema";

export class SignInService {
  constructor(private readonly userRepository: IUserRepositoryContract) {}

  async execute({ user }: SignInDTOSchemaType) {
    const inputDTOValidate = SignInDTOSchema.safeParse({ user });

    if (!inputDTOValidate.success) {
      const errors = inputDTOValidate.error.errors.map((_error) => {
        return {
          property: _error.path[_error.path.length - 1],
          error: _error.message,
        };
      });
      throw new CustomErrorResponse({
        message: "parameters are invalid",
        statusCode: 400,
        typeOfError: "BAD_REQUEST",
        paramsErrors: errors,
      });
    }

    const userExist = await this.userRepository.getByEmail(user.email);

    if (!userExist) {
      throw new CustomErrorResponse({
        message: "account not found",
        statusCode: 404,
        typeOfError: "NOT_FOUND",
      });
    }

    const passwordIsValid = hashPasswordValidate(
      user.password,
      userExist.password
    );

    if (!passwordIsValid) {
      throw new CustomErrorResponse({
        message: "the password is invalid",
        statusCode: 401,
        typeOfError: "UNAUTHORIZED",
      });
    }

    const payload: IUserPayload = {
      id: userExist.id,
      name: userExist.name,
      email: userExist.email,
      username: userExist.username,
    };

    return {
      user: {
        id: userExist.id,
        name: userExist.name,
        email: userExist.email,
        username: userExist.username,
      },
      token: createToken(payload),
    };
  }
}
