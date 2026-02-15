import { Mail, Phone, TrendingUp, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SubscribersStatsProps {
  stats?: {
    total: number;
    porEmail: number;
    porWhatsApp: number;
    topCategoria: string;
    topZona: string;
  };
}

export function SubscribersStats({ stats }: SubscribersStatsProps) {
  if (!stats) return null;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-400">
            Total Suscriptores
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-slate-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{stats.total}</div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-400">
            Por Email
          </CardTitle>
          <Mail className="h-4 w-4 text-blue-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{stats.porEmail}</div>
          <p className="text-xs text-slate-400">
            {stats.total > 0 ? Math.round((stats.porEmail / stats.total) * 100) : 0}% del total
          </p>
        </CardContent>
      </Card>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-400">
            Por WhatsApp
          </CardTitle>
          <Phone className="h-4 w-4 text-green-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{stats.porWhatsApp}</div>
          <p className="text-xs text-slate-400">
            {stats.total > 0 ? Math.round((stats.porWhatsApp / stats.total) * 100) : 0}% del total
          </p>
        </CardContent>
      </Card>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-400">
            Categoría más popular
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-purple-400" />
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold text-white truncate">{stats.topCategoria}</div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-400">
            Zona más popular
          </CardTitle>
          <MapPin className="h-4 w-4 text-amber-400" />
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold text-white truncate">{stats.topZona}</div>
        </CardContent>
      </Card>
    </div>
  );
}
