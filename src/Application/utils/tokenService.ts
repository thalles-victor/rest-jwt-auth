import { sign } from "jsonwebtoken";

export interface IUserPayload {
  id: string;
  name: string;
  email: string;
  username: string;
}

export const createToken = (payload: IUserPayload) => {
  return sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "2h",
  });
};

export const verifyToken = (token: string) => {};
