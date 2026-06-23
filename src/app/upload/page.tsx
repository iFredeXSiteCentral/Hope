
'use client';

import RecipeForm from '@/components/recipes/RecipeForm';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { Metadata } from 'next';

// export const metadata: Metadata = {
// title: "Upload Recipe",
// };

export default function UploadPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (!loading && !user) {
      router.push('/login?redirect=/upload');
    }
  }, [user, loading, router]);

  if (!isClient || loading) {
    return (
      <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    // This will be brief as the redirect should kick in.
    return (
       <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
         <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="py-8">
      {/* The RecipeForm already has a Card and title, so this page is mainly a wrapper for auth check */}
      <RecipeForm />
    </div>
  );
}
