
-- ============================================================
-- LIQUIOFF: Full Database Schema Migration
-- ============================================================

-- 1. ENUMS
-- ============================================================
CREATE TYPE public.app_role AS ENUM ('admin', 'seller');
CREATE TYPE public.seller_status AS ENUM ('active', 'pending', 'suspended');
CREATE TYPE public.product_status AS ENUM ('draft', 'pending', 'approved', 'rejected', 'disabled', 'changes_requested');
CREATE TYPE public.delivery_type AS ENUM ('pickup', 'shipping', 'both');
CREATE TYPE public.reservation_status AS ENUM ('new', 'contacted', 'closed', 'lost');
CREATE TYPE public.report_reason AS ENUM ('fraude', 'precio_no_real', 'producto_prohibido', 'contenido_inapropiado', 'info_incorrecta', 'otro');
CREATE TYPE public.report_status AS ENUM ('open', 'resolved');
CREATE TYPE public.report_action_type AS ENUM ('report_created', 'product_hidden', 'evidence_requested', 'seller_penalized', 'report_resolved');
CREATE TYPE public.moderation_action AS ENUM ('submitted', 'approved', 'rejected', 'changes_requested');
CREATE TYPE public.seller_action_type AS ENUM ('blocked', 'unblocked', 'verified', 'unverified');
CREATE TYPE public.contact_method AS ENUM ('email', 'whatsapp');
CREATE TYPE public.liquidation_reason AS ENUM ('fin_temporada', 'sobrestock', 'ultimas_unidades', 'pack', 'otro');

-- 2. USER ROLES TABLE
-- ============================================================
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 3. HAS_ROLE SECURITY DEFINER FUNCTION
-- ============================================================
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- 4. SELLERS TABLE (profiles)
-- ============================================================
CREATE TABLE public.sellers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  nombre_comercial TEXT NOT NULL,
  responsable TEXT,
  email TEXT NOT NULL,
  telefono TEXT NOT NULL,
  zona TEXT NOT NULL,
  direccion TEXT,
  politicas TEXT,
  horario_retiro TEXT,
  whatsapp_message TEXT,
  profile_image_url TEXT,
  status seller_status NOT NULL DEFAULT 'pending',
  is_verified BOOLEAN NOT NULL DEFAULT false,
  verified_at TIMESTAMPTZ,
  verified_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.sellers ENABLE ROW LEVEL SECURITY;

-- 5. PRODUCTS TABLE
-- ============================================================
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID REFERENCES public.sellers(id) ON DELETE CASCADE NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  price_before NUMERIC(12,2) NOT NULL,
  price_now NUMERIC(12,2) NOT NULL,
  discount_pct INTEGER NOT NULL DEFAULT 0,
  stock_qty INTEGER NOT NULL DEFAULT 1,
  location TEXT NOT NULL,
  images TEXT[] NOT NULL DEFAULT '{}',
  status product_status NOT NULL DEFAULT 'draft',
  delivery_type delivery_type NOT NULL DEFAULT 'pickup',
  shipping_cost NUMERIC(10,2),
  liquidation_reason liquidation_reason,
  evidence_url TEXT,
  pickup_address TEXT,
  pickup_hours TEXT,
  offers_shipping BOOLEAN NOT NULL DEFAULT false,
  quantity_promo JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Index for catalog queries
CREATE INDEX idx_products_status ON public.products(status);
CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_products_seller_id ON public.products(seller_id);
CREATE INDEX idx_products_slug ON public.products(slug);

-- 6. RESERVATIONS TABLE
-- ============================================================
CREATE TABLE public.reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  seller_id UUID REFERENCES public.sellers(id) ON DELETE CASCADE NOT NULL,
  buyer_name TEXT NOT NULL,
  buyer_contact TEXT NOT NULL,
  buyer_contact_type TEXT NOT NULL DEFAULT 'phone',
  quantity INTEGER NOT NULL DEFAULT 1,
  note TEXT,
  seller_notes TEXT,
  status reservation_status NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_reservations_seller_id ON public.reservations(seller_id);
CREATE INDEX idx_reservations_product_id ON public.reservations(product_id);
CREATE INDEX idx_reservations_status ON public.reservations(status);

-- 7. REPORTS TABLE
-- ============================================================
CREATE TABLE public.reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  reason report_reason NOT NULL,
  description TEXT,
  reporter_email TEXT,
  status report_status NOT NULL DEFAULT 'open',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  resolved_at TIMESTAMPTZ
);

ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_reports_product_id ON public.reports(product_id);
CREATE INDEX idx_reports_status ON public.reports(status);

-- 8. REPORT ACTIONS TABLE
-- ============================================================
CREATE TABLE public.report_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID REFERENCES public.reports(id) ON DELETE CASCADE NOT NULL,
  action report_action_type NOT NULL,
  admin_id UUID NOT NULL,
  admin_name TEXT NOT NULL,
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.report_actions ENABLE ROW LEVEL SECURITY;

-- 9. MODERATION HISTORY TABLE
-- ============================================================
CREATE TABLE public.moderation_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  action moderation_action NOT NULL,
  reason TEXT,
  admin_id UUID,
  admin_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.moderation_history ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_moderation_history_product_id ON public.moderation_history(product_id);

-- 10. SELLER ACTIONS TABLE
-- ============================================================
CREATE TABLE public.seller_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID REFERENCES public.sellers(id) ON DELETE CASCADE NOT NULL,
  action seller_action_type NOT NULL,
  reason TEXT,
  admin_id UUID NOT NULL,
  admin_name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.seller_actions ENABLE ROW LEVEL SECURITY;

-- 11. SUBSCRIBERS TABLE
-- ============================================================
CREATE TABLE public.subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  metodo_contacto contact_method NOT NULL,
  contacto TEXT NOT NULL,
  categorias TEXT[] NOT NULL DEFAULT '{}',
  zona TEXT NOT NULL,
  frecuencia TEXT NOT NULL DEFAULT 'semanal',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- 12. LEADS TABLE (public reservation requests)
-- ============================================================
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  buyer_name TEXT NOT NULL,
  buyer_contact TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  note TEXT,
  status reservation_status NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- TRIGGERS: Auto-update updated_at
-- ============================================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_sellers_updated_at
  BEFORE UPDATE ON public.sellers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_reservations_updated_at
  BEFORE UPDATE ON public.reservations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================
-- TRIGGER: Auto-create seller profile on signup
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_seller()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.sellers (user_id, nombre_comercial, email, telefono, zona)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'nombre_comercial', 'Sin nombre'),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'telefono', ''),
    COALESCE(NEW.raw_user_meta_data->>'zona', '')
  );
  
  -- Also assign seller role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'seller');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_seller();

-- ============================================================
-- TRIGGER: Auto-calculate discount percentage
-- ============================================================
CREATE OR REPLACE FUNCTION public.calculate_discount_pct()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.price_before > 0 THEN
    NEW.discount_pct = ROUND(((NEW.price_before - NEW.price_now) / NEW.price_before) * 100);
  ELSE
    NEW.discount_pct = 0;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER calculate_product_discount
  BEFORE INSERT OR UPDATE OF price_before, price_now ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.calculate_discount_pct();

-- ============================================================
-- RLS POLICIES
-- ============================================================

-- USER ROLES: Only admins can read, no public access
CREATE POLICY "Admins can read all roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- SELLERS: Public can read active sellers, sellers can update own profile
CREATE POLICY "Anyone can view active sellers"
  ON public.sellers FOR SELECT
  USING (status = 'active' OR (auth.uid() IS NOT NULL AND user_id = auth.uid()));

CREATE POLICY "Sellers can update own profile"
  ON public.sellers FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can read all sellers"
  ON public.sellers FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update any seller"
  ON public.sellers FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- PRODUCTS: Public can read approved, sellers manage own, admins manage all
CREATE POLICY "Anyone can view approved products"
  ON public.products FOR SELECT
  USING (status = 'approved');

CREATE POLICY "Sellers can view own products"
  ON public.products FOR SELECT
  TO authenticated
  USING (seller_id IN (SELECT id FROM public.sellers WHERE user_id = auth.uid()));

CREATE POLICY "Sellers can insert own products"
  ON public.products FOR INSERT
  TO authenticated
  WITH CHECK (seller_id IN (SELECT id FROM public.sellers WHERE user_id = auth.uid()));

CREATE POLICY "Sellers can update own products"
  ON public.products FOR UPDATE
  TO authenticated
  USING (seller_id IN (SELECT id FROM public.sellers WHERE user_id = auth.uid()));

CREATE POLICY "Sellers can delete own draft products"
  ON public.products FOR DELETE
  TO authenticated
  USING (seller_id IN (SELECT id FROM public.sellers WHERE user_id = auth.uid()) AND status = 'draft');

CREATE POLICY "Admins can read all products"
  ON public.products FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update any product"
  ON public.products FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- RESERVATIONS: Sellers can read own, anyone can insert, admins can read all
CREATE POLICY "Sellers can view own reservations"
  ON public.reservations FOR SELECT
  TO authenticated
  USING (seller_id IN (SELECT id FROM public.sellers WHERE user_id = auth.uid()));

CREATE POLICY "Anyone can create reservations"
  ON public.reservations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Sellers can update own reservations"
  ON public.reservations FOR UPDATE
  TO authenticated
  USING (seller_id IN (SELECT id FROM public.sellers WHERE user_id = auth.uid()));

CREATE POLICY "Admins can read all reservations"
  ON public.reservations FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- REPORTS: Anyone can create, admins can manage
CREATE POLICY "Anyone can create reports"
  ON public.reports FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can read all reports"
  ON public.reports FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update reports"
  ON public.reports FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- REPORT ACTIONS: Admins only
CREATE POLICY "Admins can manage report actions"
  ON public.report_actions FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- MODERATION HISTORY: Admins can manage, sellers can read own product history
CREATE POLICY "Admins can manage moderation history"
  ON public.moderation_history FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Sellers can view own product moderation"
  ON public.moderation_history FOR SELECT
  TO authenticated
  USING (product_id IN (
    SELECT p.id FROM public.products p
    JOIN public.sellers s ON p.seller_id = s.id
    WHERE s.user_id = auth.uid()
  ));

-- SELLER ACTIONS: Admins only
CREATE POLICY "Admins can manage seller actions"
  ON public.seller_actions FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- SUBSCRIBERS: Anyone can insert, admins can read
CREATE POLICY "Anyone can subscribe"
  ON public.subscribers FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can read subscribers"
  ON public.subscribers FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- LEADS: Anyone can create, sellers can read their product leads
CREATE POLICY "Anyone can create leads"
  ON public.leads FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Sellers can view leads for their products"
  ON public.leads FOR SELECT
  TO authenticated
  USING (product_id IN (
    SELECT p.id FROM public.products p
    JOIN public.sellers s ON p.seller_id = s.id
    WHERE s.user_id = auth.uid()
  ));

CREATE POLICY "Admins can read all leads"
  ON public.leads FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- ============================================================
-- HELPER FUNCTION: Generate slug from title
-- ============================================================
CREATE OR REPLACE FUNCTION public.generate_slug(title TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN lower(
    regexp_replace(
      regexp_replace(
        translate(title, 'áéíóúñÁÉÍÓÚÑ', 'aeiounAEIOUN'),
        '[^a-zA-Z0-9\s-]', '', 'g'
      ),
      '\s+', '-', 'g'
    )
  ) || '-' || substr(gen_random_uuid()::text, 1, 8);
END;
$$ LANGUAGE plpgsql SET search_path = public;
