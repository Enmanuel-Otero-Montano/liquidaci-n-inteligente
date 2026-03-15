# Integracion MercadoLibre - Serverless Functions

API serverless (Vercel) para conectar vendedores con su cuenta de MercadoLibre mediante OAuth 2.0 + PKCE.

## Archivos

| Archivo | Descripcion |
|---|---|
| `lib/supabase-admin.ts` | Cliente Supabase con `service_role` key para uso en serverless functions |
| `api/ml-auth-url.ts` | Genera la URL de autorizacion OAuth de ML con PKCE |
| `api/ml-callback.ts` | Intercambia el code por tokens y los guarda en DB |
| `api/ml-products.ts` | Consulta productos activos del vendedor en ML |

## Variables de entorno requeridas

| Variable | Descripcion |
|---|---|
| `ML_CLIENT_ID` | Client ID de la app registrada en developers.mercadolibre.com |
| `ML_CLIENT_SECRET` | Client Secret de la app |
| `ML_REDIRECT_URI` | Redirect URI registrada en ML (apunta a `/vendedor/ml-callback`) |
| `SUPABASE_URL` | URL del proyecto Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key de Supabase (bypasea RLS) |

## Endpoints

### GET /api/ml-auth-url

Genera la URL de autorizacion de MercadoLibre con PKCE y state anti-CSRF.

**Query params:**
- `seller_id` (string, requerido)

**Response:**
```json
{ "url": "https://auth.mercadolibre.com.uy/authorization?..." }
```

**Flujo PKCE:**
1. Genera `code_verifier` (64 bytes random, base64url)
2. Calcula `code_challenge` (SHA-256 del verifier, base64url)
3. Empaqueta `{ seller_id, nonce, code_verifier }` en el `state` (base64url)
4. Envia `code_challenge` y `code_challenge_method=S256` a ML

### GET /api/ml-callback

Recibe el code de ML (reenviado desde la pagina frontend) y lo intercambia por tokens.

**Query params:**
- `code` (string, requerido) - Codigo de autorizacion de ML
- `state` (string, requerido) - State original con seller_id y code_verifier

**Response:**
```json
{ "success": true }
```
```json
{ "error": "descripcion del error" }
```

**Flujo:**
1. Decodifica el `state` para extraer `seller_id` y `code_verifier`
2. POST a `https://api.mercadolibre.com/oauth/token` con el code y code_verifier
3. Upsert en `seller_ml_tokens` (via supabaseAdmin)
4. Retorna JSON, nunca redirige

### GET /api/ml-products

Consulta los productos activos del vendedor en MercadoLibre.

**Query params:**
- `seller_id` (string, requerido)
- `offset` (number, default 0)

**Response:**
```json
{
  "products": [
    {
      "ml_id": "MLU123456",
      "title": "Nombre del producto",
      "price": 1500,
      "original_price": 2000,
      "images": ["https://http2.mlstatic.com/..."],
      "permalink": "https://articulo.mercadolibre.com.uy/...",
      "available_quantity": 10,
      "discount_pct": 25
    }
  ],
  "total": 50,
  "offset": 0
}
```

**Notas:**
- Si no hay token: retorna 401 `{ "error": "not_connected" }`
- Refresh automatico si el token expira en menos de 10 minutos
- `discount_pct` es `null` cuando no hay `original_price`
- `images` mantiene el orden original de ML

## Flujo completo OAuth

```
Frontend                    ml-auth-url.ts              MercadoLibre
   |                              |                          |
   |-- GET /api/ml-auth-url ---->|                          |
   |                              |-- genera PKCE + state -->|
   |<---- { url } ---------------|                          |
   |                                                         |
   |-- redirect usuario ---------------------------------->|
   |                                                         |
   |<---- redirect a /vendedor/ml-callback?code=...&state=..|
   |                                                         |
   |                     ml-callback.ts                      |
   |-- GET /api/ml-callback -->|                            |
   |                           |-- POST /oauth/token ------>|
   |                           |<---- tokens ---------------|
   |                           |-- upsert DB                |
   |<---- { success: true } ---|                            |
```

## Tabla asociada

Ver `docs/seller_ml_tokens.md` para el esquema de la tabla `seller_ml_tokens`.
