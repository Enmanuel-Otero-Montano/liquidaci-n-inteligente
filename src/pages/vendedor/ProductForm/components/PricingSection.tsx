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
import { DiscountCalculator } from './DiscountCalculator';

interface PricingSectionProps {
  form: UseFormReturn<ProductFormData>;
}

export function PricingSection({ form }: PricingSectionProps) {
  const priceBefore = form.watch('price_before') || 0;
  const priceNow = form.watch('price_now') || 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Precio</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price_before"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio anterior (P0) *</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <Input
                      type="number"
                      min={1}
                      placeholder="0"
                      className="pl-7"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                      value={field.value ?? ''}
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  El precio original del producto
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price_now"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio de oferta (P1) *</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <Input
                      type="number"
                      min={1}
                      placeholder="0"
                      className="pl-7"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                      value={field.value ?? ''}
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  El precio con descuento (mín. 20% OFF)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <DiscountCalculator priceBefore={priceBefore} priceNow={priceNow} />
      </CardContent>
    </Card>
  );
}
