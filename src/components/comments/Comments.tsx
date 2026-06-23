'use client';

import { useState, useEffect, useCallback } from 'react';
import { getCommentsForArticle } from '@/lib/firebase/firestore';
import type { Comment } from '@/types/comment';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import { Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface CommentsProps {
  articleId: string;
}

export default function Comments({ articleId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = useCallback(async () => {
    try {
      setIsLoading(true);
      const fetchedComments = await getCommentsForArticle(articleId);
      setComments(fetchedComments);
      setError(null);
    } catch (err) {
      console.error('Error fetching comments:', err);
      setError('Failed to load comments. Please try refreshing the page.');
    } finally {
      setIsLoading(false);
    }
  }, [articleId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <section className="max-w-4xl mx-auto mt-8 py-8">
      <h2 className="text-2xl font-bold text-primary mb-6">Discussion ({comments.length})</h2>
      
      <div className="mb-8">
        <CommentForm articleId={articleId} onCommentAdded={fetchComments} />
      </div>

      <Separator className="my-8 bg-border/50" />

      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-4 text-muted-foreground">Loading comments...</p>
        </div>
      )}

      {!isLoading && error && (
        <p className="text-center text-destructive">{error}</p>
      )}

      {!isLoading && !error && comments.length === 0 && (
        <p className="text-center text-muted-foreground py-8">Be the first to comment!</p>
      )}

      {!isLoading && !error && comments.length > 0 && (
        <CommentList comments={comments} />
      )}
    </section>
  );
}
