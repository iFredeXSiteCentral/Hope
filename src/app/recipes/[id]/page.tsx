import { getRecipeById } from '@/lib/firebase/firestore';
import RecipeDisplay from '@/components/recipes/RecipeDisplay';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface RecipePageProps {
  params: { id: string };
}

export async function generateMetadata(
  { params }: RecipePageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const recipe = await getRecipeById(params.id);
  if (!recipe) {
    return {
      title: 'Recipe Not Found',
    };
  }
  return {
    title: recipe.name,
    description: `View the recipe for ${recipe.name}: ${recipe.ingredients.substring(0, 100)}...`,
  };
}

export const revalidate = 3600; // Revalidate recipe data, e.g. every hour

export default async function RecipePage({ params }: RecipePageProps) {
  const recipe = await getRecipeById(params.id);

  if (!recipe) {
    notFound(); // Triggers the not-found.js file or default Next.js 404 page
  }

  return (
    <div className="py-8">
      <div className="mb-6">
        <Button variant="outline" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Recipes
          </Link>
        </Button>
      </div>
      <RecipeDisplay recipe={recipe} />
    </div>
  );
}
