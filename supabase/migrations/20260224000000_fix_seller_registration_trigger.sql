-- Fix: seller registration trigger was not firing correctly.
-- Replaced handle_new_seller() (incomplete fields) and dead handle_new_user()
-- with a single, complete function that includes all registration fields
-- and uses ON CONFLICT DO NOTHING to be idempotent.
-- Removed user_roles INSERT from trigger (it was causing silent failures).

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_seller();
DROP FUNCTION IF EXISTS public.handle_new_user();

CREATE OR REPLACE FUNCTION public.handle_new_seller()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.sellers (
    user_id,
    email,
    nombre_comercial,
    responsable,
    telefono,
    zona,
    direccion,
    seller_type,
    status
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NULLIF(TRIM(NEW.raw_user_meta_data->>'nombre_comercial'), ''), 'Sin nombre'),
    NULLIF(TRIM(COALESCE(NEW.raw_user_meta_data->>'responsable', '')), ''),
    COALESCE(NEW.raw_user_meta_data->>'telefono', ''),
    COALESCE(NEW.raw_user_meta_data->>'zona', ''),
    NULLIF(TRIM(COALESCE(NEW.raw_user_meta_data->>'direccion', '')), ''),
    COALESCE(NULLIF(TRIM(NEW.raw_user_meta_data->>'seller_type'), ''), 'marca_emprendimiento'),
    'pending'
  )
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_seller();
