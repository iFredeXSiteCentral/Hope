
'use client';

import type { Article } from '@/types/article';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, User } from 'lucide-react';
import { format } from 'date-fns';
import { useClientOnlyValue } from '@/hooks/useClientOnlyValue';

interface ArticleDisplayProps {
  article: Article;
}

export default function ArticleDisplay({ article }: ArticleDisplayProps) {
  const formattedDate = useClientOnlyValue(
    () => (article.createdAt ? format(new Date(article.createdAt.seconds * 1000), 'MMMM d, yyyy') : 'Date not available'),
    'Loading date...'
  );

  return (
    <Card className="max-w-4xl mx-auto shadow-2xl shadow-primary/10 overflow-hidden bg-gradient-to-b from-card to-background border-border/50">
      <CardHeader className="bg-card/30 p-6 border-b border-border/50">
        <CardTitle className="text-3xl md:text-4xl font-bold text-primary">{article.title}</CardTitle>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground mt-2">
            {article.userName && (
              <span className="flex items-center">
                <User className="h-4 w-4 mr-1.5" />
                By {article.userName}
              </span>
            )}
            <span className="flex items-center">
                <CalendarDays className="h-4 w-4 mr-1.5" />
                Published on {formattedDate}
            </span>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {article.imageUrl && (
          <div className="relative w-full h-64 md:h-96">
            <Image
              src={article.imageUrl}
              alt={article.title}
              layout="fill"
              objectFit="cover"
              data-ai-hint="article blog"
            />
          </div>
        )}
        <div className="p-6 md:p-8 space-y-6">
            <div className="prose prose-invert prose-lg max-w-none text-foreground/90 prose-p:text-foreground/80 prose-headings:text-primary">
              {article.content.split('\\n').map((paragraph, index) => (
                paragraph.trim() && <p key={index}>{paragraph.trim()}</p>
              ))}
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
