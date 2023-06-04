import { describe, it, expect, beforeEach } from "vitest";

import { SignUpService } from "../SignUp.Service";
import { userRepositoryInMemory } from "../../../../../Infra/Repositories/singleton";
import { CustomErrorResponse } from "../../../../../utils/CustomErrorResponse";

describe("Test params in SignUp UseCase", () => {
  let singUpService = new SignUpService(userRepositoryInMemory);

  beforeEach(() => {
    userRepositoryInMemory.clearRepository();
  });

  it("unable to create an account with less than 6 characters in password", () => {
    const userRequestDTO = {
      name: "jhon",
      email: "jhon@gmail.com",
      username: "jhongg",
      password: "jhon1",
    };

    expect(
      async () => await singUpService.execute({ user: userRequestDTO })
    ).rejects.toThrowError(
      new CustomErrorResponse({
        typeOfError: "BAD_REQUEST",
        message: "the password must contain 10 characters",
        statusCode: 400,
        paramsErrors: [
          {
            property: "password",
            error: "the password must contain 10 characters",
          },
        ],
      })
    );
  });

  it("unable to create an account with less than 6 characters in password", () => {
    const userRequestDTO = {
      name: "jhon",
      email: "jhon",
      username: "jhongg",
      password: "jhon12",
    };

    expect(
      async () => await singUpService.execute({ user: userRequestDTO })
    ).rejects.toThrowError(
      new CustomErrorResponse({
        typeOfError: "BAD_REQUEST",
        message: "email field must be a email",
        statusCode: 400,
        paramsErrors: [
          {
            property: "email",
            error: "email field must be a email",
          },
        ],
      })
    );
  });
});
