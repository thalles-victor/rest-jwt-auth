import { IPostRepositoryContract } from "../../../../Infra/Contracts/Repositories/IPostRepository.Contract";

export class GetAllPostsService {
  constructor(private readonly postRepository: IPostRepositoryContract) {}

  async execute() {
    const posts = await this.postRepository.findAll();
    const response = posts.map((_post) => {
      return {
        id: _post.id,
        title: _post.title,
        content: _post.content,
        created_at: _post.created_at,
        Author: {
          name: _post.Author.name,
          username: _post.Author.username,
        },
      };
    });

    return response;
  }
}
