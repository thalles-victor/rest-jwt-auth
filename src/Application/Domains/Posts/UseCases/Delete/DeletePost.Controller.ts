import type { Request, Response } from "express";
import { DeletePostService } from "./DeletePost.Service";
import {
  CustomErrorResponse,
  defaultInternalServerError,
} from "../../../../utils/CustomErrorResponse";

export class DeletePostController {
  constructor(private readonly deletePostService: DeletePostService) {}

  async handle(request: Request, response: Response) {
    const post_id = request.params.id;
    const author_id = request.body.payload.id;

    try {
      const result = await this.deletePostService.execute(post_id, author_id);

      return response.status(200).json(result);
    } catch (error) {
      if (error instanceof CustomErrorResponse) {
        return response
          .status(error.get_statusCode())
          .json(error.get_objectOfResponse());
      }

      console.log(error);

      return response
        .status(defaultInternalServerError.get_statusCode())
        .json(defaultInternalServerError.get_objectOfResponse());
    }
  }
}
