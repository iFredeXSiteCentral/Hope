import type { Timestamp } from 'firebase/firestore';

export interface Article {
  id: string;
  title: string;
  content: string; // The main body of the article
  imageUrl?: string; // Optional cover image URL
  userId: string; // Firebase User UID
  userName?: string; // Display name of the user who published
  createdAt: Timestamp;
}

export type ArticleInput = Omit<Article, 'id' | 'createdAt' | 'userId' | 'userName'> & {
  userId: string;
  userName?: string;
};
