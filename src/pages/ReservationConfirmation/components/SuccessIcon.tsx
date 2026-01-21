import { CheckCircle2 } from 'lucide-react';

export function SuccessIcon() {
  return (
    <div className="flex justify-center">
      <div className="animate-scale-in rounded-full bg-accent/10 p-6">
        <CheckCircle2 className="h-16 w-16 text-accent animate-fade-in" />
      </div>
    </div>
  );
}
