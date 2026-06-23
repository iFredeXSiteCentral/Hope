'use client';

import ArticleForm from '@/components/articles/ArticleForm';
import { useAuth } from '@/hooks/useAuth';
import { Loader2, ShieldAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Admin UID from environment variables
const ADMIN_UID = process.env.NEXT_PUBLIC_FIREBASE_ADMIN_UID;

export default function PublishArticlePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect=/publish-article');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  // After loading, if there's no user or the user is not the admin, deny access.
  if (!user || user.uid !== ADMIN_UID) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center">
        <ShieldAlert className="w-16 h-16 text-destructive mb-4" />
        <h1 className="text-2xl font-bold text-primary mb-2">Permission Denied</h1>
        <p className="text-foreground/80">You do not have permission to view this page.</p>
      </div>
    );
  }

  // If user is the admin, show the form
  return (
    <div className="py-8">
      <ArticleForm />
    </div>
  );
}
