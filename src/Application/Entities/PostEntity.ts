import { v4 as uuid_v4 } from "uuid";
import { UserEntity } from "./UserEntity";

interface PostEntityProps {
  title: string;
  content: string;
  Author: UserEntity;
}

export class PostEntity {
  id: string;
  title: string;
  content: string;
  Author: UserEntity;
  created_at: Date;

  constructor({ title, content, Author }: PostEntityProps) {
    this.id = uuid_v4();
    this.title = title;
    this.content = content;
    this.Author = Author;
    this.created_at = new Date();
  }
}
