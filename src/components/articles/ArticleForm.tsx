'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { articleSchema, type ArticleFormData } from '@/schemas/article';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuth } from '@/hooks/useAuth';
import { addArticle } from '@/lib/firebase/firestore';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import type { ArticleInput } from '@/types/article';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function ArticleForm() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  async function onSubmit(data: ArticleFormData) {
    if (!user) {
      toast({
        title: 'Authentication Error',
        description: 'You must be logged in to publish an article.',
        variant: 'destructive',
      });
      router.push('/login?redirect=/publish-article');
      return;
    }

    setIsSubmitting(true);

    const articleInput: ArticleInput = {
      ...data,
      userId: user.uid,
      userName: user.displayName || user.email || 'Anonymous',
      imageUrl: `https://placehold.co/800x400.png?text=${encodeURIComponent(data.title)}`
    };

    try {
      const articleId = await addArticle(articleInput);
      toast({
        title: 'Article Published!',
        description: `Your article "${data.title}" has been successfully published.`,
      });
      router.push(`/articles/${articleId}`);
    } catch (error) {
      console.error('Failed to publish article:', error);
      toast({
        title: 'Publish Failed',
        description: 'There was an error publishing your article. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="max-w-4xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-3xl text-center text-primary">Write a New Article</CardTitle>
        <CardDescription className="text-center">Share your story, knowledge, or ideas with the community.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Article Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., The Secret to Perfect Sourdough" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your article content here. You can use Markdown for formatting."
                      rows={15}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isSubmitting} size="lg">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                'Publish Article'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
