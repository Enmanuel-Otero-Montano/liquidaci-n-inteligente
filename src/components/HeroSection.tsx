import { Button } from "@/components/ui/button";
import { ArrowRight, Bell, ShieldCheck } from "lucide-react";

interface HeroSectionProps {
  minDiscount?: number;
}

const HeroSection = ({ minDiscount = 20 }: HeroSectionProps) => {
  return (
    <section className="hero-gradient py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="max-w-xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6">
              Todo <span className="text-primary">≥{minDiscount}% OFF</span> verificado
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 text-balance">
              Ofertas reales desde 20% OFF. Sin precios inflados. Sin trucos.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a href="/liquidaciones">
                <Button variant="hero" size="xl" className="w-full sm:w-auto group">
                  Ver liquidaciones
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
              <a href="/suscribirme">
                <Button variant="heroSecondary" size="xl" className="w-full sm:w-auto">
                  <Bell className="h-5 w-5" />
                  Avisarme de ofertas
                </Button>
              </a>
            </div>

            {/* Trust Badge */}
            <div className="trust-badge">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>Descuentos declarados por vendedores. Verificación por niveles (en progreso).</span>
            </div>
          </div>

          {/* Visual */}
          <div className="hidden lg:flex justify-center animate-slide-in-right">
            <div className="relative">
              {/* Decorative cards */}
              <div className="absolute -top-4 -left-4 w-48 h-32 rounded-2xl bg-primary/10 border border-primary/20" />
              <div className="absolute -bottom-4 -right-4 w-48 h-32 rounded-2xl bg-accent/10 border border-accent/20" />
              
              {/* Main card */}
              <div className="relative z-10 bg-card rounded-3xl shadow-2xl p-8 border border-border">
                <div className="flex items-center gap-4 mb-6">
                  <div className="discount-badge text-base px-4 py-2">
                    -{minDiscount}% OFF
                  </div>
                  <span className="text-sm text-muted-foreground">Garantizado</span>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-secondary rounded w-3/4" />
                  <div className="h-4 bg-secondary rounded w-1/2" />
                  <div className="h-4 bg-secondary rounded w-2/3" />
                </div>
                <div className="mt-6 flex gap-2">
                  <div className="h-10 w-24 bg-primary/20 rounded-lg" />
                  <div className="h-10 w-20 bg-secondary rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
