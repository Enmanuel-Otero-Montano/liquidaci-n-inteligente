import { Search, MessageSquare, Package } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Explorá liquidaciones",
    description: "Navegá por categorías y encontrá productos con descuentos reales verificados.",
  },
  {
    icon: MessageSquare,
    title: "Reservá o consultá",
    description: "Contactá al vendedor para reservar tu producto o hacer consultas.",
  },
  {
    icon: Package,
    title: "Retirá en tienda",
    description: "Coordiná el retiro o, si está disponible, elegí envío a domicilio.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            ¿Cómo funciona?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprar en LiquiOff es simple y seguro
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="step-card animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="step-icon">
                <step.icon className="h-8 w-8" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {index + 1}
                </span>
                <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
              </div>
              <p className="text-muted-foreground text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
