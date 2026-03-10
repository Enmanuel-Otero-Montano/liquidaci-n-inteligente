# SEO - Implementacion y Documentacion

## Resumen

Se implemento SEO para que los productos publicados en LiquiOff aparezcan en resultados de busqueda de Google con meta tags dinamicos, schema.org/Product y un sitemap generado automaticamente.

---

## Que se implemento

### 1. Sitemap dinamico (`api/sitemap.xml.ts`)

Vercel Serverless Function que genera el sitemap consultando productos aprobados en Supabase en tiempo real.

- **Ruta:** `https://liquioff.com.uy/sitemap.xml`
- **Cache:** 1 hora (`s-maxage=3600`)
- **Contenido:** URLs estaticas (home, catalogo, legales) + todas las URLs de productos con `status = 'approved'`
- **Rewrite en `vercel.json`:** `/sitemap.xml` -> `/api/sitemap.xml`

### 2. Meta tags server-side para productos (`api/product-page.ts`)

Vercel Serverless Function que intercepta las requests a `/p/:slug`, consulta el producto en Supabase, y sirve el `index.html` con meta tags inyectados.

- **Rewrite en `vercel.json`:** `/p/:slug` -> `/api/product-page?slug=:slug`
- **Cache:** 5 minutos (`s-maxage=300, stale-while-revalidate=60`)
- **Lee `dist/index.html`** (configurado via `includeFiles` en `vercel.json`)
- **Reemplaza** los meta tags genericos del `index.html` por los del producto:
  - `<title>` con nombre del producto + descuento
  - `<meta name="description">` con descripcion del producto (max 155 chars)
  - Open Graph tags (og:title, og:description, og:image, og:url, og:type=product)
  - Twitter Cards (summary_large_image)
  - Precio (`product:price:amount`, `product:price:currency=UYU`)
  - `<link rel="canonical">` por producto
  - Schema.org/Product en JSON-LD

### 3. Helmet client-side en ProductDetailPage

`react-helmet-async` en `src/pages/ProductDetail/ProductDetailPage.tsx` como complemento al server-side. Cuando React carga, actualiza los meta tags en el `<head>` del documento.

Incluye los mismos tags que la funcion serverless:
- Title, description, canonical
- Open Graph, Twitter Cards
- Schema.org/Product con JSON-LD (nombre, descripcion, imagenes, precio, disponibilidad, vendedor)

### 4. Slugs descriptivos para SEO

Se modifico la funcion `generate_slug` en Supabase para generar slugs con el formato:

```
titulo-del-producto-TIMESTAMP
```

Ejemplo: `luz-ulanzi-l023-pro-40w-1772982466116`

- El titulo aporta keywords para SEO
- El timestamp (milisegundos) garantiza unicidad sin necesidad de loop de colisiones
- Patron similar al de MercadoLibre/Amazon

**Funcion SQL en Supabase:**
```sql
CREATE OR REPLACE FUNCTION public.generate_slug(title text)
RETURNS text
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  base_slug text;
  ts_suffix text;
BEGIN
  base_slug := lower(title);
  base_slug := translate(base_slug, 'áéíóúàèìòùäëïöüñ', 'aeiouaeiouaeioun');
  base_slug := regexp_replace(base_slug, '[^a-z0-9\s-]', '', 'g');
  base_slug := regexp_replace(base_slug, '\s+', '-', 'g');
  base_slug := regexp_replace(base_slug, '-+', '-', 'g');
  base_slug := trim(both '-' from base_slug);
  ts_suffix := floor(extract(epoch from clock_timestamp()) * 1000)::text;
  RETURN base_slug || '-' || ts_suffix;
END;
$$;
```

---

## Archivos involucrados

| Archivo | Tipo | Descripcion |
|---------|------|-------------|
| `api/sitemap.xml.ts` | Nuevo | Serverless function - sitemap dinamico |
| `api/product-page.ts` | Nuevo | Serverless function - HTML con meta tags por producto |
| `vercel.json` | Modificado | Rewrites para sitemap, product pages, y config de includeFiles |
| `src/pages/ProductDetail/ProductDetailPage.tsx` | Modificado | Helmet con meta tags + schema.org/Product |
| `src/hooks/useProductForm.ts` | Modificado | Fallback de slug actualizado |
| `public/sitemap.xml` | Eliminado | Reemplazado por funcion dinamica |
| `public/robots.txt` | Sin cambios | Ya referenciaba `/sitemap.xml` |

---

## Variables de entorno requeridas (Vercel)

Las funciones serverless usan estas variables via `process.env`:

- `VITE_SUPABASE_URL` o `SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY` o `SUPABASE_ANON_KEY`

Deben estar configuradas en Vercel → Settings → Environment Variables.

---

## Como probar

1. **Sitemap:** `curl -s https://liquioff.com.uy/sitemap.xml`
2. **Meta tags de producto:** `curl -s https://liquioff.com.uy/p/SLUG | head -40`
3. **Schema.org:** Pegar URL en [Google Rich Results Test](https://search.google.com/test/rich-results)
4. **Open Graph (redes sociales):** Pegar URL en [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug)
5. **Indexacion:** Google Search Console → Inspeccionar URL → Solicitar indexacion
6. **Cobertura:** Buscar `site:liquioff.com.uy/p/` en Google

---

## Recomendaciones a futuro

### Prioridad alta

- **Agregar Helmet a la pagina de catalogo** (`src/pages/CatalogPage.tsx`) con meta tags y schema.org/ItemList para la lista de productos
- **Monitorear Google Search Console** semanalmente: cobertura de paginas indexadas, errores de rastreo, y rendimiento de busquedas
- **Agregar BreadcrumbList schema.org** al componente `Breadcrumbs.tsx` para mejorar la navegacion en resultados de Google

### Prioridad media

- **Paginas legales con Helmet** (Terminos, Privacidad, Ayuda) — meta tags unicos por pagina
- **Optimizar imagenes OG** — Generar imagenes de 1200x630px por producto (hoy usa la primera imagen del producto, que puede no tener las dimensiones ideales)
- **Agregar `lastmod` a URLs estaticas del sitemap** — Los productos ya tienen `lastmod` con `updated_at`, falta agregarlo a las paginas estaticas (home, catalogo, legales)

### Prioridad baja (cuando el trafico crezca)

- **Evaluar migracion a Next.js** para SSR nativo si las funciones serverless se vuelven un cuello de botella o se necesita mejor rendimiento de indexacion
- **Implementar reviews/ratings** — Permitir que compradores dejen resenas, lo que habilitaria `aggregateRating` en el schema.org/Product (mejora rich snippets)
- **Sitemap index** — Si la cantidad de productos supera los 50,000, dividir el sitemap en multiples archivos con un sitemap index
- **Internacionalizacion (hreflang)** — Si se expande a otros paises, agregar tags hreflang para evitar contenido duplicado entre regiones
- **Prerendering completo** — Considerar un servicio como Prerender.io si Google tiene problemas indexando paginas que dependen de JS
