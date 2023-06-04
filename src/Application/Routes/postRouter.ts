import { Router } from "express";

import { createPostController } from "../Domains/Posts/UseCases/Create/CreatePost.Factory";
import { AuthMiddleware } from "../utils/Middlewares/AuthMiddleware";
import { deletePostController } from "../Domains/Posts/UseCases/Delete/DeletePost.Factory";
import { getAllPostController } from "../Domains/Posts/UseCases/GetAll/GetAllPosts.Factory";

const postRouter = Router();

postRouter.post("/", AuthMiddleware, (request, response) => {
  return createPostController.handle(request, response);
});

postRouter.delete("/:id", AuthMiddleware, (request, response) => {
  return deletePostController.handle(request, response);
});

postRouter.get("/", (request, response) => {
  return getAllPostController.handle(request, response);
});

export { postRouter };
