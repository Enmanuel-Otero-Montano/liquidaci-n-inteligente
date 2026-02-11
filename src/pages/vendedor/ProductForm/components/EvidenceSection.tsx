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
import { ProductFormData } from '@/types/productForm';
import { ExternalLink, HelpCircle } from 'lucide-react';

interface EvidenceSectionProps {
  form: UseFormReturn<ProductFormData>;
}

export function EvidenceSection({ form }: EvidenceSectionProps) {
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
        {/* Campo existente — URL de evidencia */}
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
                  placeholder='Ej: "Precio de lista en mi web", "Publicado en MercadoLibre a este precio", "Catálogo mayorista 2025"...'
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
