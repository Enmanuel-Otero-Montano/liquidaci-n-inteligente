import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabaseAdmin } from '../lib/supabase-admin';

const ML_API_BASE = 'https://api.mercadolibre.com';

interface NormalizedProduct {
  ml_id: string;
  title: string;
  price: number;
  original_price: number | null;
  images: string[];
  permalink: string;
  available_quantity: number;
  discount_pct: number | null;
}

async function refreshToken(sellerId: string, currentRefreshToken: string) {
  const clientId = process.env.ML_CLIENT_ID;
  const clientSecret = process.env.ML_CLIENT_SECRET;

  const tokenResponse = await fetch(`${ML_API_BASE}/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: clientId!,
      client_secret: clientSecret!,
      refresh_token: currentRefreshToken,
    }),
  });

  if (!tokenResponse.ok) {
    throw new Error(`Refresh failed: ${tokenResponse.status}`);
  }

  const data = await tokenResponse.json();
  const expiresAt = new Date(Date.now() + data.expires_in * 1000).toISOString();

  await supabaseAdmin
    .from('seller_ml_tokens')
    .update({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_at: expiresAt,
      updated_at: new Date().toISOString(),
    })
    .eq('seller_id', sellerId);

  return data.access_token as string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sellerId = req.query.seller_id as string;
  const offset = parseInt((req.query.offset as string) || '0', 10);

  if (!sellerId) {
    return res.status(400).json({ error: 'seller_id is required' });
  }

  const { data: tokenRow, error: tokenError } = await supabaseAdmin
    .from('seller_ml_tokens')
    .select('*')
    .eq('seller_id', sellerId)
    .maybeSingle();

  if (tokenError) {
    return res.status(500).json({ error: 'Database error', details: tokenError.message });
  }

  if (!tokenRow) {
    return res.status(401).json({ error: 'not_connected' });
  }

  let accessToken = tokenRow.access_token;
  const expiresAt = new Date(tokenRow.expires_at).getTime();
  const tenMinutes = 10 * 60 * 1000;

  if (expiresAt - Date.now() < tenMinutes) {
    try {
      accessToken = await refreshToken(sellerId, tokenRow.refresh_token);
    } catch {
      return res.status(401).json({ error: 'Token refresh failed. Please reconnect MercadoLibre.' });
    }
  }

  const searchUrl = `${ML_API_BASE}/users/${tokenRow.ml_user_id}/items/search?status=active&limit=20&offset=${offset}`;
  const searchResponse = await fetch(searchUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!searchResponse.ok) {
    return res.status(searchResponse.status).json({ error: 'Failed to fetch items from MercadoLibre' });
  }

  const searchData = await searchResponse.json();
  const itemIds: string[] = searchData.results || [];
  const total: number = searchData.paging?.total || 0;

  if (itemIds.length === 0) {
    return res.status(200).json({ products: [], total, offset });
  }

  const multigetUrl = `${ML_API_BASE}/items?ids=${itemIds.join(',')}`;
  const multigetResponse = await fetch(multigetUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!multigetResponse.ok) {
    return res.status(multigetResponse.status).json({ error: 'Failed to fetch item details from MercadoLibre' });
  }

  const multigetData = await multigetResponse.json();

  const products: NormalizedProduct[] = multigetData
    .filter((entry: any) => entry.code === 200 && entry.body)
    .map((entry: any) => {
      const item = entry.body;
      const originalPrice: number | null = item.original_price ?? null;
      const price: number = item.price;

      let discountPct: number | null = null;
      if (originalPrice !== null && originalPrice > 0 && originalPrice > price) {
        discountPct = Math.round(((originalPrice - price) / originalPrice) * 100);
      }

      return {
        ml_id: item.id,
        title: item.title,
        price,
        original_price: originalPrice,
        images: (item.pictures || []).map((pic: any) => pic.secure_url || pic.url),
        permalink: item.permalink,
        available_quantity: item.available_quantity ?? 0,
        discount_pct: discountPct,
      };
    });

  return res.status(200).json({ products, total, offset });
}
