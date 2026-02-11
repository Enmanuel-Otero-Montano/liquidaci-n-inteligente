-- Tarea 1: Campo "Tipo de vendedor" en sellers
-- Solo 2 valores para MVP. Default para sellers existentes.
ALTER TABLE public.sellers
  ADD COLUMN IF NOT EXISTS seller_type TEXT DEFAULT 'marca_emprendimiento'
  CHECK (seller_type IN ('tienda_fisica', 'marca_emprendimiento'));

COMMENT ON COLUMN public.sellers.seller_type IS 'tienda_fisica = Tienda/Local comercial, marca_emprendimiento = Marca/Emprendimiento';

-- Tarea 2: Campo "Referencia de precio" en products (texto libre, opcional)
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS price_reference TEXT;

COMMENT ON COLUMN public.products.price_reference IS 'Dónde se puede verificar el precio anterior (ej: web, MercadoLibre, catálogo). Máx 200 caracteres.';

-- Actualizar handle_new_user para incluir seller_type y status = 'pending'
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.sellers (user_id, email, nombre_comercial, telefono, zona, responsable, direccion, seller_type, status)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'nombre_comercial', ''),
    COALESCE(NEW.raw_user_meta_data->>'telefono', ''),
    COALESCE(NEW.raw_user_meta_data->>'zona', ''),
    COALESCE(NEW.raw_user_meta_data->>'responsable', ''),
    COALESCE(NEW.raw_user_meta_data->>'direccion', ''),
    COALESCE(NULLIF(TRIM(NEW.raw_user_meta_data->>'seller_type'), ''), 'marca_emprendimiento'),
    'pending'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;
