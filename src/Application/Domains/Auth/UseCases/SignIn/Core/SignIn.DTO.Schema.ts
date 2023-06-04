import { z } from "zod";

export const SignInDTOSchema = z.object({
  user: z.object({
    email: z.string(),
    password: z.string(),
  }),
});

export type SignInDTOSchemaType = z.infer<typeof SignInDTOSchema>;
