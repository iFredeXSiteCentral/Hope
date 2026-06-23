import { z } from 'zod';

export const commentSchema = z.object({
  content: z.string().min(1, { message: "Comment cannot be empty." }).max(2000, { message: "Comment cannot be longer than 2000 characters." }),
});

export type CommentFormData = z.infer<typeof commentSchema>;
