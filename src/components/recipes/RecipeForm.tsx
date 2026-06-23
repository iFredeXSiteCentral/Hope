'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { recipeSchema, type RecipeFormData } from '@/schemas/recipe';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuth } from '@/hooks/useAuth';
import { addRecipe } from '@/lib/firebase/firestore';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import type { RecipeInput } from '@/types/recipe';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function RecipeForm() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      name: '',
      ingredients: '',
      instructions: '',
    },
  });

  async function onSubmit(data: RecipeFormData) {
    if (!user) {
      toast({
        title: 'Authentication Error',
        description: 'You must be logged in to upload a recipe.',
        variant: 'destructive',
      });
      router.push('/login?redirect=/upload');
      return;
    }

    setIsSubmitting(true);

    const recipeInput: RecipeInput = {
      ...data,
      userId: user.uid,
      userName: user.displayName || user.email || 'Anonymous',
      // imageUrl will be a placeholder or handled differently
      // For now, let's use a default placeholder.
      // Actual image upload would involve Firebase Storage and is more complex.
      imageUrl: `https://placehold.co/600x400.png?text=${encodeURIComponent(data.name)}`
    };

    try {
      const recipeId = await addRecipe(recipeInput);
      toast({
        title: 'Recipe Uploaded!',
        description: `Your recipe "${data.name}" has been successfully uploaded.`,
      });
      router.push(`/recipes/${recipeId}`);
    } catch (error) {
      console.error('Failed to upload recipe:', error);
      toast({
        title: 'Upload Failed',
        description: 'There was an error uploading your recipe. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl text-center text-primary">Share Your Culinary Creation</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipe Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Grandma's Apple Pie" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ingredients"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ingredients</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="List each ingredient on a new line. e.g.,&#10;1 cup flour&#10;2 eggs&#10;1/2 cup sugar"
                      rows={8}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instructions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instructions</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide step-by-step instructions for preparing the recipe."
                      rows={10}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Optional: Image Upload - For now, we use a placeholder.
            <FormField
              control={form.control}
              name="imageUrl" // This would be a File or string depending on implementation
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipe Image (Optional)</FormLabel>
                  <FormControl>
                    <Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files?.[0])} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isSubmitting} size="lg">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Upload Recipe'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
