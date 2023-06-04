import { Router } from "express";
import { createAccountController } from "../Domains/Auth/UseCases/SignUp/SignUp.Factory";
import { signInController } from "../Domains/Auth/UseCases/SignIn/SignIn.Factory";

const authRouter = Router();

authRouter.post("/signUp", (request, response) => {
  return createAccountController.handle(request, response);
});

authRouter.post("/signIn", (request, response) => {
  return signInController.handle(request, response);
});

export { authRouter };
