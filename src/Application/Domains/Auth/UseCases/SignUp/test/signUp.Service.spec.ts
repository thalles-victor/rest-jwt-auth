import { describe, it, expect, beforeEach } from "vitest";

import { SignUpService } from "../SignUp.Service";
import { userRepositoryInMemory } from "../../../../../Infra/Repositories/singleton";
import { CustomErrorResponse } from "../../../../../utils/CustomErrorResponse";

describe("Sign Up test", () => {
  let singUpService = new SignUpService(userRepositoryInMemory);

  beforeEach(() => {
    userRepositoryInMemory.clearRepository();
  });

  it("try create a new user", async () => {
    const userDTORequest = {
      name: "thalles",
      email: "thalles@gmail.com",
      username: "thallesgg",
      password: "mypassword123",
    };

    const userCreated = await singUpService.execute({ user: userDTORequest });

    expect(userCreated).toHaveProperty("user");

    expect(userCreated.user.name).toBe(userDTORequest.name);
    expect(userCreated.user.email).toBe(userDTORequest.email);
    expect(userCreated.user.username).toBe(userDTORequest.username);
    expect(userCreated.user).not.toHaveProperty("password");

    expect(userCreated).toHaveProperty("token");
  });

  it("is not possible to create two users with the same email", async () => {
    const usersDTO = {
      user1: {
        name: "thalles",
        email: "thalles@gmail.com",
        username: "thallesgg",
        password: "mypassword123",
      },

      user2: {
        name: "jhon",
        email: "thalles@gmail.com",
        username: "jhongg",
        password: "mypassword123",
      },
    };

    await singUpService.execute({ user: usersDTO.user1 });

    expect(
      async () =>
        await singUpService.execute({
          user: usersDTO.user2,
        })
    ).rejects.toThrow(
      new CustomErrorResponse({
        message: "email in used",
        statusCode: 401,
        typeOfError: "UNAUTHORIZED",
      })
    );
  });

  it("is not possible to create two users with the same username", async () => {
    const usersDTO = {
      user1: {
        name: "thalles",
        email: "thalles@gmail.com",
        username: "thallesgg",
        password: "mypassword123",
      },

      user2: {
        name: "jhon",
        email: "jhon@gmail.com",
        username: "thallesgg",
        password: "mypassword123",
      },
    };

    await singUpService.execute({ user: usersDTO.user1 });

    expect(
      async () =>
        await singUpService.execute({
          user: usersDTO.user2,
        })
    ).rejects.toThrow(
      new CustomErrorResponse({
        message: "username in used",
        statusCode: 401,
        typeOfError: "UNAUTHORIZED",
      })
    );
  });
});
