import { describe, it, expect, beforeEach } from "vitest";

import { SignInService } from "../SignIn.Service";
import { SignUpService } from "../../SignUp/SignUp.Service";
import { userRepositoryInMemory } from "../../../../../Infra/Repositories/singleton";
import { CustomErrorResponse } from "../../../../../utils/CustomErrorResponse";

describe("", () => {
  const signUpService = new SignUpService(userRepositoryInMemory);
  const signInService = new SignInService(userRepositoryInMemory);

  beforeEach(() => {
    userRepositoryInMemory.clearRepository();
  });

  it("is possible to log in an already registered user with the right data", async () => {
    const registerUserDTO = {
      name: "jhon",
      email: "jhon@gmail.com",
      username: "jhongg",
      password: "jhon123456",
    };

    await signUpService.execute({
      user: registerUserDTO,
    });

    const userLogged = await signInService.execute({
      user: {
        email: registerUserDTO.email,
        password: registerUserDTO.password,
      },
    });

    expect(userLogged).toHaveProperty("user");
    expect(userLogged).toHaveProperty("token");
    expect(userLogged).toHaveProperty(["user", "email"], registerUserDTO.email);
    expect(userLogged).not.toHaveProperty(["user", "password"]);
  });

  it("unable to login with a user the wrong password", async () => {
    const registerUserDTO = {
      name: "jhon",
      email: "jhon@gmail.com",
      username: "jhongg",
      password: "jhon123456",
    };

    await signUpService.execute({
      user: registerUserDTO,
    });

    expect(
      async () =>
        await signInService.execute({
          user: {
            email: registerUserDTO.email,
            password: "wrong password",
          },
        })
    ).rejects.toThrow(
      new CustomErrorResponse({
        message: "the password is invalid",
        statusCode: 401,
        typeOfError: "UNAUTHORIZED",
      })
    );
  });

  it("is not possible to login with an unregistered email", () => {
    expect(
      async () =>
        await signInService.execute({
          user: {
            email: "jhon@gmail.com",
            password: "wrong password",
          },
        })
    ).rejects.toThrow(
      new CustomErrorResponse({
        message: "account not found",
        statusCode: 404,
        typeOfError: "NOT_FOUND",
      })
    );
  });
});
