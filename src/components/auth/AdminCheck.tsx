'use client';

import { useAuth } from '@/hooks/useAuth';
import type { ReactNode } from 'react';

// Admin UID from environment variables
const ADMIN_UID = process.env.NEXT_PUBLIC_FIREBASE_ADMIN_UID;

interface AdminCheckProps {
  children: ReactNode;
}

/**
 * A client component that renders its children only if the authenticated user is the admin.
 */
export default function AdminCheck({ children }: AdminCheckProps) {
  const { user, loading } = useAuth();

  if (loading) {
    // Optionally return a skeleton or null while loading
    return null; 
  }

  if (user && user.uid === ADMIN_UID) {
    return <>{children}</>;
  }

  return null;
}
