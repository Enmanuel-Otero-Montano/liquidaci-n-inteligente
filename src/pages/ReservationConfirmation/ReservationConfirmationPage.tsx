import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { SuccessIcon } from './components/SuccessIcon';
import { ReservationSummary } from './components/ReservationSummary';
import { NextSteps } from './components/NextSteps';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Lead } from '@/types/lead';
import { Product } from '@/types/product';
import { Seller } from '@/types/seller';
import LiquiOffLogo from '@/assets/LiquiOff_logo.svg';

interface ReservationConfirmationState {
  lead: Lead;
  product: Product;
  seller?: Seller;
}

export function ReservationConfirmationPage() {
  const location = useLocation();
  const state = location.state as ReservationConfirmationState | undefined;

  // Clear state to prevent refresh from showing stale data
  useEffect(() => {
    if (state) {
      window.history.replaceState({}, document.title);
    }
  }, [state]);

  // No state - direct access without completing reservation
  if (!state) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="rounded-full bg-muted p-6 inline-flex">
            <AlertCircle className="h-12 w-12 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">No hay reserva para mostrar</h1>
            <p className="text-muted-foreground">
              Parece que llegaste aquí sin completar una reserva.
            </p>
          </div>
          <Button asChild size="lg">
            <Link to="/liquidaciones">Ver liquidaciones</Link>
          </Button>
        </div>
      </div>
    );
  }

  const { lead, product, seller } = state;
  const productUrl = `${window.location.origin}/p/${product.slug}`;

  return (
    <div className="min-h-screen bg-background">
      {/* Simple header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="flex items-center gap-2" aria-label="Ir al inicio">
            <img src={LiquiOffLogo} alt="LiquiMarket" className="h-9 w-auto" />
            <span className="text-xl font-bold text-foreground">LiquiMarket</span>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-lg mx-auto space-y-8">
          {/* Success message */}
          <div className="text-center space-y-4">
            <SuccessIcon />
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">¡Listo! Avisamos al vendedor</h1>
              <p className="text-muted-foreground">
                Tu reserva fue enviada correctamente
              </p>
            </div>
          </div>

          {/* Reservation summary */}
          <ReservationSummary product={product} lead={lead} />

          {/* CTAs */}
          <div className="space-y-3">
            <WhatsAppButton
              phoneNumber={seller?.telefono}
              productTitle={product.title}
              productUrl={productUrl}
              buyerName={lead.buyer_name}
            />
            <Button variant="outline" asChild className="w-full" size="lg">
              <Link to="/liquidaciones">Volver al catálogo</Link>
            </Button>
          </div>

          <Separator />

          {/* Next steps */}
          <NextSteps />

          {/* Legal note */}
          <div className="relative p-4 bg-muted/50 border border-muted rounded-xl">
            <AlertCircle className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-500" />
            <p className="pl-7 text-xs leading-4 text-amber-700">
              La reserva no es una compra. El vendedor te contactará para 
              coordinar el pago y la entrega del producto.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
