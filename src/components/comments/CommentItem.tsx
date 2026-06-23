
'use client';

import type { Comment } from '@/types/comment';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { UserCircle } from 'lucide-react';
import { useClientOnlyValue } from '@/hooks/useClientOnlyValue';

interface CommentItemProps {
  comment: Comment;
}

export default function CommentItem({ comment }: CommentItemProps) {
  const timeAgo = useClientOnlyValue(
    () => comment.createdAt ? formatDistanceToNow(new Date(comment.createdAt.seconds * 1000), { addSuffix: true }) : '',
    ''
  );

  return (
    <div className="flex items-start gap-4 p-4 rounded-lg bg-card/50">
      <Avatar className="h-10 w-10 border-2 border-primary/50">
        <AvatarImage src={undefined} alt={comment.userName} />
        <AvatarFallback>
            <UserCircle className="h-6 w-6 text-primary" />
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-primary">{comment.userName}</p>
          <p className="text-xs text-muted-foreground">{timeAgo}</p>
        </div>
        <p className="text-sm text-foreground/90 mt-1">{comment.content}</p>
      </div>
    </div>
  );
}
