import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(supabaseUrl!, supabaseKey!);

const SITE = 'https://liquioff.com.uy';

const STATIC_URLS = [
  { loc: `${SITE}/`, changefreq: 'daily', priority: '1.0' },
  { loc: `${SITE}/liquidaciones`, changefreq: 'daily', priority: '0.9' },
  { loc: `${SITE}/vendedor/registro`, changefreq: 'monthly', priority: '0.7' },
  { loc: `${SITE}/ayuda`, changefreq: 'monthly', priority: '0.5' },
  { loc: `${SITE}/terminos`, changefreq: 'monthly', priority: '0.3' },
  { loc: `${SITE}/privacidad`, changefreq: 'monthly', priority: '0.3' },
];

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const { data: products } = await supabase
    .from('products')
    .select('slug, updated_at')
    .eq('status', 'approved')
    .order('updated_at', { ascending: false });

  const productUrls = (products || []).map((p) => {
    const lastmod = p.updated_at?.split('T')[0];
    return `  <url>
    <loc>${SITE}/p/${p.slug}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  const staticEntries = STATIC_URLS.map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticEntries.join('\n')}
${productUrls.join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
  res.status(200).send(xml);
}
