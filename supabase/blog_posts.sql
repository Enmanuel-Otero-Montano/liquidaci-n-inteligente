-- Create blog_posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  excerpt text NOT NULL CHECK (char_length(excerpt) <= 155),
  content text NOT NULL,
  cover_image_url text,
  author text NOT NULL DEFAULT 'LiquiOff',
  category text NOT NULL,
  tags text[] DEFAULT '{}',
  published boolean NOT NULL DEFAULT false,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Index for fast public queries
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON public.blog_posts (published, published_at DESC);
CREATE UNIQUE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts (slug);

-- Enable RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Public read access for published posts
CREATE POLICY "Published blog posts are publicly readable"
  ON public.blog_posts
  FOR SELECT
  USING (published = true);

-- Admin full access (uses the existing has_role RPC)
CREATE POLICY "Admins can manage blog posts"                                                                     
  ON public.blog_posts
  FOR ALL                                                                                                        
  USING (public.has_role(auth.uid(), 'admin'))            
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Auto-update updated_at on row change
CREATE OR REPLACE FUNCTION public.update_blog_posts_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_blog_posts_updated_at();
