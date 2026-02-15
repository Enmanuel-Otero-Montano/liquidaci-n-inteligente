import { Mail, Phone, Download, Copy, Trash2, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Subscriber, useDeleteSubscriber } from '@/hooks/useSubscribers';
import { exportToCSV, copyEmailsToClipboard, copyWhatsAppsToClipboard } from '@/utils/exportSubscribers';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

interface SubscribersTableProps {
  subscribers: Subscriber[];
  isLoading: boolean;
}

export function SubscribersTable({ subscribers, isLoading }: SubscribersTableProps) {
  const deleteMutation = useDeleteSubscriber();
  const { toast } = useToast();

  const handleExport = () => {
    const filename = `suscriptores_${new Date().toISOString().split('T')[0]}.csv`;
    exportToCSV(subscribers, filename);
  };

  const handleCopyEmails = async () => {
    const success = await copyEmailsToClipboard(subscribers);
    if (success) {
      const count = subscribers.filter(s => s.metodo_contacto === 'email').length;
      toast({ title: `${count} emails copiados al portapapeles` });
    } else {
      toast({ variant: 'destructive', title: 'No hay suscriptores con email en esta selección' });
    }
  };

  const handleCopyWhatsApps = async () => {
    const success = await copyWhatsAppsToClipboard(subscribers);
    if (success) {
      const count = subscribers.filter(s => s.metodo_contacto === 'whatsapp').length;
      toast({ title: `${count} números copiados al portapapeles` });
    } else {
      toast({ variant: 'destructive', title: 'No hay suscriptores con WhatsApp en esta selección' });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este suscriptor?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-slate-400">Cargando suscriptores...</div>
      </div>
    );
  }

  if (subscribers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4">
          <Mail className="h-8 w-8 text-slate-600" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">
          No hay suscriptores
        </h3>
        <p className="text-slate-400 max-w-sm">
          Aún no hay personas suscritas a las notificaciones con estos filtros.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          onClick={handleExport}
          variant="outline"
          size="sm"
          className="border-slate-600 text-slate-300 hover:bg-slate-800"
        >
          <Download className="h-4 w-4 mr-2" />
          Exportar CSV
        </Button>
        <Button
          onClick={handleCopyEmails}
          variant="outline"
          size="sm"
          className="border-slate-600 text-slate-300 hover:bg-slate-800"
        >
          <Copy className="h-4 w-4 mr-2" />
          Copiar Emails
        </Button>
        <Button
          onClick={handleCopyWhatsApps}
          variant="outline"
          size="sm"
          className="border-slate-600 text-slate-300 hover:bg-slate-800"
        >
          <Copy className="h-4 w-4 mr-2" />
          Copiar WhatsApps
        </Button>
      </div>

      <div className="rounded-lg border border-slate-700 bg-slate-800">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-700 hover:bg-slate-800">
              <TableHead className="text-slate-400">Nombre</TableHead>
              <TableHead className="text-slate-400">Contacto</TableHead>
              <TableHead className="text-slate-400">Categorías</TableHead>
              <TableHead className="text-slate-400">Zona</TableHead>
              <TableHead className="text-slate-400">Frecuencia</TableHead>
              <TableHead className="text-slate-400">Suscrito</TableHead>
              <TableHead className="text-slate-400 w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscribers.map((subscriber) => (
              <TableRow
                key={subscriber.id}
                className="border-slate-700 hover:bg-slate-750"
              >
                <TableCell className="font-medium text-white">
                  {subscriber.nombre}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {subscriber.metodo_contacto === 'email' ? (
                      <Mail className="h-4 w-4 text-blue-400" />
                    ) : (
                      <Phone className="h-4 w-4 text-green-400" />
                    )}
                    <span className="text-slate-300">{subscriber.contacto}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {subscriber.categorias.slice(0, 2).map((cat) => (
                      <Badge
                        key={cat}
                        variant="secondary"
                        className="bg-slate-700 text-slate-300 text-xs"
                      >
                        {cat}
                      </Badge>
                    ))}
                    {subscriber.categorias.length > 2 && (
                      <Badge
                        variant="secondary"
                        className="bg-slate-700 text-slate-300 text-xs"
                      >
                        +{subscriber.categorias.length - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-slate-300">
                  {subscriber.zona}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="border-slate-600 text-slate-400"
                  >
                    {subscriber.frecuencia}
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-400 text-sm">
                  {formatDistanceToNow(new Date(subscriber.created_at), {
                    addSuffix: true,
                    locale: es,
                  })}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-700"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="bg-slate-800 border-slate-700"
                    >
                      <DropdownMenuLabel className="text-slate-400">
                        Acciones
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-slate-700" />
                      <DropdownMenuItem
                        onClick={() => handleDelete(subscriber.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-slate-700 cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
