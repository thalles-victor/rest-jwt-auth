import { describe, it, expect, beforeEach, beforeAll } from "vitest";

import { SignUpService } from "../../../../Auth/UseCases/SignUp/SignUp.Service";
import { CreatePostService } from "../CreatePost.Service";
import {
  postRepositoryInMemory,
  userRepositoryInMemory,
} from "../../../../../Infra/Repositories/singleton";
import { CustomErrorResponse } from "../../../../../utils/CustomErrorResponse";

describe("tests when creating posts", () => {
  const signUpService = new SignUpService(userRepositoryInMemory);
  const createPostService = new CreatePostService(
    userRepositoryInMemory,
    postRepositoryInMemory
  );

  beforeEach(async () => {
    userRepositoryInMemory.clearRepository();
    postRepositoryInMemory.clearRepository();
  });

  it("it is possible to create a post with the correct data", async () => {
    const userCreated = await signUpService.execute({
      user: {
        name: "jhon",
        email: "jhon@gmail.com",
        username: "jhongg",
        password: "jhonpassword123",
      },
    });

    const postRequestDTO = {
      post: {
        title: "Criando testes com vitest",
        content: "Criando testes com vitest....",
      },
    };

    const postCreated = await createPostService.execute(
      {
        post: postRequestDTO.post,
      },
      userCreated.user.id
    );

    expect(postCreated.title).toBe(postRequestDTO.post.title);
    expect(postCreated.content).toBe(postRequestDTO.post.content);
    expect(postCreated).toHaveProperty("created_at");
  });

  it("it is not possible to create a post with an unregistered author", async () => {
    const postRequestDTO = {
      post: {
        title: "Criando testes com vitest",
        content: "Criando testes com vitest....",
      },
    };

    expect(
      async () =>
        await createPostService.execute(
          {
            post: postRequestDTO.post,
          },
          "user_id_not_exist"
        )
    ).rejects.toThrow(
      new CustomErrorResponse({
        message: "author not found",
        statusCode: 404,
        typeOfError: "NOT_FOUND",
      })
    );
  });
});
