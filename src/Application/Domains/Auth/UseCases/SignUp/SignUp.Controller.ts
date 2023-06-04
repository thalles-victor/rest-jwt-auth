import type { Request, Response } from "express";
import { SignUpService } from "./SignUp.Service";
import { CustomErrorResponse } from "../../../../utils/CustomErrorResponse";

export class SignUpController {
  constructor(private readonly createAccountService: SignUpService) {}

  async handle(request: Request, response: Response) {
    const userDTO = request.body.user;

    try {
      const result = await this.createAccountService.execute({ user: userDTO });

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
