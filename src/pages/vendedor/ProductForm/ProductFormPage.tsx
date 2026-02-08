import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { SellerLayout } from '@/components/layouts/SellerLayout';
import { supabase } from '@/integrations/supabase/client';
import { ProductFormHeader } from './components/ProductFormHeader';
import { BasicInfoSection } from './components/BasicInfoSection';
import { ImageUploader } from './components/ImageUploader';
import { LiquidationSection } from './components/LiquidationSection';
import { PricingSection } from './components/PricingSection';
import { DeliverySection } from './components/DeliverySection';
import { EvidenceSection } from './components/EvidenceSection';
import { QuantityPromoSection } from './components/QuantityPromoSection';
import { FormActions } from './components/FormActions';
import { productFormSchema, ProductFormData } from '@/types/productForm';
import { useProductForEdit, useCreateProduct, useUpdateProduct } from '@/hooks/useProductForm';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

export function ProductFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditing = !!id;

  const { data: existingProduct, isLoading: isLoadingProduct } = useProductForEdit(id);
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  const [wasApproved, setWasApproved] = useState(false);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      title: '',
      category: '',
      description: '',
      images: [],
      liquidation_reason: undefined,
      stock_qty: 1,
      price_before: undefined,
      price_now: undefined,
      pickup_address: '',
      use_seller_address: true,
      pickup_hours: '',
      offers_shipping: false,
      shipping_cost: undefined,
      evidence_url: '',
      has_quantity_promo: false,
      quantity_promo_type: 'none',
      pack_quantity: undefined,
      pack_price: undefined,
      min_quantity_for_discount: undefined,
      quantity_discount_percent: undefined,
    },
  });

  // Load existing product data for editing
  useEffect(() => {
    if (existingProduct) {
      setWasApproved(existingProduct.status === 'approved');
      form.reset({
        title: existingProduct.title,
        category: existingProduct.category,
        description: existingProduct.description,
        images: existingProduct.images,
        liquidation_reason: 'otro', // Default since we don't store this
        stock_qty: existingProduct.stock_qty,
        price_before: existingProduct.price_before,
        price_now: existingProduct.price_now,
        pickup_address: '',
        use_seller_address: true,
        pickup_hours: '',
        offers_shipping: false,
        shipping_cost: undefined,
        evidence_url: '',
        has_quantity_promo: !!existingProduct.quantityPromo,
        quantity_promo_type: existingProduct.quantityPromo?.type || 'none',
        pack_quantity: existingProduct.quantityPromo?.packQuantity,
        pack_price: existingProduct.quantityPromo?.packPrice,
        min_quantity_for_discount: existingProduct.quantityPromo?.minQuantity,
        quantity_discount_percent: existingProduct.quantityPromo?.discountPercent,
      });
    }
  }, [existingProduct, form]);

  const priceBefore = form.watch('price_before') || 0;
  const priceNow = form.watch('price_now') || 0;
  const isValidPricing = priceBefore > 0 && priceNow > 0 && priceNow < priceBefore;
  const discountPct = isValidPricing 
    ? Math.round(((priceBefore - priceNow) / priceBefore) * 100)
    : 0;
  const isValidDiscount = discountPct >= 20;

  const isSubmitting = createProduct.isPending || updateProduct.isPending;

  const isUnauthorizedError = (error: unknown): boolean => {
    if (!error) return false;

    if (error instanceof Error) {
      return /unauthorized|jwt|no autenticado|not authenticated|not authorized|permission denied/i.test(
        error.message
      );
    }

    const scanObject = (value: unknown, depth: number): boolean => {
      if (!value || depth <= 0) return false;

      if (value instanceof Error) {
        return /unauthorized|jwt|no autenticado|not authenticated|not authorized|permission denied/i.test(
          value.message
        );
      }

      if (typeof value !== 'object') return false;

      const obj = value as Record<string, unknown>;

      const statusCandidate = obj.status ?? obj.statusCode ?? obj.status_code;
      const statusNum = Number(statusCandidate);
      if (statusNum === 401 || statusNum === 403) return true;

      const combined =
        `${String(obj.code ?? '')} ` +
        `${String(obj.message ?? '')} ` +
        `${String(obj.details ?? '')} ` +
        `${String(obj.hint ?? '')} ` +
        `${String(obj.error_description ?? '')} ` +
        `${String(obj.error ?? '')}`;

      // PGRST301 suele ser JWT inválido/expirado.
      if (
        /pgrst301|unauthorized|jwt|no autenticado|not authenticated|not authorized|permission denied/i.test(
          combined
        )
      ) {
        return true;
      }

      for (const key of ['error', 'cause', 'originalError', 'context', 'data', 'response']) {
        if (scanObject(obj[key], depth - 1)) return true;
      }

      return false;
    };

    return scanObject(error, 4);
  };

  const isRlsError = (error: unknown): boolean => {
    if (!error || typeof error !== 'object') return false;
    const maybe = error as { code?: unknown; message?: unknown };
    const code = String(maybe.code ?? '');
    const message = String(maybe.message ?? '');
    return code === '42501' || /row-level security|violates row level security/i.test(message);
  };

  const hasActiveSession = async (): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) return false;
      return !!data.session;
    } catch {
      return false;
    }
  };

  const handleExpiredSession = (error: unknown) => {
    console.error('Sesión expirada al guardar producto:', error);
    toast({
      variant: 'destructive',
      title: 'Sesión expirada',
      description: 'Tu sesión expiró. Iniciá sesión de nuevo para guardar el producto.',
    });
    navigate('/vendedor/login', { replace: true });
  };

  const handleForbidden = (error: unknown) => {
    console.error('Permisos insuficientes al guardar producto:', error);
    toast({
      variant: 'destructive',
      title: 'No autorizado',
      description: 'No tenés permisos para guardar este producto. Verificá tu sesión e intentá de nuevo.',
    });
  };

  const handleSave = async (status: 'draft' | 'pending') => {
    const isValid = await form.trigger();
    
    // For draft, we allow saving even with validation errors (except required fields)
    if (status === 'pending' && !isValid) {
      toast({
        variant: 'destructive',
        title: 'Error de validación',
        description: 'Por favor corregí los errores del formulario',
      });
      return;
    }

    if (status === 'pending' && !isValidDiscount) {
      toast({
        variant: 'destructive',
        title: 'Descuento insuficiente',
        description: 'El descuento mínimo para publicar es 20%',
      });
      return;
    }

    const values = form.getValues();
    
    const productData = {
      title: values.title,
      category: values.category,
      description: values.description,
      images: values.images,
      liquidation_reason: values.liquidation_reason || 'otro',
      stock_qty: values.stock_qty || 1,
      price_before: values.price_before || 0,
      price_now: values.price_now || 0,
      pickup_address: values.use_seller_address ? undefined : values.pickup_address,
      pickup_hours: values.pickup_hours,
      offers_shipping: values.offers_shipping,
      shipping_cost: values.offers_shipping ? values.shipping_cost : undefined,
      evidence_url: values.evidence_url || undefined,
      status,
    };

    try {
      if (isEditing && id) {
        await updateProduct.mutateAsync({ id, data: productData });
        toast({
          title: status === 'draft' ? 'Borrador guardado' : 'Producto enviado',
          description: status === 'draft' 
            ? 'Tu borrador se guardó correctamente'
            : 'Tu producto fue enviado para aprobación',
        });
      } else {
        await createProduct.mutateAsync(productData);
        toast({
          title: status === 'draft' ? 'Borrador creado' : '¡Producto creado!',
          description: status === 'draft'
            ? 'Tu borrador se guardó correctamente'
            : 'Tu producto fue enviado para aprobación',
        });
      }
      navigate('/vendedor/productos');
    } catch (error) {
      if (isUnauthorizedError(error) || isRlsError(error)) {
        const hasSession = await hasActiveSession();
        if (!hasSession) {
          handleExpiredSession(error);
          return;
        }
        handleForbidden(error);
        return;
      }

      console.error('Error al guardar producto:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo guardar el producto. Intentá de nuevo.',
      });
    }
  };

  if (isEditing && isLoadingProduct) {
    return (
      <SellerLayout>
        <div className="space-y-6">
          <Skeleton className="h-16 w-64" />
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-32 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </SellerLayout>
    );
  }

  return (
    <SellerLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <ProductFormHeader 
          isEditing={isEditing} 
          productTitle={existingProduct?.title}
        />

        <Form {...form}>
          <form className="space-y-6">
            <BasicInfoSection form={form} />
            <ImageUploader form={form} />
            <LiquidationSection form={form} />
            <PricingSection form={form} />
            <QuantityPromoSection form={form} />
            <DeliverySection form={form} />
            <EvidenceSection form={form} />
            
            <FormActions
              isValidDiscount={isValidDiscount}
              isSubmitting={isSubmitting}
              isEditing={isEditing}
              wasApproved={wasApproved}
              onSaveDraft={() => handleSave('draft')}
              onSubmitForApproval={() => handleSave('pending')}
            />
          </form>
        </Form>
      </div>
    </SellerLayout>
  );
}
