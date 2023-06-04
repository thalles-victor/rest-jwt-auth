import { z } from "zod";

export const CreateAccountDTOSchema = z.object({
  user: z.object({
    name: z.string(),
    email: z.string().email({ message: "email field must be a email" }),
    username: z.string(),
    password: z
      .string()
      .min(6, { message: "the password must contain 10 characters" }),
  }),
});

export type CreateAccountDTOSchemaType = z.infer<typeof CreateAccountDTOSchema>;
