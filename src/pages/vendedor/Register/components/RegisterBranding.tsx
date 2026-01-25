import { Check, Rocket } from 'lucide-react';

const benefits = [
  'Alta en minutos',
  'Sin comisiones fijas',
  'Llegá a más clientes',
  'Control total de tu tienda',
];

const stats = [
  { value: '+150', label: 'vendedores activos' },
  { value: '+2,500', label: 'productos publicados' },
];

export function RegisterBranding() {
  return (
    <div className="hidden lg:flex flex-col justify-center items-center p-12 bg-gradient-to-br from-primary/5 via-primary/10 to-accent/5 rounded-3xl">
      <div className="max-w-sm text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Rocket className="h-8 w-8 text-primary" />
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-3">
          Empezá a vender hoy
        </h2>

        <p className="text-muted-foreground mb-8">
          Unite a nuestra comunidad de vendedores y conectá con compradores listos para aprovechar tus liquidaciones
        </p>

        <ul className="space-y-3 mb-10">
          {benefits.map((benefit) => (
            <li key={benefit} className="flex items-center gap-3 text-left">
              <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Check className="h-3 w-3 text-accent" />
              </div>
              <span className="text-foreground">{benefit}</span>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-center gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 p-4 bg-background/50 rounded-xl border border-border/50">
          <div className="text-sm text-muted-foreground mb-2 font-medium">
            ¿Por qué elegirnos?
          </div>
          <p className="text-sm text-foreground/80">
            Somos el marketplace especializado en liquidaciones. 
            Tus productos llegan a compradores que buscan exactamente 
            lo que vendés: stock con descuentos reales.
          </p>
        </div>
      </div>
    </div>
  );
}
