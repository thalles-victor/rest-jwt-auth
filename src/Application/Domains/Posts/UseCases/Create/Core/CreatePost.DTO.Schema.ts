import { z } from "zod";

export const CreatePostDTOSchema = z.object({
  post: z.object({
    title: z.string(),
    content: z.string(),
  }),
});

export type CreatePostDTOSchemaType = z.infer<typeof CreatePostDTOSchema>;
