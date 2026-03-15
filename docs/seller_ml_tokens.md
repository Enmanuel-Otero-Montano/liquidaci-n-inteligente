# Tabla: seller_ml_tokens

Almacena los tokens OAuth de MercadoLibre vinculados a cada vendedor. Permite que las serverless functions (con `service_role`) lean y escriban tokens sin restricciones RLS, mientras que los vendedores autenticados solo pueden ver su propio registro.

## Esquema

| Columna | Tipo | Restricciones |
|---|---|---|
| `id` | `uuid` | PK, `DEFAULT gen_random_uuid()` |
| `seller_id` | `uuid` | FK → `sellers(id)` ON DELETE CASCADE, NOT NULL, UNIQUE |
| `ml_user_id` | `text` | NOT NULL |
| `access_token` | `text` | NOT NULL |
| `refresh_token` | `text` | NOT NULL |
| `expires_at` | `timestamptz` | NOT NULL |
| `created_at` | `timestamptz` | `DEFAULT now()` |
| `updated_at` | `timestamptz` | `DEFAULT now()`, auto-actualizado por trigger |

## RLS (Row Level Security)

RLS está habilitado. Solo existe una policy:

| Policy | Operacion | Condicion |
|---|---|---|
| `seller_can_view_own_ml_token` | SELECT | `seller_id IN (SELECT id FROM sellers WHERE user_id = auth.uid())` |

No hay policies de INSERT ni UPDATE. Las escrituras se realizan desde serverless functions usando `service_role`, que bypasea RLS por diseno.

## Trigger

- **`trg_seller_ml_tokens_updated_at`**: BEFORE UPDATE, ejecuta `update_seller_ml_tokens_updated_at()` para setear `updated_at = now()` automaticamente.

## SQL de creacion

Ejecutar en el SQL Editor de Supabase:

```sql
CREATE TABLE IF NOT EXISTS public.seller_ml_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id uuid NOT NULL REFERENCES public.sellers(id) ON DELETE CASCADE,
  ml_user_id text NOT NULL,
  access_token text NOT NULL,
  refresh_token text NOT NULL,
  expires_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE (seller_id)
);

ALTER TABLE public.seller_ml_tokens ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'seller_ml_tokens'
      AND policyname = 'seller_can_view_own_ml_token'
  ) THEN
    CREATE POLICY seller_can_view_own_ml_token
      ON public.seller_ml_tokens
      FOR SELECT
      USING (
        seller_id IN (
          SELECT id FROM public.sellers WHERE user_id = auth.uid()
        )
      );
  END IF;
END
$$;

CREATE OR REPLACE FUNCTION public.update_seller_ml_tokens_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger
    WHERE tgname = 'trg_seller_ml_tokens_updated_at'
  ) THEN
    CREATE TRIGGER trg_seller_ml_tokens_updated_at
      BEFORE UPDATE ON public.seller_ml_tokens
      FOR EACH ROW
      EXECUTE FUNCTION public.update_seller_ml_tokens_updated_at();
  END IF;
END
$$;
```

## Verificacion

Despues de ejecutar la query, confirmar con:

```sql
-- Tabla creada correctamente
SELECT * FROM seller_ml_tokens LIMIT 0;

-- RLS habilitado
SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'seller_ml_tokens';
```
