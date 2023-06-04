import { describe, it, expect, beforeEach, beforeAll } from "vitest";

import { SignUpService } from "../../../../Auth/UseCases/SignUp/SignUp.Service";
import { CreatePostService } from "../../Create/CreatePost.Service";
import { DeletePostService } from "../DeletePost.Service";

import {
  postRepositoryInMemory,
  userRepositoryInMemory,
} from "../../../../../Infra/Repositories/singleton";
import { CustomErrorResponse } from "../../../../../utils/CustomErrorResponse";

describe("tests when deleting a post", async () => {
  const signUpService = new SignUpService(userRepositoryInMemory);
  const createPostService = new CreatePostService(
    userRepositoryInMemory,
    postRepositoryInMemory
  );
  const deletePostService = new DeletePostService(
    postRepositoryInMemory,
    userRepositoryInMemory
  );

  beforeEach(async () => {
    postRepositoryInMemory.clearRepository();
    userRepositoryInMemory.clearRepository();
  });

  it("is possible to delete a post that already exist", async () => {
    const authorCreated = await signUpService.execute({
      user: {
        name: "jhon",
        email: "jhon@gmail.com",
        username: "@jhongg",
        password: "mypassword123",
      },
    });

    const createPostRequestDTO = {
      title: "Descomplicando kubernets",
      content: "kubernetes é um orquestrador de containers....",
    };

    const postCreated = await createPostService.execute(
      {
        post: createPostRequestDTO,
      },
      authorCreated.user.id
    );

    //delete post
    expect(
      async () =>
        await deletePostService.execute(postCreated.id, authorCreated.user.id)
    ).not.toThrow();
  });

  it("unable to delete a post that does not exist", async () => {
    const authorCreated = await signUpService.execute({
      user: {
        name: "jhon",
        email: "jhon@gmail.com",
        username: "@jhongg",
        password: "mypassword123",
      },
    });

    //delete post
    expect(
      async () =>
        await deletePostService.execute(
          "post_id_not_exist",
          authorCreated.user.id
        )
    ).rejects.toThrow(
      new CustomErrorResponse({
        message: "post not exist",
        statusCode: 404,
        typeOfError: "NOT_FOUND",
      })
    );
  });

  it("is not possible to delete a post by another author", async () => {
    const authors = {
      author1: await signUpService.execute({
        user: {
          name: "jhon",
          email: "jhon@gmail.com",
          username: "@jhongg",
          password: "mypassword123",
        },
      }),

      author2: await signUpService.execute({
        user: {
          name: "marry",
          email: "marry@gmail.com",
          username: "@marry",
          password: "mypassword123",
        },
      }),
    };

    const postByAuthor1 = await createPostService.execute(
      {
        post: {
          title: "Context API no react",
          content: "context api é uma forma...",
        },
      },
      authors.author1.user.id
    );

    //delete post
    expect(
      async () =>
        await deletePostService.execute(
          postByAuthor1.id,
          authors.author2.user.id
        )
    ).rejects.toThrow(
      new CustomErrorResponse({
        message: "post does not belong to you",
        statusCode: 401,
        typeOfError: "UNAUTHORIZED",
      })
    );
  });
});
