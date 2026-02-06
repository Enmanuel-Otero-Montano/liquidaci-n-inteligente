import { Check, Store } from 'lucide-react';

const benefits = [
  'Sin comisiones fijas',
  'Tus clientes te contactan directo',
  'Control total de tu tienda',
];

const stats = [
  { value: '5 min', label: 'para publicar' },
  { value: '24/7', label: 'tu tienda abierta' },
];

export function LoginBranding() {
  return (
    <div className="hidden lg:flex flex-col justify-center items-center p-12 bg-gradient-to-br from-primary/5 via-primary/10 to-accent/5 rounded-3xl">
      <div className="max-w-sm text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Store className="h-8 w-8 text-primary" />
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-3">
          "El canal para mover
          <br />
          tu stock difícil"
        </h2>

        <p className="text-muted-foreground mb-8">
          Publicá tus liquidaciones y conectá con compradores listos para comprar
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
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <span className="text-sm text-muted-foreground">Dashboard Preview</span>
          </div>
        </div>
      </div>
    </div>
  );
}
