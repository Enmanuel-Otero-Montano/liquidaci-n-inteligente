import crypto from 'crypto';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const ML_AUTH_BASE = 'https://auth.mercadolibre.com.uy';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sellerId = req.query.seller_id as string;
  if (!sellerId) {
    return res.status(400).json({ error: 'seller_id is required' });
  }

  const clientId = process.env.ML_CLIENT_ID;
  const redirectUri = process.env.ML_REDIRECT_URI;
  if (!clientId || !redirectUri) {
    return res.status(500).json({ error: 'Missing ML environment variables' });
  }

  const codeVerifier = crypto.randomBytes(64).toString('base64url');
  const codeChallenge = crypto
    .createHash('sha256')
    .update(codeVerifier)
    .digest('base64url');

  const statePayload = {
    seller_id: sellerId,
    nonce: crypto.randomUUID(),
    code_verifier: codeVerifier,
  };
  const state = Buffer.from(JSON.stringify(statePayload)).toString('base64url');

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
    state,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
  });

  const url = `${ML_AUTH_BASE}/authorization?${params.toString()}`;

  return res.status(200).json({ url });
}
