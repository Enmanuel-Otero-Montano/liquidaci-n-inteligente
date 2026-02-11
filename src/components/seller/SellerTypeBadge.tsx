import { Badge } from '@/components/ui/badge';
import { Store, Tag } from 'lucide-react';
import { SellerType } from '@/types/seller';

const SELLER_TYPE_CONFIG: Record<SellerType, { label: string; icon: typeof Store; className: string }> = {
  tienda_fisica: { label: 'Tienda', icon: Store, className: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  marca_emprendimiento: { label: 'Marca', icon: Tag, className: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
};

export function SellerTypeBadge({ type }: { type?: SellerType | string }) {
  const config = SELLER_TYPE_CONFIG[(type as SellerType)] ?? SELLER_TYPE_CONFIG.marca_emprendimiento;
  const Icon = config.icon;

  return (
    <Badge variant="outline" className={`gap-1 text-xs ${config.className}`}>
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
}
