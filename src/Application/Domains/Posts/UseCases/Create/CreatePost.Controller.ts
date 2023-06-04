import type { Request, Response } from "express";
import { CreatePostService } from "./CreatePost.Service";
import { CustomErrorResponse } from "../../../../utils/CustomErrorResponse";

export class CreatePostController {
  constructor(private readonly createPostService: CreatePostService) {}

  async handle(request: Request, response: Response) {
    const postDTO = request.body.post;
    const author_id = request.body.payload.id;

    try {
      const result = await this.createPostService.execute(
        { post: postDTO },
        author_id
      );

      return response.status(201).json(result);
    } catch (error) {
      if (error instanceof CustomErrorResponse) {
        return response
          .status(error.get_statusCode())
          .json(error.get_objectOfResponse());
      }

      console.log(error);

      return response.status(500).json({
        statusCode: 500,
        message: "INTERNAL_SERVER_ERROR",
      });
    }
  }
}
