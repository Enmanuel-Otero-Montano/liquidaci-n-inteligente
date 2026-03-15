import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabaseAdmin } from '../lib/supabase-admin';

const ML_API_BASE = 'https://api.mercadolibre.com';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const code = req.query.code as string;
  const stateRaw = req.query.state as string;

  if (!code || !stateRaw) {
    return res.status(400).json({ error: 'code and state are required' });
  }

  let sellerId: string;
  let codeVerifier: string;
  try {
    const statePayload = JSON.parse(Buffer.from(stateRaw, 'base64url').toString('utf-8'));
    sellerId = statePayload.seller_id;
    codeVerifier = statePayload.code_verifier;
    if (!sellerId || !codeVerifier) throw new Error('Invalid state payload');
  } catch {
    return res.status(400).json({ error: 'Invalid state parameter' });
  }

  const clientId = process.env.ML_CLIENT_ID;
  const clientSecret = process.env.ML_CLIENT_SECRET;
  const redirectUri = process.env.ML_REDIRECT_URI;
  if (!clientId || !clientSecret || !redirectUri) {
    return res.status(500).json({ error: 'Missing ML environment variables' });
  }

  let tokenResponse: Response;
  try {
    tokenResponse = await fetch(`${ML_API_BASE}/oauth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
    });
  } catch (fetchErr) {
    return res.status(502).json({ error: 'Failed to reach MercadoLibre', details: String(fetchErr) });
  }

  if (!tokenResponse.ok) {
    const errorBody = await tokenResponse.text();
    return res.status(tokenResponse.status).json({ error: 'Token exchange failed', details: errorBody });
  }

  const tokenData = await tokenResponse.json();
  const { access_token, refresh_token, expires_in, user_id } = tokenData;

  if (!access_token || !refresh_token || !expires_in || !user_id) {
    return res.status(502).json({ error: 'Incomplete token response from MercadoLibre' });
  }

  const expiresAt = new Date(Date.now() + expires_in * 1000).toISOString();

  const { error: upsertError } = await supabaseAdmin
    .from('seller_ml_tokens')
    .upsert(
      {
        seller_id: sellerId,
        ml_user_id: String(user_id),
        access_token,
        refresh_token,
        expires_at: expiresAt,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'seller_id' }
    );

  if (upsertError) {
    return res.status(500).json({ error: 'Failed to save token', details: upsertError.message });
  }

  return res.status(200).json({ success: true });
}
