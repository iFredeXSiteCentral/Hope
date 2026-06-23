import type { Article } from '@/types/article';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { format } from 'date-fns';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const formattedDate = article.createdAt ? format(new Date(article.createdAt.seconds * 1000), 'MMMM d, yyyy') : '';

  return (
    <Link href={`/articles/${article.id}`} className="block group">
      <Card className="h-full flex flex-col overflow-hidden bg-card/50 hover:bg-card/80 hover:border-primary/50 border-2 border-transparent transition-all duration-300">
        <div className="relative w-full h-48">
          <Image
            src={article.imageUrl || `https://placehold.co/600x400.png?text=${encodeURIComponent(article.title)}`}
            alt={article.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
            data-ai-hint="writing article"
          />
        </div>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-primary group-hover:text-primary/90 transition-colors">
            {article.title}
          </CardTitle>
          {article.userName && (
            <CardDescription className="text-xs text-muted-foreground">
              By {article.userName} on {formattedDate}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-foreground/80 line-clamp-4">
            {article.content.substring(0, 150)}...
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
