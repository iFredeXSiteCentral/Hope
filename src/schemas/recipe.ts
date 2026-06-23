import { z } from 'zod';

export const recipeSchema = z.object({
  name: z.string().min(3, { message: "Recipe name must be at least 3 characters long." }).max(100, { message: "Recipe name must be at most 100 characters long." }),
  ingredients: z.string().min(10, { message: "Ingredients must be at least 10 characters long." }),
  instructions: z.string().min(20, { message: "Instructions must be at least 20 characters long." }),
  // imageUrl is optional and will be a placeholder for now, so not in schema for user input.
});

export type RecipeFormData = z.infer<typeof recipeSchema>;
