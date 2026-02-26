import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FoundingBadgeProps {
  className?: string;
}

export function FoundingBadge({ className }: FoundingBadgeProps) {
  return (
    <Badge
      className={cn(
        'bg-amber-500 text-white border-amber-600 gap-1',
        className
      )}
    >
      <Star className="h-3 w-3 fill-current" />
      Fundador
    </Badge>
  );
}
