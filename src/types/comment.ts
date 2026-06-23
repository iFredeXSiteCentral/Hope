import type { Timestamp } from 'firebase/firestore';

export interface Comment {
  id: string;
  articleId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: Timestamp;
}

export type CommentInput = Omit<Comment, 'id' | 'createdAt'>;
