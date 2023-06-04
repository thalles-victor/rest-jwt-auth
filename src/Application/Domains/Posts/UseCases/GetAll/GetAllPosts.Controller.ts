import { Request, Response } from "express";

import { GetAllPostsService } from "./GetAllPosts.Service";
import { CustomErrorResponse } from "../../../../utils/CustomErrorResponse";

export class GetAllPostsController {
  constructor(private readonly getAllPostsService: GetAllPostsService) {}

  async handle(request: Request, response: Response) {
    try {
      const result = await this.getAllPostsService.execute();

      return response.status(200).json(result);
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
