
-- =============================================
-- 1. ENUMS
-- =============================================
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
CREATE TYPE public.seller_status AS ENUM ('active', 'pending', 'suspended');
CREATE TYPE public.product_status AS ENUM ('draft', 'pending', 'approved', 'rejected', 'disabled', 'changes_requested');
CREATE TYPE public.delivery_type AS ENUM ('pickup', 'shipping', 'both');
CREATE TYPE public.reservation_status AS ENUM ('new', 'contacted', 'closed', 'lost');
CREATE TYPE public.report_status AS ENUM ('open', 'resolved');

-- =============================================
-- 2. TABLES (created first so functions can reference them)
-- =============================================

-- User roles (RBAC)
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Sellers
CREATE TABLE public.sellers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  nombre_comercial text NOT NULL DEFAULT '',
  responsable text,
  email text NOT NULL DEFAULT '',
  telefono text NOT NULL DEFAULT '',
  zona text NOT NULL DEFAULT '',
  direccion text,
  politicas text,
  horario_retiro text,
  whatsapp_message text,
  profile_image_url text,
  status seller_status NOT NULL DEFAULT 'active',
  is_verified boolean NOT NULL DEFAULT false,
  verified_at timestamptz,
  verified_by text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Products
CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id uuid NOT NULL REFERENCES public.sellers(id) ON DELETE CASCADE,
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT '',
  price_before numeric(12,2) NOT NULL DEFAULT 0,
  price_now numeric(12,2) NOT NULL DEFAULT 0,
  discount_pct integer NOT NULL DEFAULT 0,
  stock_qty integer NOT NULL DEFAULT 1,
  location text NOT NULL DEFAULT '',
  images text[] NOT NULL DEFAULT '{}',
  status product_status NOT NULL DEFAULT 'draft',
  delivery_type delivery_type NOT NULL DEFAULT 'pickup',
  shipping_cost numeric(10,2),
  liquidation_reason text,
  evidence_url text,
  pickup_address text,
  pickup_hours text,
  offers_shipping boolean NOT NULL DEFAULT false,
  quantity_promo jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Reservations (leads)
CREATE TABLE public.reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  seller_id uuid NOT NULL REFERENCES public.sellers(id) ON DELETE CASCADE,
  buyer_name text NOT NULL,
  buyer_contact text NOT NULL,
  buyer_contact_type text NOT NULL DEFAULT 'email',
  quantity integer NOT NULL DEFAULT 1,
  note text,
  seller_notes text,
  status reservation_status NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Reports (anti-fraud)
CREATE TABLE public.reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  reason text NOT NULL,
  description text,
  reporter_email text,
  status report_status NOT NULL DEFAULT 'open',
  resolved_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Report actions (admin actions on reports)
CREATE TABLE public.report_actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id uuid NOT NULL REFERENCES public.reports(id) ON DELETE CASCADE,
  action text NOT NULL,
  admin_id text,
  admin_name text NOT NULL DEFAULT 'Admin',
  note text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Seller actions (admin actions on sellers)
CREATE TABLE public.seller_actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id uuid NOT NULL REFERENCES public.sellers(id) ON DELETE CASCADE,
  action text NOT NULL,
  reason text,
  admin_id text,
  admin_name text NOT NULL DEFAULT 'Admin',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Moderation history
CREATE TABLE public.moderation_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  action text NOT NULL,
  reason text,
  admin_id text,
  admin_name text NOT NULL DEFAULT 'Admin',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Subscribers (newsletter)
CREATE TABLE public.subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre text NOT NULL,
  metodo_contacto text NOT NULL DEFAULT 'email',
  contacto text NOT NULL,
  categorias text[] NOT NULL DEFAULT '{}',
  zona text NOT NULL DEFAULT '',
  frecuencia text NOT NULL DEFAULT 'inmediato',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- =============================================
-- 3. FUNCTIONS (after tables exist)
-- =============================================

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- RBAC: Check if user has a specific role
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
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

-- Helper: Check if user is the seller owner
CREATE OR REPLACE FUNCTION public.is_seller_owner(_seller_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.sellers
    WHERE id = _seller_id
      AND user_id = auth.uid()
  )
$$;

-- Generate URL-safe slug from title
CREATE OR REPLACE FUNCTION public.generate_slug(title text)
RETURNS text
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  base_slug text;
  final_slug text;
  counter integer := 0;
BEGIN
  base_slug := lower(title);
  base_slug := translate(base_slug, 'áéíóúàèìòùäëïöüñ', 'aeiouaeiouaeioun');
  base_slug := regexp_replace(base_slug, '[^a-z0-9\s-]', '', 'g');
  base_slug := regexp_replace(base_slug, '\s+', '-', 'g');
  base_slug := regexp_replace(base_slug, '-+', '-', 'g');
  base_slug := trim(both '-' from base_slug);
  final_slug := base_slug;
  WHILE EXISTS (SELECT 1 FROM public.products WHERE slug = final_slug) LOOP
    counter := counter + 1;
    final_slug := base_slug || '-' || counter;
  END LOOP;
  RETURN final_slug;
END;
$$;

-- Calculate discount percentage
CREATE OR REPLACE FUNCTION public.calculate_discount()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.price_before > 0 THEN
    NEW.discount_pct := round(((NEW.price_before - NEW.price_now)::numeric / NEW.price_before::numeric) * 100);
  ELSE
    NEW.discount_pct := 0;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Auto-create seller profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.sellers (user_id, email, nombre_comercial, telefono, zona, responsable, direccion)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'nombre_comercial', ''),
    COALESCE(NEW.raw_user_meta_data->>'telefono', ''),
    COALESCE(NEW.raw_user_meta_data->>'zona', ''),
    COALESCE(NEW.raw_user_meta_data->>'responsable', ''),
    COALESCE(NEW.raw_user_meta_data->>'direccion', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- =============================================
-- 4. INDEXES
-- =============================================
CREATE INDEX idx_products_seller_id ON public.products(seller_id);
CREATE INDEX idx_products_status ON public.products(status);
CREATE INDEX idx_products_slug ON public.products(slug);
CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_products_discount ON public.products(discount_pct DESC);
CREATE INDEX idx_reservations_seller_id ON public.reservations(seller_id);
CREATE INDEX idx_reservations_product_id ON public.reservations(product_id);
CREATE INDEX idx_reports_product_id ON public.reports(product_id);
CREATE INDEX idx_reports_status ON public.reports(status);
CREATE INDEX idx_sellers_user_id ON public.sellers(user_id);
CREATE INDEX idx_sellers_status ON public.sellers(status);
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);

-- =============================================
-- 5. TRIGGERS
-- =============================================
CREATE TRIGGER update_sellers_updated_at
  BEFORE UPDATE ON public.sellers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_reservations_updated_at
  BEFORE UPDATE ON public.reservations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER calculate_product_discount
  BEFORE INSERT OR UPDATE OF price_before, price_now ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.calculate_discount();

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================
-- 6. ROW LEVEL SECURITY
-- =============================================

-- user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- sellers
ALTER TABLE public.sellers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view sellers"
  ON public.sellers FOR SELECT
  USING (true);

CREATE POLICY "Sellers can update own profile"
  ON public.sellers FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can update any seller"
  ON public.sellers FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "System can insert sellers"
  ON public.sellers FOR INSERT
  WITH CHECK (true);

-- products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view approved products"
  ON public.products FOR SELECT
  USING (
    status = 'approved'
    OR public.is_seller_owner(seller_id)
    OR public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Sellers can insert own products"
  ON public.products FOR INSERT
  TO authenticated
  WITH CHECK (public.is_seller_owner(seller_id));

CREATE POLICY "Sellers can update own products"
  ON public.products FOR UPDATE
  TO authenticated
  USING (
    public.is_seller_owner(seller_id)
    OR public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Sellers can delete own products"
  ON public.products FOR DELETE
  TO authenticated
  USING (public.is_seller_owner(seller_id));

-- reservations
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create reservations"
  ON public.reservations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Sellers can view own reservations"
  ON public.reservations FOR SELECT
  TO authenticated
  USING (
    public.is_seller_owner(seller_id)
    OR public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Sellers can update own reservations"
  ON public.reservations FOR UPDATE
  TO authenticated
  USING (public.is_seller_owner(seller_id));

-- reports
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create reports"
  ON public.reports FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view all reports"
  ON public.reports FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update reports"
  ON public.reports FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- report_actions
ALTER TABLE public.report_actions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage report actions"
  ON public.report_actions FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- seller_actions
ALTER TABLE public.seller_actions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage seller actions"
  ON public.seller_actions FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- moderation_history
ALTER TABLE public.moderation_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage moderation history"
  ON public.moderation_history FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Sellers can view own product moderation"
  ON public.moderation_history FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.products p
      WHERE p.id = product_id
      AND public.is_seller_owner(p.seller_id)
    )
  );

-- subscribers
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe"
  ON public.subscribers FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view subscribers"
  ON public.subscribers FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
