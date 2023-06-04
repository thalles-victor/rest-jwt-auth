import { userRepositoryInMemory } from "../../../../Infra/Repositories/singleton";
import { SignUpController } from "./SignUp.Controller";
import { SignUpService } from "./SignUp.Service";

const userRepository = userRepositoryInMemory;

export const createAccountController = new SignUpController(
  new SignUpService(userRepository)
);
