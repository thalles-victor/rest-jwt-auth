import { UserEntity } from "../../../Entities/UserEntity";

export interface IUserRepositoryContract {
  register(userEntity: UserEntity): Promise<UserEntity>;
  getByEmail(email: string): Promise<UserEntity | null>;
  getByUsername(username: string): Promise<UserEntity | null>;
  getById(id: string): Promise<UserEntity | null>;
}
