import { postRepositoryInMemory } from "../../../../Infra/Repositories/singleton";
import { GetAllPostsController } from "./GetAllPosts.Controller";
import { GetAllPostsService } from "./GetAllPosts.Service";

export const getAllPostController = new GetAllPostsController(
  new GetAllPostsService(postRepositoryInMemory)
);
