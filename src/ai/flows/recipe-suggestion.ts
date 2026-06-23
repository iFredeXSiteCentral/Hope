// recipe-suggestion.ts
'use server';

/**
 * @fileOverview Personalized recipe recommendations based on user preferences, dietary restrictions, and available ingredients.
 *
 * - recipeSuggestion - A function that provides recipe suggestions.
 * - RecipeSuggestionInput - The input type for the recipeSuggestion function.
 * - RecipeSuggestionOutput - The return type for the recipeSuggestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecipeSuggestionInputSchema = z.object({
  preferences: z
    .string()
    .describe('The user food preferences (e.g., spicy, vegetarian).'),
  dietaryRestrictions: z
    .string()
    .describe('The user dietary restrictions (e.g., gluten-free, nut allergies).'),
  availableIngredients: z
    .string()
    .describe('The ingredients the user has available (e.g., chicken, rice, vegetables).'),
});
export type RecipeSuggestionInput = z.infer<typeof RecipeSuggestionInputSchema>;

const RecipeSuggestionOutputSchema = z.object({
  recipeName: z.string().describe('The name of the suggested recipe.'),
  ingredients: z.string().describe('A list of ingredients for the suggested recipe.'),
  instructions: z.string().describe('Step-by-step instructions for the suggested recipe.'),
  reasoning: z
    .string()
    .describe('The reasoning behind choosing this recipe based on the user input.'),
});
export type RecipeSuggestionOutput = z.infer<typeof RecipeSuggestionOutputSchema>;

export async function recipeSuggestion(input: RecipeSuggestionInput): Promise<RecipeSuggestionOutput> {
  return recipeSuggestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recipeSuggestionPrompt',
  input: {schema: RecipeSuggestionInputSchema},
  output: {schema: RecipeSuggestionOutputSchema},
  prompt: `You are a professional recipe recommender. A user will provide you with their food preferences, dietary restrictions, and available ingredients. Based on these details, suggest a recipe that they would enjoy and can easily make. Explain your reasoning for choosing this recipe.

User Preferences: {{{preferences}}}
Dietary Restrictions: {{{dietaryRestrictions}}}
Available Ingredients: {{{availableIngredients}}}

Provide the recipe name, a list of ingredients, step-by-step instructions, and your reasoning for choosing this recipe.`,
});

const recipeSuggestionFlow = ai.defineFlow(
  {
    name: 'recipeSuggestionFlow',
    inputSchema: RecipeSuggestionInputSchema,
    outputSchema: RecipeSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
