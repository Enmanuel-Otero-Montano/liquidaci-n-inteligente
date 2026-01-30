import { CheckCircle } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="text-center py-16">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 mb-4">
        <CheckCircle className="h-8 w-8 text-emerald-500" />
      </div>
      <h3 className="text-lg font-medium text-white mb-2">
        ¡Todo al día!
      </h3>
      <p className="text-slate-400 max-w-sm mx-auto">
        No hay productos pendientes de revisión. Podés relajarte un poco. 🎉
      </p>
    </div>
  );
}
