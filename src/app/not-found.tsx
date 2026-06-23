import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center px-4">
      <AlertTriangle className="w-24 h-24 text-destructive mb-6" />
      <h1 className="text-5xl font-bold text-primary mb-4">404 - Page Not Found</h1>
      <p className="text-xl text-foreground/80 mb-8 max-w-md">
        Oops! The page you're looking for doesn't seem to exist. Maybe it was moved or you mistyped the URL.
      </p>
      <Button asChild size="lg">
        <Link href="/">Go Back to Homepage</Link>
      </Button>
    </div>
  )
}
