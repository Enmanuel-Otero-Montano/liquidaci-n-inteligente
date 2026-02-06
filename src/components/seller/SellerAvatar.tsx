import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Store } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getInitials } from '@/utils/imageUtils';

interface SellerAvatarProps {
  /** URL o base64 de la imagen del vendedor */
  image?: string | null;
  /** Nombre comercial del vendedor */
  name: string;
  /** Tamaño del avatar */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Mostrar el nombre junto al avatar */
  showName?: boolean;
  /** Texto adicional debajo del nombre (ej: zona) */
  subtitle?: string;
  /** Clases adicionales para el contenedor */
  className?: string;
  /** Hacer clickeable (para links) */
  onClick?: () => void;
}

const sizeConfig = {
  xs: {
    avatar: 'h-5 w-5',
    text: 'text-xs',
    subtitle: 'text-[10px]',
    icon: 'h-2.5 w-2.5',
  },
  sm: {
    avatar: 'h-6 w-6',
    text: 'text-xs',
    subtitle: 'text-[10px]',
    icon: 'h-3 w-3',
  },
  md: {
    avatar: 'h-10 w-10',
    text: 'text-sm',
    subtitle: 'text-xs',
    icon: 'h-4 w-4',
  },
  lg: {
    avatar: 'h-14 w-14',
    text: 'text-base',
    subtitle: 'text-sm',
    icon: 'h-6 w-6',
  },
  xl: {
    avatar: 'h-20 w-20',
    text: 'text-lg',
    subtitle: 'text-base',
    icon: 'h-8 w-8',
  },
};

export function SellerAvatar({ 
  image, 
  name, 
  size = 'md',
  showName = true,
  subtitle,
  className,
  onClick,
}: SellerAvatarProps) {
  const config = sizeConfig[size];
  const initials = getInitials(name);
  
  const content = (
    <>
      <Avatar className={cn(config.avatar, "border border-border")}>
        <AvatarImage src={image || undefined} alt={name} />
        <AvatarFallback className="bg-primary/10 text-primary font-medium">
          {initials || <Store className={config.icon} />}
        </AvatarFallback>
      </Avatar>
      
      {showName && (
        <div className="flex flex-col min-w-0">
          <span className={cn(
            config.text, 
            "font-medium text-foreground truncate",
            onClick && "group-hover:text-primary transition-colors"
          )}>
            {name}
          </span>
          {subtitle && (
            <span className={cn(config.subtitle, "text-muted-foreground truncate")}>
              {subtitle}
            </span>
          )}
        </div>
      )}
    </>
  );

  const containerClasses = cn(
    "flex items-center gap-2",
    onClick && "group cursor-pointer",
    className
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={containerClasses}>
        {content}
      </button>
    );
  }

  return (
    <div className={containerClasses}>
      {content}
    </div>
  );
}
