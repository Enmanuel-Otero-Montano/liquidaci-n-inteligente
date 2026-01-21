import { Bell, MessageCircle, Truck } from 'lucide-react';

const steps = [
  {
    number: 1,
    icon: Bell,
    title: 'El vendedor recibe tu reserva',
    description: 'Le llegó una notificación con tus datos',
  },
  {
    number: 2,
    icon: MessageCircle,
    title: 'Te contactará pronto',
    description: 'Generalmente en las próximas horas',
  },
  {
    number: 3,
    icon: Truck,
    title: 'Coordinan pago y entrega',
    description: 'Acordarán el método que les convenga',
  },
];

export function NextSteps() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-center">¿Qué sigue?</h2>
      <div className="space-y-3">
        {steps.map((step) => (
          <div key={step.number} className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-bold text-primary">{step.number}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm">{step.title}</p>
              <p className="text-xs text-muted-foreground">{step.description}</p>
            </div>
            <step.icon className="h-5 w-5 text-muted-foreground flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
