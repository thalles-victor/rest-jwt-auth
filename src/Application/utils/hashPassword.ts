import { compareSync, hashSync } from "bcrypt";

export const hashPassword = (password: string) => {
  return hashSync(password, 12);
};

export const hashPasswordValidate = (
  password: string,
  hashedPassword: string
) => {
  const isValid = compareSync(password, hashedPassword);

  return isValid;
};
