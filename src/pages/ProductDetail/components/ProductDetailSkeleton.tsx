import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

export function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-6 md:py-10">
      {/* Breadcrumb skeleton */}
      <div className="flex gap-2 mb-6">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-32" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Galería skeleton */}
        <div className="space-y-4">
          <Skeleton className="aspect-[4/3] w-full rounded-lg" />
          <div className="flex gap-2">
            <Skeleton className="h-16 w-16 md:h-20 md:w-20 rounded-md" />
            <Skeleton className="h-16 w-16 md:h-20 md:w-20 rounded-md" />
            <Skeleton className="h-16 w-16 md:h-20 md:w-20 rounded-md" />
          </div>
        </div>

        {/* Info skeleton */}
        <div className="space-y-6">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-6 w-40" />
          
          <Separator />
          
          <div className="space-y-2">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-10 w-40" />
          </div>

          <Skeleton className="h-6 w-36" />
          
          <Separator />
          
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />

          <div className="space-y-2">
            <Skeleton className="h-6 w-28" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
