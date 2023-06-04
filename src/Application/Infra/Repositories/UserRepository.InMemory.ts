import { UserEntity } from "../../Entities/UserEntity";
import { IUserRepositoryContract } from "../Contracts/Repositories/IUserRepository.Contract";

export class UserRepositoryInMemory implements IUserRepositoryContract {
  private users: UserEntity[];

  constructor() {
    this.users = [];
  }

  async clearRepository() {
    this.users = [];
  }

  async register(userEntity: UserEntity): Promise<UserEntity> {
    await this.users.push(userEntity);

    return userEntity;
  }

  async getByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.users.find((_user) => _user.email === email);

    return user ? user : null;
  }

  async getByUsername(username: string): Promise<UserEntity | null> {
    const user = await this.users.find((_user) => _user.username === username);

    return user ? user : null;
  }

  async getById(id: string): Promise<UserEntity | null> {
    const user = await this.users.find((_user) => _user.id === id);

    return user ? user : null;
  }
}
