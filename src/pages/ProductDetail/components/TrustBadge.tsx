import { ShieldCheck, FileCheck, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Product } from '@/types/product';
import { getVerificationBadgeInfo } from '@/config/verification';

interface TrustBadgeProps {
  product: Product;
}

export function TrustBadge({ product }: TrustBadgeProps) {
  const hasEvidence = !!(product.evidence_url || product.price_reference);
  const badgeInfo = getVerificationBadgeInfo(
    product.verification_status ?? 'unverified',
    hasEvidence
  );

  const IconComponent =
    badgeInfo.icon === 'shield-check'
      ? ShieldCheck
      : badgeInfo.icon === 'file-check'
        ? FileCheck
        : AlertCircle;

  const badgeClasses =
    badgeInfo.variant === 'success'
      ? 'border-green-500 text-green-700 bg-green-50 dark:bg-green-950 dark:text-green-400 dark:border-green-800'
      : badgeInfo.variant === 'warning'
        ? 'border-amber-500 text-amber-700 bg-amber-50 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800'
        : 'border-gray-400 text-gray-600 bg-gray-50 dark:bg-gray-900 dark:text-gray-400 dark:border-gray-700';

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button type="button" className="cursor-default text-left">
            <Badge
              variant="outline"
              className={`w-fit gap-2 py-1.5 px-3 ${badgeClasses}`}
            >
              <IconComponent className="h-4 w-4" />
              {badgeInfo.label}
            </Badge>
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-xs">
          <p className="text-sm">{badgeInfo.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
