import { UserRepositoryInMemory } from "./UserRepository.InMemory";
import { PostRepositoryInMemory } from "./PostRepository.InMemory";

export const userRepositoryInMemory = new UserRepositoryInMemory();
export const postRepositoryInMemory = new PostRepositoryInMemory();
