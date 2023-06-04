import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export async function AuthMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authorizationRequest = request.headers.authorization;

  if (!authorizationRequest) {
    return response.status(400).json({
      statusCode: 400,
      message: "token required",
    });
  }

  if (!(authorizationRequest.split(" ")[0] === "Bearer")) {
    return response.status(400).json({
      statusCode: 400,
      message: "badly formatted token",
    });
  }

  const token = authorizationRequest.split(" ")[1];

  if (!token) {
    return response.status(400).json({
      statusCode: 400,
      message: "badly formatted token",
    });
  }

  let tokenIsValid;
  try {
    tokenIsValid = verify(token, process.env.JWT_SECRET as string);
  } catch (error) {
    return response.status(400).json({
      statusCode: 400,
      message: "invalid token",
    });
  }

  if (!tokenIsValid) {
    return response.status(401).json({
      statusCode: 401,
      message: "invalid token",
    });
  }

  const payload = tokenIsValid;

  request.body.payload = payload;

  next();
}
