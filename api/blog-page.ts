import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join } from 'path';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(supabaseUrl!, supabaseKey!);

const SITE = 'https://liquioff.com.uy';

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

  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();

  if (!post) {
    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(indexHtml);
  }

  const title = `${post.title} | LiquiOff`;
  const description = (post.excerpt || '').substring(0, 155);
  const image = post.cover_image_url || `${SITE}/liquioff-logo-og-1200x630.png`;
  const url = `${SITE}/blog/${post.slug}`;
  const isoPublished = post.published_at ? new Date(post.published_at).toISOString() : undefined;
  const isoUpdated = post.updated_at ? new Date(post.updated_at).toISOString() : isoPublished;

  const articleSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.cover_image_url || undefined,
    "datePublished": isoPublished,
    "dateModified": isoUpdated,
    "author": {
      "@type": "Person",
      "name": post.author || 'LiquiOff',
    },
    "publisher": {
      "@type": "Organization",
      "name": "LiquiOff",
      "url": SITE,
    },
  });

  const metaTags = `
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:image" content="${escapeHtml(image)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:locale" content="es_UY" />
    <meta property="og:site_name" content="LiquiOff" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${escapeHtml(image)}" />
    <script type="application/ld+json">${articleSchema}</script>`;

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
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=300');
  res.status(200).send(html);
}
