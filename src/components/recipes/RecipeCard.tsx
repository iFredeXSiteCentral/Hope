import type { Recipe } from '@/types/recipe';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Utensils } from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const ingredientsPreview = recipe.ingredients.split('\n').slice(0, 3).join(', ');

  return (
    <Link href={`/recipes/${recipe.id}`} className="block group">
      <Card className="h-full flex flex-col overflow-hidden bg-card/50 hover:bg-card/80 hover:border-primary/50 border-2 border-transparent transition-all duration-300">
        <div className="relative w-full h-48">
          <Image
            src={recipe.imageUrl || `https://placehold.co/600x400.png?text=${encodeURIComponent(recipe.name)}`}
            alt={recipe.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
            data-ai-hint="food cooking"
          />
        </div>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-primary group-hover:text-primary/90 transition-colors">
            {recipe.name}
          </CardTitle>
          {recipe.userName && (
            <CardDescription className="text-xs text-muted-foreground">
              By {recipe.userName}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-foreground/80 line-clamp-3">
            {recipe.instructions.substring(0, 100)}...
          </p>
          <div className="mt-3">
             <p className="text-xs text-muted-foreground flex items-center">
                <Utensils className="w-3 h-3 mr-1.5 text-primary/70" />
                Ingredients: {ingredientsPreview}...
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
