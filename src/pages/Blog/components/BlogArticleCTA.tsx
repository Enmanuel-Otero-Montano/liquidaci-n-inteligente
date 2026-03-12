import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function BlogArticleCTA() {
  return (
    <div className="mt-12 rounded-lg border border-border bg-muted/50 p-6 md:p-8">
      <h3 className="text-lg font-semibold mb-2">
        ¿Tenés stock para liquidar?
      </h3>
      <p className="text-muted-foreground mb-4">
        Publicá gratis en LiquiOff y llegá a miles de compradores en Uruguay.
        Sin comisiones, sin costos ocultos.
      </p>
      <Button asChild>
        <Link to="/vendedor/registro">
          Publicá gratis en LiquiOff
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
