import { PostEntity } from "../../Entities/PostEntity";
import { IPostRepositoryContract } from "../Contracts/Repositories/IPostRepository.Contract";

export class PostRepositoryInMemory implements IPostRepositoryContract {
  private posts: PostEntity[];

  constructor() {
    this.posts = [];
  }

  async clearRepository() {
    this.posts = [];
  }

  async register(postEntity: PostEntity): Promise<PostEntity> {
    await this.posts.push(postEntity);

    return postEntity;
  }

  async findAll(): Promise<PostEntity[]> {
    return this.posts;
  }

  async findById(post_id: string): Promise<PostEntity | null> {
    const post = await this.posts.find((_post) => _post.id === post_id);

    return post ? post : null;
  }

  async deletePostById(post_id: string): Promise<boolean> {
    this.posts = await this.posts.filter((_post) => _post.id !== post_id);

    return true;
  }
}
