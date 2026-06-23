import { z } from 'zod';

export const articleSchema = z.object({
  title: z.string().min(5, { message: "Article title must be at least 5 characters long." }).max(150, { message: "Article title must be at most 150 characters long." }),
  content: z.string().min(100, { message: "Article content must be at least 100 characters long." }),
  // imageUrl is optional and will be a placeholder for now, so not in schema for user input.
});

export type ArticleFormData = z.infer<typeof articleSchema>;
