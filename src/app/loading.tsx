import LoadingSpinner from '@/components/shared/LoadingSpinner';

export default function Loading() {
  // This is a global loading UI for route transitions
  return <LoadingSpinner fullPage={true} />;
}
