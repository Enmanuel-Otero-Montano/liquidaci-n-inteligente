import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductFormData, LIQUIDATION_REASONS } from '@/types/productForm';

interface LiquidationSectionProps {
  form: UseFormReturn<ProductFormData>;
}

export function LiquidationSection({ form }: LiquidationSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Oferta</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="liquidation_reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Motivo de oferta *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccioná un motivo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {LIQUIDATION_REASONS.map((reason) => (
                    <SelectItem key={reason.value} value={reason.value}>
                      {reason.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="stock_qty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock disponible *</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  placeholder="Cantidad de unidades"
                  {...field}
                  onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                  value={field.value ?? ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
