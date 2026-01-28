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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductFormData } from '@/types/productForm';
import { ExternalLink } from 'lucide-react';

interface EvidenceSectionProps {
  form: UseFormReturn<ProductFormData>;
}

export function EvidenceSection({ form }: EvidenceSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          Evidencia
          <span className="text-sm font-normal text-muted-foreground">(opcional)</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
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
                  placeholder="https://tienda.com/producto-original" 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Link al producto en su tienda original para validar el descuento real.
                Esto aumenta la confianza de los compradores.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
