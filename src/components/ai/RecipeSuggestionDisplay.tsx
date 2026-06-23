import type { RecipeSuggestionOutput } from '@/ai/flows/recipe-suggestion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Lightbulb, Utensils, ListChecks } from 'lucide-react';

interface RecipeSuggestionDisplayProps {
  suggestion: RecipeSuggestionOutput;
}

export default function RecipeSuggestionDisplay({ suggestion }: RecipeSuggestionDisplayProps) {
  return (
    <Card className="max-w-2xl mx-auto shadow-xl mt-10 border-accent">
      <CardHeader className="bg-accent/10">
        <CardTitle className="text-2xl text-primary">{suggestion.recipeName}</CardTitle>
        <CardDescription>Here's a recipe suggestion based on your input!</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <section>
          <h3 className="text-lg font-semibold text-primary mb-2 flex items-center">
            <Lightbulb className="h-5 w-5 mr-2" />
            Why this recipe?
          </h3>
          <p className="text-sm text-foreground/80 italic">{suggestion.reasoning}</p>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-primary mb-2 flex items-center">
            <Utensils className="h-5 w-5 mr-2" />
            Ingredients
          </h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-foreground/90 pl-2">
            {suggestion.ingredients.split('\n').map((ingredient, index) => (
              ingredient.trim() && <li key={index}>{ingredient.trim()}</li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-primary mb-2 flex items-center">
            <ListChecks className="h-5 w-5 mr-2" />
            Instructions
          </h3>
          <div className="space-y-2 text-sm text-foreground/90">
            {suggestion.instructions.split('\n').map((step, index) => (
              step.trim() && <p key={index}>{step.trim()}</p>
            ))}
          </div>
        </section>
      </CardContent>
    </Card>
  );
}
