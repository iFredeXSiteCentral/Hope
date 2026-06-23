import { getArticleById } from '@/lib/firebase/firestore';
import ArticleDisplay from '@/components/articles/ArticleDisplay';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Comments from '@/components/comments/Comments';

interface ArticlePageProps {
  params: { id: string };
}

export async function generateMetadata(
  { params }: ArticlePageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const article = await getArticleById(params.id);
  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }
  return {
    title: article.title,
    description: `${article.content.substring(0, 160)}...`,
  };
}

export const revalidate = 3600; // Revalidate article data every hour

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticleById(params.id);

  if (!article) {
    notFound();
  }

  return (
    <div className="py-8">
      <div className="mb-6">
        <Button variant="outline" asChild>
          <Link href="/articles">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Articles
          </Link>
        </Button>
      </div>
      <ArticleDisplay article={article} />
      <Comments articleId={article.id} />
    </div>
  );
}
