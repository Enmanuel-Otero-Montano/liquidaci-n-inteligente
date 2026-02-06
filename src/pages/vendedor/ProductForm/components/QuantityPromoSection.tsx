import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tag, Calculator, AlertCircle } from 'lucide-react';
import { ProductFormData, PROMO_QUANTITY_TYPES } from '@/types/productForm';
import { calculateQuantityPromoInfo, validatePackDiscount } from '@/utils/quantityPromo';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface QuantityPromoSectionProps {
  form: UseFormReturn<ProductFormData>;
}

export function QuantityPromoSection({ form }: QuantityPromoSectionProps) {
  const hasPromo = form.watch('has_quantity_promo');
  const promoType = form.watch('quantity_promo_type');
  const priceBefore = form.watch('price_before') || 0;
  const packQty = form.watch('pack_quantity');
  const packPrice = form.watch('pack_price');
  const minQty = form.watch('min_quantity_for_discount');
  const discountPct = form.watch('quantity_discount_percent');
  
  // Calcular preview del descuento efectivo
  const promoInfo = hasPromo && promoType && promoType !== 'none' 
    ? calculateQuantityPromoInfo(promoType, priceBefore, packQty, packPrice, minQty, discountPct)
    : null;

  // Validar descuento mínimo para pack_price
  const packValidation = promoType === 'pack_price' && packQty && packPrice && priceBefore
    ? validatePackDiscount(priceBefore, packQty, packPrice)
    : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Tag className="h-5 w-5 text-purple-600" />
          Promoción por cantidad
          <Badge variant="secondary" className="ml-2 font-normal">Opcional</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Toggle principal */}
        <FormField
          control={form.control}
          name="has_quantity_promo"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  ¿Tiene promoción por cantidad?
                </FormLabel>
                <FormDescription>
                  Ofertas tipo 2x1, 3x2, o precios especiales por pack
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    if (!checked) {
                      form.setValue('quantity_promo_type', 'none');
                      form.setValue('pack_quantity', undefined);
                      form.setValue('pack_price', undefined);
                      form.setValue('min_quantity_for_discount', undefined);
                      form.setValue('quantity_discount_percent', undefined);
                    }
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        {hasPromo && (
          <>
            {/* Selector de tipo */}
            <FormField
              control={form.control}
              name="quantity_promo_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de promoción</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      field.onChange(value);
                      // Limpiar campos al cambiar tipo
                      form.setValue('pack_quantity', undefined);
                      form.setValue('pack_price', undefined);
                      form.setValue('min_quantity_for_discount', undefined);
                      form.setValue('quantity_discount_percent', undefined);
                    }} 
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccioná un tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PROMO_QUANTITY_TYPES.filter(t => t.value !== 'none').map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Campos para Precio Pack */}
            {promoType === 'pack_price' && (
              <div className="space-y-4 p-4 bg-muted/30 rounded-lg border">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="pack_quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cantidad en pack *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={2}
                            placeholder="ej: 3"
                            value={field.value ?? ''}
                            onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                          />
                        </FormControl>
                        <FormDescription>Mínimo 2 unidades</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pack_price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Precio del pack ($) *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={1}
                            placeholder="ej: 180"
                            value={field.value ?? ''}
                            onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                {/* Alerta si no cumple mínimo 25% */}
                {packValidation && !packValidation.isValid && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      El precio del pack debe representar al menos 25% de descuento. 
                      Actualmente es {packValidation.actualDiscount}%.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}
            
            {/* Campos para Descuento por Cantidad */}
            {promoType === 'quantity_discount' && (
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg border">
                <FormField
                  control={form.control}
                  name="min_quantity_for_discount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cantidad mínima *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={2}
                          placeholder="ej: 5"
                          value={field.value ?? ''}
                          onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                        />
                      </FormControl>
                      <FormDescription>A partir de cuántas unidades</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quantity_discount_percent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>% de descuento *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={25}
                          max={100}
                          placeholder="ej: 35"
                          value={field.value ?? ''}
                          onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                        />
                      </FormControl>
                      <FormDescription>Mínimo 25%</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            
            {/* Preview del descuento */}
            {promoInfo && (
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg space-y-3">
                <div className="flex items-center gap-2">
                  <Calculator className="h-4 w-4 text-purple-600" />
                  <span className="font-medium text-purple-900">Vista previa:</span>
                </div>
                <p className="text-lg font-semibold text-purple-800">
                  {promoInfo.displayText}
                </p>
                <p className="text-sm text-purple-700">
                  Descuento efectivo: {promoInfo.effectiveDiscountPercent}% por unidad
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-purple-700">Badge en cards:</span>
                  <Badge className="bg-purple-100 text-purple-700 border border-purple-300">
                    <Tag className="h-3 w-3 mr-1" />
                    {promoInfo.badgeText}
                  </Badge>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
