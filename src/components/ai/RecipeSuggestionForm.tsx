'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Sparkles } from 'lucide-react';
import type { RecipeSuggestionInput, RecipeSuggestionOutput } from '@/ai/flows/recipe-suggestion';
import { recipeSuggestion } from '@/ai/flows/recipe-suggestion'; // Ensure this path is correct
import RecipeSuggestionDisplay from './RecipeSuggestionDisplay';
import { useToast } from '@/hooks/use-toast';


const suggestionSchema = z.object({
  preferences: z.string().min(3, "Please describe your preferences (e.g., spicy, Italian, quick meal)."),
  dietaryRestrictions: z.string().optional(),
  availableIngredients: z.string().min(3, "List some ingredients you have (e.g., chicken, rice, tomatoes)."),
});

type SuggestionFormData = z.infer<typeof suggestionSchema>;

export default function RecipeSuggestionForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<RecipeSuggestionOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<SuggestionFormData>({
    resolver: zodResolver(suggestionSchema),
    defaultValues: {
      preferences: '',
      dietaryRestrictions: '',
      availableIngredients: '',
    },
  });

  async function onSubmit(data: SuggestionFormData) {
    setIsLoading(true);
    setSuggestion(null);
    try {
      const input: RecipeSuggestionInput = {
        preferences: data.preferences,
        dietaryRestrictions: data.dietaryRestrictions || 'None',
        availableIngredients: data.availableIngredients,
      };
      const result = await recipeSuggestion(input);
      setSuggestion(result);
    } catch (error) {
      console.error('Error getting recipe suggestion:', error);
      toast({
        title: 'Suggestion Failed',
        description: 'Could not fetch a recipe suggestion at this time. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <Card className="max-w-2xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-primary">Find Your Next Meal</CardTitle>
          <CardDescription className="text-center">
            Fill in the details below and let our AI chef inspire you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="preferences"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Food Preferences</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Spicy, Vegetarian, Quick & Easy" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dietaryRestrictions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dietary Restrictions (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Gluten-free, Nut allergy, Vegan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="availableIngredients"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Available Ingredients</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Chicken breast, broccoli, pasta, olive oil"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading} size="lg">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Conjuring Recipe...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Get Suggestion
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && !suggestion && (
        <div className="text-center py-6">
          <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto" />
          <p className="mt-2 text-muted-foreground">Our AI chef is thinking...</p>
        </div>
      )}

      {suggestion && <RecipeSuggestionDisplay suggestion={suggestion} />}
    </div>
  );
}
