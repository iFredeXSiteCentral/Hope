
'use client';

import type { Recipe } from '@/types/recipe';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Utensils, ListChecks, CalendarDays, User } from 'lucide-react';
import { format } from 'date-fns';
import { useClientOnlyValue } from '@/hooks/useClientOnlyValue';

interface RecipeDisplayProps {
  recipe: Recipe;
}

export default function RecipeDisplay({ recipe }: RecipeDisplayProps) {
  const formattedDate = useClientOnlyValue(
    () => (recipe.createdAt ? format(new Date(recipe.createdAt.seconds * 1000), 'MMMM d, yyyy') : 'Date not available'),
    'Loading date...'
  );

  return (
    <Card className="max-w-4xl mx-auto shadow-2xl shadow-primary/10 overflow-hidden bg-gradient-to-b from-card to-background border-border/50">
      <CardHeader className="bg-card/30 p-6 border-b border-border/50">
        <CardTitle className="text-3xl md:text-4xl font-bold text-primary">{recipe.name}</CardTitle>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground mt-2">
            {recipe.userName && (
              <span className="flex items-center">
                <User className="h-4 w-4 mr-1.5" />
                By {recipe.userName}
              </span>
            )}
            <span className="flex items-center">
                <CalendarDays className="h-4 w-4 mr-1.5" />
                Published on {formattedDate}
            </span>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {recipe.imageUrl && (
          <div className="relative w-full h-64 md:h-96">
            <Image
              src={recipe.imageUrl}
              alt={recipe.name}
              layout="fill"
              objectFit="cover"
              data-ai-hint="recipe food"
            />
          </div>
        )}
        <div className="p-6 md:p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center">
              <Utensils className="h-6 w-6 mr-3 text-secondary" />
              Ingredients
            </h2>
            <ul className="list-disc list-inside space-y-2 text-foreground/90 pl-4 marker:text-primary">
              {recipe.ingredients.split('\\n').map((ingredient, index) => (
                ingredient.trim() && <li key={index}>{ingredient.trim()}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center">
              <ListChecks className="h-6 w-6 mr-3 text-secondary" />
              Instructions
            </h2>
            <div className="space-y-4 text-foreground/90 prose prose-invert prose-sm sm:prose-base max-w-none prose-p:text-foreground/80 prose-headings:text-primary">
              {recipe.instructions.split('\\n').map((step, index) => (
                step.trim() && <p key={index}>{step.trim()}</p>
              ))}
            </div>
          </section>
        </div>
      </CardContent>
    </Card>
  );
}
