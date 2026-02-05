import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { CreateLeadInput, Lead } from '@/types/lead';

export function useCreateLead() {
  return useMutation<Lead, Error, CreateLeadInput>({
    mutationFn: async (input) => {
      // Also create a reservation for the seller to track
      // First get the product's seller_id
      const { data: product, error: prodErr } = await supabase
        .from('products')
        .select('seller_id')
        .eq('id', input.product_id)
        .single();

      if (prodErr) throw prodErr;

      // Create reservation (linked to seller for their dashboard)
      const { data: reservation, error: resErr } = await supabase
        .from('reservations')
        .insert({
          product_id: input.product_id,
          seller_id: product.seller_id,
          buyer_name: input.buyer_name,
          buyer_contact: input.buyer_contact,
          buyer_contact_type: input.buyer_contact.includes('@') ? 'email' : 'phone',
          quantity: input.quantity,
          note: input.note || null,
        })
        .select()
        .single();

      if (resErr) throw resErr;

      return {
        id: reservation.id,
        product_id: reservation.product_id,
        buyer_name: reservation.buyer_name,
        buyer_contact: reservation.buyer_contact,
        quantity: reservation.quantity,
        note: reservation.note ?? undefined,
        status: reservation.status as Lead['status'],
        created_at: reservation.created_at,
      };
    },
  });
}
