import type { Timestamp } from 'firebase/firestore';

export interface Recipe {
  id: string;
  name: string;
  ingredients: string; // Newline-separated for textarea, can be parsed into array for display
  instructions: string;
  imageUrl?: string; // Placeholder or actual image URL
  userId: string; // Firebase User UID
  userName?: string; // Display name of the user who uploaded
  createdAt: Timestamp;
  // featured?: boolean; // Optional: for featuring on homepage
}

export type RecipeInput = Omit<Recipe, 'id' | 'createdAt' | 'userId' | 'userName'> & {
  userId: string;
  userName?: string;
};
