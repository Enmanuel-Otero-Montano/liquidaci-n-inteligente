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
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ProductFormData } from '@/types/productForm';
import { useAuth } from '@/contexts/AuthContext';

interface DeliverySectionProps {
  form: UseFormReturn<ProductFormData>;
}

export function DeliverySection({ form }: DeliverySectionProps) {
  const { seller } = useAuth();
  const useSellerAddress = form.watch('use_seller_address');
  const offersShipping = form.watch('offers_shipping');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Retiro y Envío</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="use_seller_address"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="font-normal cursor-pointer">
                Usar mi dirección registrada
                {seller?.direccion && (
                  <span className="text-muted-foreground ml-1">
                    ({seller.direccion})
                  </span>
                )}
              </FormLabel>
            </FormItem>
          )}
        />

        {!useSellerAddress && (
          <FormField
            control={form.control}
            name="pickup_address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dirección de retiro</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Calle, número, ciudad" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="pickup_hours"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Horario de retiro</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Ej: Lunes a Viernes de 9 a 18hs" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="border-t pt-4 space-y-4">
          <FormField
            control={form.control}
            name="offers_shipping"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between">
                <div>
                  <FormLabel>¿Ofrecés envío?</FormLabel>
                  <FormDescription>
                    Podés ofrecer envío además del retiro en persona
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {offersShipping && (
            <FormField
              control={form.control}
              name="shipping_cost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Costo de envío</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        $
                      </span>
                      <Input
                        type="number"
                        min={0}
                        placeholder="0 (gratis)"
                        className="pl-7"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                        value={field.value ?? ''}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Dejá en 0 para envío gratis
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
