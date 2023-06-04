import { PostEntity } from "../../../Entities/PostEntity";

export interface IPostRepositoryContract {
  register(postEntity: PostEntity): Promise<PostEntity>;
  findAll(): Promise<PostEntity[]>;
  findById(post_id: string): Promise<PostEntity | null>;
  deletePostById(post_id: string): Promise<boolean>;
}
