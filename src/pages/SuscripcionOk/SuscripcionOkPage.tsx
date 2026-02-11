import { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Home } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CATEGORIAS } from '@/data/constants';
import type { Subscriber } from '@/types/subscription';

interface LocationState {
  subscriber: Subscriber;
}

export function SuscripcionOkPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | undefined;

  // Limpiar state del historial para evitar resubmits
  useEffect(() => {
    if (state) {
      window.history.replaceState({}, document.title);
    }
  }, [state]);

  // Redirigir si no hay datos
  if (!state?.subscriber) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-12">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              No hay suscripción para mostrar.
            </p>
            <Button onClick={() => navigate('/suscribirme')}>
              Ir a suscribirme
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const { subscriber } = state;
  
  const getCategoryLabels = (values: string[]) => {
    if (values.includes('todas')) {
      return ['Todas las categorías'];
    }
    return values.map(v => 
      CATEGORIAS.find(c => c.value === v)?.label || v
    );
  };

  const categoryLabels = getCategoryLabels(subscriber.categorias);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-accent/5 to-background">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container max-w-lg mx-auto px-4">
          {/* Success Icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/10 mb-6 animate-scale-in">
              <CheckCircle className="h-12 w-12 text-accent" />
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              ¡Listo! Ya estás en la lista
            </h1>
            
            <p className="text-muted-foreground">
              Te avisaremos cuando lleguen liquidaciones en tus categorías.
            </p>
          </div>

          {/* Summary Card */}
          <Card className="mb-8 border-0 shadow-lg">
            <CardContent className="p-6 space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Suscripción a nombre de</p>
                <p className="font-medium">{subscriber.nombre}</p>
                <p className="text-sm text-muted-foreground">
                  {subscriber.metodoContacto === 'email' ? '📧' : '📱'} {subscriber.contacto}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Categorías de interés</p>
                <div className="flex flex-wrap gap-2">
                  {categoryLabels.map((label) => (
                    <Badge key={label} variant="secondary">
                      {label}
                    </Badge>
                  ))}
                </div>
              </div>

              {subscriber.metodoContacto === 'whatsapp' && (
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    💡 Guardá nuestro número para recibir las ofertas:{' '}
                    <span className="font-medium text-foreground">099 XXX XXX</span>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* What's Next */}
          <Card className="mb-8 bg-muted/50 border-0">
            <CardContent className="p-6">
              <h2 className="font-semibold mb-4">¿Qué sigue?</h2>
              <ol className="space-y-3">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-accent-foreground text-sm font-medium flex items-center justify-center">
                    1
                  </span>
                  <span className="text-sm">
                    Cuando lleguen nuevas liquidaciones en tus categorías, te avisamos
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-accent-foreground text-sm font-medium flex items-center justify-center">
                    2
                  </span>
                  <span className="text-sm">
                    Vas a ver los productos antes que nadie
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-accent-foreground text-sm font-medium flex items-center justify-center">
                    3
                  </span>
                  <span className="text-sm">
                    Reservás lo que te guste y coordinás con el vendedor
                  </span>
                </li>
              </ol>
            </CardContent>
          </Card>

          {/* CTAs */}
          <div className="space-y-3">
            <Button asChild size="lg" className="w-full">
              <Link to="/liquidaciones">
                Ver productos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            
            <Button asChild variant="ghost" size="lg" className="w-full">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Volver al inicio
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
