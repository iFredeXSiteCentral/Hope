import { getAllArticles } from '@/lib/firebase/firestore';
import ArticleList from '@/components/articles/ArticleList';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FilePlus } from 'lucide-react';
import type { Metadata } from 'next';
import AdminCheck from '@/components/auth/AdminCheck';

export const metadata: Metadata = {
  title: "Articles | Hope's RecipeShare",
  description: "Read articles from the community.",
};

export const revalidate = 3600; // Revalidate every hour

export default async function ArticlesPage() {
  const articles = await getAllArticles();

  return (
    <div className="space-y-12">
      <section className="text-center py-12 bg-secondary/50 rounded-lg shadow">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          Community Articles
        </h1>
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto mb-8">
          Explore stories, tips, and knowledge shared by our community members.
        </p>
        <div className="flex justify-center gap-4">
          <AdminCheck>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/publish-article">
                <FilePlus className="mr-2 h-5 w-5" />
                Write an Article
              </Link>
            </Button>
          </AdminCheck>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold text-primary mb-6 text-center md:text-left">Latest Articles</h2>
        <ArticleList articles={articles} />
      </section>
    </div>
  );
}
