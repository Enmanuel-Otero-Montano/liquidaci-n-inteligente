import { Bell } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { SuscripcionForm } from './components/SuscripcionForm';
import { useSubscriberCount } from '@/hooks/useSubscriberCount';

export function SuscripcionPage() {
  const { data: subscriberCount = 0 } = useSubscriberCount();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-primary/5 to-background">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container max-w-lg mx-auto px-4">
          {/* Hero */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
              <Bell className="h-8 w-8 text-accent" />
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Recibí las mejores liquidaciones
            </h1>
            
            <p className="text-muted-foreground max-w-md mx-auto">
              Te avisamos cuando lleguen ofertas en las categorías que te interesan. 
              Sin spam, solo descuentos reales.
            </p>

            {subscriberCount > 0 && (
              <p className="text-sm text-accent font-medium mt-4">
                +{subscriberCount} personas ya se suscribieron
              </p>
            )}
          </div>

          {/* Form Card */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <SuscripcionForm />
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
