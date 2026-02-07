-- Add metadata column to seller_actions for storing affected product IDs on block/unblock
ALTER TABLE public.seller_actions
  ADD COLUMN metadata jsonb DEFAULT NULL;
