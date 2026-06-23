import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  fullPage?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function LoadingSpinner({ fullPage = false, className, size = 'md' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  if (fullPage) {
    return (
      <div className={cn("flex items-center justify-center h-screen w-screen fixed inset-0 bg-background/80 z-[9999]", className)}>
        <Loader2 className={cn(sizeClasses[size], "animate-spin text-primary")} />
      </div>
    );
  }
  return <Loader2 className={cn(sizeClasses[size], "animate-spin text-primary", className)} />;
}
