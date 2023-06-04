import { PostEntity } from "../../../../Entities/PostEntity";
import { UserEntity } from "../../../../Entities/UserEntity";
import { IPostRepositoryContract } from "../../../../Infra/Contracts/Repositories/IPostRepository.Contract";
import { IUserRepositoryContract } from "../../../../Infra/Contracts/Repositories/IUserRepository.Contract";
import { CustomErrorResponse } from "../../../../utils/CustomErrorResponse";
import { hashPasswordValidate } from "../../../../utils/hashPassword";
import { hashPassword } from "../../../../utils/hashPassword";
import { IUserPayload, createToken } from "../../../../utils/tokenService";
import {
  CreatePostDTOSchema,
  CreatePostDTOSchemaType,
} from "./Core/CreatePost.DTO.Schema";

export class CreatePostService {
  constructor(
    private readonly userRepository: IUserRepositoryContract,
    private readonly postRepository: IPostRepositoryContract
  ) {}

  async execute({ post }: CreatePostDTOSchemaType, author_id: string) {
    const inputDTOValidate = CreatePostDTOSchema.safeParse({ post });

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

    const author = await this.userRepository.getById(author_id);

    if (!author) {
      throw new CustomErrorResponse({
        message: "author not found",
        statusCode: 404,
        typeOfError: "NOT_FOUND",
      });
    }

    const postEntity = new PostEntity({
      title: post.title,
      content: post.content,
      Author: author,
    });

    const postCreated = await this.postRepository.register(postEntity);

    const response = {
      id: postCreated.id,
      title: postCreated.title,
      content: postCreated.content,
      created_at: postCreated.created_at,
      Author: {
        id: postCreated.Author.id,
        name: postCreated.Author.name,
        username: postCreated.Author.username,
      },
    };

    return response;
  }
}
