import { v4 as uuid_v4 } from "uuid";

export interface UserEntityPropsDTO {
  name: string;
  email: string;
  username: string;
  password: string;
}

export class UserEntity {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;

  constructor({ name, email, password, username }: UserEntityPropsDTO) {
    this.id = uuid_v4();
    this.name = name;
    this.email = email;
    this.password = password;
    this.username = username;
  }
}
