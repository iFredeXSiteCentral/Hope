'use client';

import Link from 'next/link';
import { ChefHat, HomeIcon, Sparkles, UploadCloud, BookText } from 'lucide-react';
import UserNav from '@/components/auth/UserNav';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home', icon: HomeIcon },
  { href: '/articles', label: 'Articles', icon: BookText },
  { href: '/ai-suggestions', label: 'AI Suggestions', icon: Sparkles },
  { href: '/upload', label: 'Upload Recipe', icon: UploadCloud },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-background/80 backdrop-blur-sm border-b border-border/50 shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
          <ChefHat className="h-8 w-8" />
          <span className="text-2xl font-bold">Hope's RecipeShare</span>
        </Link>
        <nav className="flex items-center gap-4 md:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium text-foreground/70 hover:text-primary transition-colors flex items-center gap-1",
                pathname.startsWith(item.href) && item.href !== '/' || pathname === item.href ? "text-primary font-semibold" : ""
              )}
            >
              <item.icon className="h-4 w-4 sm:hidden" />
              <span className="hidden sm:inline">{item.label}</span>
            </Link>
          ))}
          <UserNav />
        </nav>
      </div>
    </header>
  );
}
