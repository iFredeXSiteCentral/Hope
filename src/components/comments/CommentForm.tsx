'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Loader2, MessageSquarePlus } from 'lucide-react';
import { useState } from 'react';
import { commentSchema, type CommentFormData } from '@/schemas/comment';
import { addComment } from '@/lib/firebase/firestore';
import type { CommentInput } from '@/types/comment';
import Link from 'next/link';

interface CommentFormProps {
  articleId: string;
  onCommentAdded: () => void;
}

export default function CommentForm({ articleId, onCommentAdded }: CommentFormProps) {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: '',
    },
  });

  async function onSubmit(data: CommentFormData) {
    if (!user) {
      toast({
        title: 'Please log in',
        description: 'You need to be logged in to post a comment.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    const commentInput: CommentInput = {
      content: data.content,
      articleId: articleId,
      userId: user.uid,
      userName: user.displayName || 'Anonymous',
    };

    try {
      await addComment(commentInput);
      toast({
        title: 'Comment Posted!',
        description: 'Your comment has been successfully added.',
      });
      form.reset();
      onCommentAdded(); // Refresh the comment list
    } catch (error) {
      console.error('Failed to post comment:', error);
      toast({
        title: 'Submission Failed',
        description: 'There was an error posting your comment. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (loading) {
    return <Loader2 className="h-6 w-6 animate-spin text-primary" />;
  }

  if (!user) {
    return (
      <div className="text-center p-4 border border-dashed border-border rounded-lg">
        <p className="text-muted-foreground">
          <Link href="/login" className="text-primary underline hover:text-primary/80">
            Log in
          </Link> to join the discussion.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Your Comment</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={`Commenting as ${user.displayName || 'Anonymous'}...`}
                  rows={4}
                  {...field}
                  className="bg-input border-border/80 focus:border-primary"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Posting...
            </>
          ) : (
            <>
              <MessageSquarePlus className="mr-2 h-4 w-4" />
              Post Comment
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
