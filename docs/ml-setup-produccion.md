# MercadoLibre - Configuracion para Produccion

Guia para dejar funcionando la integracion de MercadoLibre en produccion (liquioff.com.uy).

## 1. Variables de entorno en Vercel (Production)

Ir a Vercel Dashboard → proyecto liquidaci-n-inteligente → Settings → Environment Variables.

Agregar o verificar estas variables para el environment **Production**:

| Variable | Valor |
|---|---|
| `ML_CLIENT_ID` | El client ID de la app en developers.mercadolibre.com |
| `ML_CLIENT_SECRET` | El client secret de la app |
| `ML_REDIRECT_URI` | `https://liquioff.com.uy/vendedor/ml-callback` |
| `SUPABASE_URL` | `https://kzkgfewkvvnitchrxtim.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key del proyecto `kzkgfewkvvnitchrxtim` |

**Importante:** Verificar que `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` apunten al mismo proyecto de Supabase. Durante el desarrollo se detecto que Vercel tenia la service role key de un proyecto diferente (`kzmqdvuruzctcftejyvi`), lo cual causaba errores de FK.

Para verificar a que proyecto pertenece una key, decodificar el JWT y revisar el campo `ref`:
```bash
echo "TU_KEY" | cut -d'.' -f2 | base64 -d 2>/dev/null | python3 -c "import sys,json; print(json.load(sys.stdin).get('ref'))"
```

## 2. App de MercadoLibre

En [developers.mercadolibre.com](https://developers.mercadolibre.com):

1. Ir a la app registrada (ID: `8178662477510074`)
2. En **Redirect URIs**, verificar que este agregada:
   ```
   https://liquioff.com.uy/vendedor/ml-callback
   ```
3. Si se usa ngrok para desarrollo, la URL de ngrok tambien debe estar como redirect URI permitida

## 3. Tabla en Supabase (produccion)

Verificar que la tabla `seller_ml_tokens` existe en el proyecto de produccion ejecutando en SQL Editor:

```sql
SELECT * FROM seller_ml_tokens LIMIT 0;
SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'seller_ml_tokens';
SELECT policyname FROM pg_policies WHERE tablename = 'seller_ml_tokens';
```

Si no existe, ejecutar la query de creacion documentada en `docs/seller_ml_tokens.md`.

## 4. Deploy

Una vez configuradas las variables y verificada la tabla:

```bash
git add .
git commit -m "feat: MercadoLibre integration"
git push
```

Vercel deployara automaticamente. Verificar en los logs de Vercel que las serverless functions `/api/ml-auth-url`, `/api/ml-callback` y `/api/ml-products` esten disponibles.

## 5. Verificacion post-deploy

1. Ir a `https://liquioff.com.uy/vendedor/productos/nuevo` (logueado como vendedor)
2. Click en "Importar desde ML" → "Conectar MercadoLibre"
3. Autorizar en MercadoLibre
4. Debe redirigir de vuelta con toast "MercadoLibre conectado correctamente"
5. Seleccionar un producto y verificar que pre-llena el formulario

## 6. Cambios realizados durante desarrollo

### Archivos de configuracion modificados

| Archivo | Cambio |
|---|---|
| `.env.local` | Agregado `SUPABASE_URL`, corregido `SUPABASE_SERVICE_ROLE_KEY` al proyecto correcto |
| `.env.development` | Agregado `SUPABASE_URL`, corregido `SUPABASE_SERVICE_ROLE_KEY`, agregadas variables ML |
| `vite.config.ts` | Cambiado `allowedHosts: ['all']` a `allowedHosts: true`, agregado proxy `/api` → localhost:3000 |

### Variables en Vercel (development)

Se corrigieron via CLI:
- `SUPABASE_URL` → agregada apuntando a `kzkgfewkvvnitchrxtim`
- `SUPABASE_SERVICE_ROLE_KEY` → actualizada con la key del proyecto correcto

### lib/supabase-admin.ts

Se removio el fallback a `VITE_SUPABASE_URL` para evitar que las serverless functions usen una URL de Supabase incorrecta inyectada por Vercel. Ahora solo lee `SUPABASE_URL`.

## 7. Desarrollo local

Para probar el flujo OAuth en local se necesitan 3 procesos:

```bash
# Terminal 1: Serverless functions
vercel dev

# Terminal 2: Frontend (con proxy a vercel dev)
npm run dev

# Terminal 3: Tunel para redirect URI de ML
ngrok http 8080
```

Luego actualizar `ML_REDIRECT_URI` en `.env.local` y `.env.development` con la URL de ngrok, y reiniciar `vercel dev`.

Acceder desde la URL de ngrok (no desde localhost) para que el flujo OAuth completo funcione.
