import {
  postRepositoryInMemory,
  userRepositoryInMemory,
} from "../../../../Infra/Repositories/singleton";
import { DeletePostController } from "./DeletePost.Controller";
import { DeletePostService } from "./DeletePost.Service";

export const deletePostController = new DeletePostController(
  new DeletePostService(postRepositoryInMemory, userRepositoryInMemory)
);
