import { Button } from "@/components/ui/button";
import { Zap, BadgePercent, Eye, ArrowRight } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    text: "Publicá fácil y rápido",
  },
  {
    icon: BadgePercent,
    text: "Regla de descuento mínimo",
  },
  {
    icon: Eye,
    text: "Visibilidad para liquidaciones",
  },
];

const SellerSection = () => {
  return (
    <section className="seller-section py-16 md:py-24 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-seller-accent/10 text-seller-accent text-sm font-medium mb-4">
                <span>Para vendedores</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                ¿Sos vendedor?<br />
                <span className="text-seller-accent">Liquidá stock rápido</span>
              </h2>
              
              <ul className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-seller-accent/10">
                      <benefit.icon className="h-5 w-5 text-seller-accent" />
                    </div>
                    <span className="text-foreground font-medium">{benefit.text}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-3">
                <a href="/vendedor/login">
                  <Button variant="seller" size="lg" className="w-full sm:w-auto group">
                    Ingresar
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </a>
                <a href="/vendedor/registro">
                  <Button variant="sellerOutline" size="lg" className="w-full sm:w-auto">
                    Crear cuenta
                  </Button>
                </a>
              </div>
            </div>

            {/* Visual */}
            <div className="hidden md:flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-seller-accent/5 rounded-3xl transform rotate-3" />
                <div className="relative bg-card rounded-3xl shadow-xl p-8 border border-border">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-12 w-12 rounded-full bg-seller-accent/20 flex items-center justify-center">
                      <Zap className="h-6 w-6 text-seller-accent" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Tu tienda</div>
                      <div className="text-sm text-muted-foreground">Panel de vendedor</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-secondary">
                      <span className="text-sm text-muted-foreground">Productos activos</span>
                      <span className="font-bold text-foreground">24</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-secondary">
                      <span className="text-sm text-muted-foreground">Reservas hoy</span>
                      <span className="font-bold text-primary">+12</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-secondary">
                      <span className="text-sm text-muted-foreground">Visitas</span>
                      <span className="font-bold text-foreground">458</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellerSection;
