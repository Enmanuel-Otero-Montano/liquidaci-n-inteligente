import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join } from 'path';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(supabaseUrl!, supabaseKey!);

const SITE = 'https://liquioff.com.uy';

// Read the built index.html once at cold start
let indexHtml = '';
try {
  indexHtml = readFileSync(join(process.cwd(), 'dist', 'index.html'), 'utf-8');
} catch {
  // Fallback: will serve empty page if dist not available
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const slug = req.query.slug as string;

  if (!slug || !indexHtml) {
    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(indexHtml || '<!doctype html><html><body></body></html>');
  }

  const { data: product } = await supabase
    .from('products')
    .select('*, sellers!inner(nombre_comercial, zona)')
    .eq('slug', slug)
    .eq('status', 'approved')
    .maybeSingle();

  if (!product) {
    // Product not found — serve original HTML, let React handle the 404
    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(indexHtml);
  }

  const title = `${product.title} - ${product.discount_pct}% OFF | LiquiOff`;
  const description = (product.description || '').substring(0, 155)
    || `${product.title} con ${product.discount_pct}% de descuento en LiquiOff Uruguay.`;
  const image = product.images?.[0] || `${SITE}/liquioff-logo-og-1200x630.png`;
  const url = `${SITE}/p/${product.slug}`;
  const price = Number(product.price_now);
  const priceBefore = Number(product.price_before);
  const sellerName = product.sellers?.nombre_comercial || '';

  const productSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "description": product.description,
    "image": product.images || [],
    "url": url,
    "brand": {
      "@type": "Organization",
      "name": sellerName,
    },
    "offers": {
      "@type": "Offer",
      "price": price,
      "priceCurrency": "UYU",
      "availability": product.stock_qty > 0
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      "url": url,
      "seller": {
        "@type": "Organization",
        "name": sellerName,
      },
    },
  });

  const metaTags = `
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="product" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:image" content="${escapeHtml(image)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:locale" content="es_UY" />
    <meta property="og:site_name" content="LiquiOff" />
    <meta property="product:price:amount" content="${price}" />
    <meta property="product:price:currency" content="UYU" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${escapeHtml(image)}" />
    <script type="application/ld+json">${productSchema}</script>`;

  // Remove default generic meta tags and inject product-specific ones
  let html = indexHtml;
  html = html.replace(/<title>.*?<\/title>/, '');
  html = html.replace(/<meta name="description"[^>]*\/>/, '');
  html = html.replace(/<meta name="description"[^>]*>/, '');
  html = html.replace(/<link rel="canonical"[^>]*\/>/, '');
  html = html.replace(/<link rel="canonical"[^>]*>/, '');
  html = html.replace(/<meta property="og:[^>]*\/>/g, '');
  html = html.replace(/<meta property="og:[^>]*>/g, '');
  html = html.replace(/<meta name="twitter:[^>]*\/>/g, '');
  html = html.replace(/<meta name="twitter:[^>]*>/g, '');
  html = html.replace('</head>', `${metaTags}\n</head>`);

  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=60');
  res.status(200).send(html);
}
