import { UserEntity } from "../../../../Entities/UserEntity";
import { IUserRepositoryContract } from "../../../../Infra/Contracts/Repositories/IUserRepository.Contract";
import { CustomErrorResponse } from "../../../../utils/CustomErrorResponse";
import { hashPassword } from "../../../../utils/hashPassword";
import { createToken } from "../../../../utils/tokenService";
import {
  CreateAccountDTOSchema,
  CreateAccountDTOSchemaType,
} from "./Core/CreateAccount.DTO.Schema";

export class SignUpService {
  constructor(private readonly userRepository: IUserRepositoryContract) {}

  async execute({ user }: CreateAccountDTOSchemaType) {
    const inputDTOValidate = CreateAccountDTOSchema.safeParse({ user });

    if (!inputDTOValidate.success) {
      const errors = inputDTOValidate.error.errors.map((_error) => {
        return {
          property: _error.path[_error.path.length - 1],
          error: _error.message,
        };
      });
      throw new CustomErrorResponse({
        message: errors[0].error,
        statusCode: 400,
        typeOfError: "BAD_REQUEST",
        paramsErrors: errors,
      });
    }

    const emailIsInUse = await this.userRepository.getByEmail(user.email);

    if (emailIsInUse) {
      throw new CustomErrorResponse({
        message: "email in used",
        statusCode: 401,
        typeOfError: "UNAUTHORIZED",
      });
    }

    const usernameIsInUse = await this.userRepository.getByUsername(
      user.username
    );

    if (usernameIsInUse) {
      throw new CustomErrorResponse({
        message: "username in used",
        statusCode: 401,
        typeOfError: "UNAUTHORIZED",
      });
    }

    const userEntity = new UserEntity({
      name: user.name,
      email: user.email,
      username: user.username,
      password: hashPassword(user.password),
    });

    const userCreated = await this.userRepository.register(userEntity);

    const payload = {
      id: userCreated.id,
      name: userCreated.name,
      email: userCreated.email,
      username: userCreated.username,
    };

    return {
      user: {
        id: userCreated.id,
        name: userCreated.name,
        email: userCreated.email,
        username: userCreated.username,
      },
      token: createToken(payload),
    };
  }
}
