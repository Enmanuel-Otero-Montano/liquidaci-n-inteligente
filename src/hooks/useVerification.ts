import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { PriceVerification, VerificationMethod } from '@/types/verification';

interface VerifyProductParams {
  productId: string;
  verificationMethod: VerificationMethod;
  notes?: string;
}

export function useVerifyProduct() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { admin } = useAdminAuth();

  return useMutation({
    mutationFn: async ({ productId, verificationMethod, notes }: VerifyProductParams) => {
      if (!admin) throw new Error('No hay admin autenticado');

      // 1. Get current product data
      const { data: product, error: fetchError } = await supabase
        .from('products')
        .select('id, price_before, price_now, discount_pct, evidence_url, price_reference')
        .eq('id', productId)
        .single();

      if (fetchError) throw fetchError;
      if (!product) throw new Error('Producto no encontrado');

      // 2. Create verification record
      const { error: verificationError } = await supabase
        .from('price_verifications')
        .insert({
          product_id: productId,
          admin_id: admin.id,
          evidence_url: product.evidence_url,
          price_reference: product.price_reference,
          verification_method: verificationMethod,
          price_before_verified: product.price_before,
          price_now_verified: product.price_now,
          discount_verified: product.discount_pct,
          notes: notes || null,
        } as any);

      if (verificationError) throw verificationError;

      // 3. Update product with verified status
      const { error: updateError } = await supabase
        .from('products')
        .update({
          verification_status: 'verified',
          verified_at: new Date().toISOString(),
          verified_by_admin_id: admin.id,
        } as any)
        .eq('id', productId);

      if (updateError) throw updateError;

      return { productId };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: 'Producto verificado',
        description: 'La oferta ha sido marcada como verificada.',
      });
    },
    onError: (error) => {
      console.error('Error al verificar producto:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo verificar el producto. Intenta de nuevo.',
      });
    },
  });
}

export function useProductVerifications(productId: string) {
  return useQuery({
    queryKey: ['product-verifications', productId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('price_verifications')
        .select('*')
        .eq('product_id', productId)
        .order('verified_at', { ascending: false });

      if (error) throw error;
      return data as unknown as PriceVerification[];
    },
    enabled: !!productId,
  });
}

export function useVerificationStats() {
  return useQuery({
    queryKey: ['verification-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('verification_status, status');

      if (error) throw error;

      return {
        total: data.length,
        verified: data.filter((p: any) => p.verification_status === 'verified').length,
        verifiable: data.filter((p: any) => p.verification_status === 'verifiable').length,
        unverified: data.filter((p: any) => p.verification_status === 'unverified').length,
        approved_and_verified: data.filter(
          (p: any) => p.status === 'approved' && p.verification_status === 'verified'
        ).length,
      };
    },
  });
}
