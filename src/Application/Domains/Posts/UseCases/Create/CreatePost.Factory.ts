import {
  postRepositoryInMemory,
  userRepositoryInMemory,
} from "../../../../Infra/Repositories/singleton";
import { CreatePostController } from "./CreatePost.Controller";
import { CreatePostService } from "./CreatePost.Service";

export const createPostController = new CreatePostController(
  new CreatePostService(userRepositoryInMemory, postRepositoryInMemory)
);
