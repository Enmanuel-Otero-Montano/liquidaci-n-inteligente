-- =============================================
-- Migration: Add Offer Verification System
-- =============================================

-- 1. Create price_verifications table
CREATE TABLE IF NOT EXISTS price_verifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  admin_id UUID NOT NULL,
  evidence_url TEXT,
  price_reference TEXT,
  verification_method TEXT NOT NULL,
  price_before_verified DECIMAL(10,2) NOT NULL,
  price_now_verified DECIMAL(10,2) NOT NULL,
  discount_verified DECIMAL(5,2) NOT NULL,
  verified_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_price_verifications_product ON price_verifications(product_id);
CREATE INDEX IF NOT EXISTS idx_price_verifications_admin ON price_verifications(admin_id);
CREATE INDEX IF NOT EXISTS idx_price_verifications_date ON price_verifications(verified_at DESC);

-- RLS
ALTER TABLE price_verifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all verifications"
  ON price_verifications FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles WHERE user_roles.user_id = auth.uid() AND user_roles.role = 'admin'
    )
  );

CREATE POLICY "Admins can insert verifications"
  ON price_verifications FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles WHERE user_roles.user_id = auth.uid() AND user_roles.role = 'admin'
    )
  );

-- 2. Add verification columns to products
ALTER TABLE products
ADD COLUMN IF NOT EXISTS verification_status TEXT DEFAULT 'unverified'
  CHECK (verification_status IN ('unverified', 'verifiable', 'verified'));

ALTER TABLE products
ADD COLUMN IF NOT EXISTS verified_at TIMESTAMP WITH TIME ZONE;

ALTER TABLE products
ADD COLUMN IF NOT EXISTS verified_by_admin_id UUID;

CREATE INDEX IF NOT EXISTS idx_products_verification_status
  ON products(verification_status);

-- 3. Migrate existing data
UPDATE products
SET verification_status = CASE
  WHEN evidence_url IS NOT NULL OR (price_reference IS NOT NULL AND LENGTH(price_reference) > 20)
    THEN 'verifiable'
  ELSE 'unverified'
END
WHERE verification_status = 'unverified';
