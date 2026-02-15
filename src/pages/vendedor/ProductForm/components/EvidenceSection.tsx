import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ProductFormData } from '@/types/productForm';
import { ExternalLink, HelpCircle, CheckCircle, Info } from 'lucide-react';
import { VERIFICATION_CONFIG } from '@/config/verification';

interface EvidenceSectionProps {
  form: UseFormReturn<ProductFormData>;
}

export function EvidenceSection({ form }: EvidenceSectionProps) {
  const evidenceUrl = form.watch('evidence_url');
  const priceReference = form.watch('price_reference');

  const hasEvidence = !!(
    evidenceUrl ||
    (priceReference && priceReference.length >= VERIFICATION_CONFIG.MIN_REFERENCE_LENGTH)
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          Referencia de precio
          <span className="text-sm font-normal text-muted-foreground">
            (opcional, pero mejora la aprobación)
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {hasEvidence ? (
          <Alert className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-900">
            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertDescription className="text-green-800 dark:text-green-300">
              Proporcionar evidencia mejora tus chances de aprobación rápida y hace que tu oferta
              sea marcada como "Verificada"
            </AlertDescription>
          </Alert>
        ) : (
          <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-900">
            <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <AlertDescription className="text-blue-800 dark:text-blue-300">
              Provee un link o referencia del precio anterior para que verifiquemos
              tu oferta y mostrarla con un badge de confianza
            </AlertDescription>
          </Alert>
        )}

        {/* URL de evidencia */}
        <FormField
          control={form.control}
          name="evidence_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                URL del producto original
                <ExternalLink className="h-3 w-3 text-muted-foreground" />
              </FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="https://tutienda.com/producto o link en MercadoLibre"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Link al producto en tu tienda online, redes o en MercadoLibre.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Referencia de precio (texto libre) */}
        <FormField
          control={form.control}
          name="price_reference"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                ¿Dónde se puede verificar el precio anterior?
                <HelpCircle className="h-3 w-3 text-muted-foreground" />
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Ej: "Precio de lista en mi web", "Publicado en MercadoLibre a este precio", "Catálogo mayorista"...'
                  className="resize-none h-20"
                  maxLength={200}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Ayuda a nuestro equipo a aprobar tu publicación más rápido.
                Si no tenés URL, contanos dónde se puede verificar el precio.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
