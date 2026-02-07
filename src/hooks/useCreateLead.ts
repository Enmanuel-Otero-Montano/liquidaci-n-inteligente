import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { CreateLeadInput, Lead } from '@/types/lead';

export function useCreateLead() {
  return useMutation<Lead, Error, CreateLeadInput>({
    mutationFn: async (input) => {
      // First get the product's seller_id
      const { data: product, error: prodErr } = await supabase
        .from('products')
        .select('seller_id')
        .eq('id', input.product_id)
        .single();

      if (prodErr) throw prodErr;

      // Create reservation (no .select() — anonymous users lack SELECT RLS)
      const { error: resErr } = await supabase
        .from('reservations')
        .insert({
          product_id: input.product_id,
          seller_id: product.seller_id,
          buyer_name: input.buyer_name,
          buyer_contact: input.buyer_contact,
          buyer_contact_type: input.buyer_contact.includes('@') ? 'email' : 'phone',
          quantity: input.quantity,
          note: input.note || null,
        });

      if (resErr) throw resErr;

      return {
        id: crypto.randomUUID(),
        product_id: input.product_id,
        buyer_name: input.buyer_name,
        buyer_contact: input.buyer_contact,
        quantity: input.quantity,
        note: input.note ?? undefined,
        status: 'new' as Lead['status'],
        created_at: new Date().toISOString(),
      };
    },
  });
}
