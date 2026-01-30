import { Shield, Lock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function AdminLoginBranding() {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-800 mb-4">
        <Shield className="h-8 w-8 text-slate-300" />
      </div>
      
      <h1 className="text-2xl font-bold text-white mb-2">
        Panel de Administración
      </h1>
      
      <Badge variant="outline" className="border-slate-600 text-slate-400">
        <Lock className="h-3 w-3 mr-1" />
        Área restringida
      </Badge>
    </div>
  );
}
