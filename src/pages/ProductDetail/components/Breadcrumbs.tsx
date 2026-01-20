import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  category: string;
  productTitle: string;
}

export function Breadcrumbs({ category, productTitle }: BreadcrumbsProps) {
  // Truncar título si es muy largo
  const truncatedTitle = productTitle.length > 40 
    ? productTitle.substring(0, 40) + '...' 
    : productTitle;

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-1 text-sm text-muted-foreground flex-wrap">
        <li>
          <Link 
            to="/" 
            className="flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only">Inicio</span>
          </Link>
        </li>
        
        <ChevronRight className="h-4 w-4" />
        
        <li>
          <Link 
            to="/liquidaciones" 
            className="hover:text-foreground transition-colors"
          >
            Catálogo
          </Link>
        </li>
        
        <ChevronRight className="h-4 w-4" />
        
        <li>
          <Link 
            to={`/liquidaciones?category=${encodeURIComponent(category)}`} 
            className="hover:text-foreground transition-colors"
          >
            {category}
          </Link>
        </li>
        
        <ChevronRight className="h-4 w-4" />
        
        <li className="text-foreground font-medium truncate max-w-[200px] md:max-w-none">
          {truncatedTitle}
        </li>
      </ol>
    </nav>
  );
}
