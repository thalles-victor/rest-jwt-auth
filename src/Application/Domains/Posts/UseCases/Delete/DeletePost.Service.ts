import { IPostRepositoryContract } from "../../../../Infra/Contracts/Repositories/IPostRepository.Contract";
import { IUserRepositoryContract } from "../../../../Infra/Contracts/Repositories/IUserRepository.Contract";
import { CustomErrorResponse } from "../../../../utils/CustomErrorResponse";

export class DeletePostService {
  constructor(
    private readonly postRepository: IPostRepositoryContract,
    private readonly userRepository: IUserRepositoryContract
  ) {}

  async execute(post_id: string, author_id: string) {
    const postExist = await this.postRepository.findById(post_id);

    if (!postExist) {
      throw new CustomErrorResponse({
        message: "post not exist",
        statusCode: 404,
        typeOfError: "NOT_FOUND",
      });
    }

    if (postExist.Author.id !== author_id) {
      throw new CustomErrorResponse({
        message: "post does not belong to you",
        statusCode: 401,
        typeOfError: "UNAUTHORIZED",
      });
    }

    const authorExist = await this.userRepository.getById(author_id);

    if (!authorExist) {
      throw new CustomErrorResponse({
        message: "author not found",
        statusCode: 404,
        typeOfError: "NOT_FOUND",
      });
    }

    await this.postRepository.deletePostById(post_id);

    return;
  }
}
