import { userRepositoryInMemory } from "../../../../Infra/Repositories/singleton";
import { SignUpController } from "./SignIn.Controller";
import { SignInService } from "./SignIn.Service";

const userRepository = userRepositoryInMemory;

export const signInController = new SignUpController(
  new SignInService(userRepository)
);
