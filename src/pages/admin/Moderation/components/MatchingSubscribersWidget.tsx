import { Mail, Phone, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMatchingSubscribers } from '@/hooks/useSubscribers';
import { ProductWithSeller } from '@/types/moderation';
import { copyEmailsToClipboard, copyWhatsAppsToClipboard } from '@/utils/exportSubscribers';
import { useToast } from '@/hooks/use-toast';

interface MatchingSubscribersWidgetProps {
  product: ProductWithSeller;
}

export function MatchingSubscribersWidget({ product }: MatchingSubscribersWidgetProps) {
  const { data: matchingSubscribers = [] } = useMatchingSubscribers(product.category);
  const { toast } = useToast();

  if (matchingSubscribers.length === 0) {
    return (
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-sm text-slate-400 flex items-center gap-2">
            <Users className="h-4 w-4" />
            Suscriptores interesados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-400">
            No hay suscriptores para esta categoría aún
          </p>
        </CardContent>
      </Card>
    );
  }

  const emailCount = matchingSubscribers.filter(s => s.metodo_contacto === 'email').length;
  const whatsappCount = matchingSubscribers.filter(s => s.metodo_contacto === 'whatsapp').length;

  const handleCopyEmails = async () => {
    const success = await copyEmailsToClipboard(matchingSubscribers);
    if (success) {
      toast({ title: `${emailCount} emails copiados al portapapeles` });
    }
  };

  const handleCopyWhatsApps = async () => {
    const success = await copyWhatsAppsToClipboard(matchingSubscribers);
    if (success) {
      toast({ title: `${whatsappCount} números copiados al portapapeles` });
    }
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-sm text-slate-400 flex items-center gap-2">
          <Users className="h-4 w-4" />
          Suscriptores interesados
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-4">
          <Badge className="bg-blue-900 text-blue-300 border-blue-700">
            <Mail className="h-3 w-3 mr-1" />
            {emailCount} emails
          </Badge>
          <Badge className="bg-green-900 text-green-300 border-green-700">
            <Phone className="h-3 w-3 mr-1" />
            {whatsappCount} WhatsApp
          </Badge>
        </div>

        <p className="text-xs text-slate-400">
          Al aprobar este producto, {matchingSubscribers.length}{' '}
          {matchingSubscribers.length === 1 ? 'persona' : 'personas'} de la categoría &quot;{product.category}&quot;{' '}
          {matchingSubscribers.length === 1 ? 'está esperando' : 'están esperando'} notificaciones
        </p>

        <div className="flex gap-2 pt-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopyEmails}
            className="border-slate-600 text-slate-300 hover:bg-slate-700 text-xs"
          >
            <Mail className="h-3 w-3 mr-1" />
            Copiar Emails
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopyWhatsApps}
            className="border-slate-600 text-slate-300 hover:bg-slate-700 text-xs"
          >
            <Phone className="h-3 w-3 mr-1" />
            Copiar WhatsApp
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
