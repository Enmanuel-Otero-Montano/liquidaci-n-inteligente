# Integracion MercadoLibre - Frontend

Componentes React para que los vendedores conecten su cuenta de MercadoLibre e importen publicaciones al formulario de productos de LiquiOff.

## Archivos

| Archivo | Descripcion |
|---|---|
| `src/pages/vendedor/MLCallbackPage.tsx` | Pagina intermedia que procesa el callback OAuth de ML |
| `src/hooks/useMercadoLibre.ts` | Hook para conexion, consulta y paginacion de productos ML |
| `src/components/MLProductPicker.tsx` | Dialog modal para seleccionar un producto de ML |
| `src/pages/vendedor/ProductForm/ProductFormPage.tsx` | Modificado: card de importacion ML encima del formulario |

## Ruta: /vendedor/ml-callback

**Archivo:** `src/pages/vendedor/MLCallbackPage.tsx`
**Registrada en:** `src/App.tsx` (ruta publica, sin ProtectedRoute)

Pagina de transicion que el usuario ve brevemente despues de autorizar en MercadoLibre.

**Flujo:**
1. Lee `code` y `state` de los query params de la URL
2. Si no hay `code`: redirige a `/vendedor/productos/nuevo?ml_error=true`
3. Si hay `code`: llama a `GET /api/ml-callback?code=...&state=...`
4. Exito: redirige a `/vendedor/productos/nuevo?ml_connected=true`
5. Error: redirige a `/vendedor/productos/nuevo?ml_error=true`

**UI:** Pantalla de carga minima con logo y texto "Conectando con MercadoLibre..."

## Hook: useMercadoLibre

**Archivo:** `src/hooks/useMercadoLibre.ts`

| Propiedad | Tipo | Descripcion |
|---|---|---|
| `isConnected` | `boolean` | Si el vendedor tiene token ML valido |
| `connect(sellerId)` | `function` | Inicia flujo OAuth (redirige a ML) |
| `products` | `MLProduct[]` | Lista de productos cargados |
| `isLoading` | `boolean` | Estado de carga |
| `error` | `string \| null` | Mensaje de error |
| `fetchProducts(sellerId, offset?)` | `function` | Carga productos (offset para paginacion) |
| `hasMore` | `boolean` | Si hay mas productos por cargar |
| `total` | `number` | Total de productos activos en ML |

**Tipo MLProduct:**
```typescript
{
  ml_id: string;
  title: string;
  price: number;
  original_price: number | null;
  images: string[];
  permalink: string;
  available_quantity: number;
  discount_pct: number | null;
}
```

## Componente: MLProductPicker

**Archivo:** `src/components/MLProductPicker.tsx`

Dialog modal con tres estados:

1. **No conectado:** Boton "Conectar MercadoLibre" con logo de ML
2. **Cargando:** Skeleton cards mientras se cargan productos
3. **Lista de productos:** Grid de cards con foto, titulo, precio y badge de descuento

**Props:**
```typescript
{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectProduct: (product: {
    title: string;
    price: number;
    images: string[];
    permalink: string;
  }) => void;
}
```

**Card de producto ML:**
- Foto principal (primera imagen)
- Titulo (max 2 lineas)
- Precio actual formateado
- Si hay `original_price`: precio tachado + badge "X% OFF actual en ML"
- Si no hay `original_price`: texto "Sin precio original en ML"
- Boton "Usar este producto"

**Paginacion:** Boton "Ver mas" que carga los siguientes 20 productos.

## Integracion en ProductFormPage

**Solo en modo creacion** (no aparece al editar un producto existente).

### UI agregada (encima del formulario, sin modificarlo)

1. **Card de importacion:** Fondo `muted/50`, borde punteado
   - Texto: "¿Tenes productos en MercadoLibre? Importalos en 2 clics"
   - Boton: "Importar desde ML"
2. **Separador visual:** "— o completa manualmente —"
3. **MLProductPicker:** Dialog que se abre al hacer clic en el boton

### Pre-llenado del formulario al seleccionar producto

| Campo ML | Campo del formulario | Notas |
|---|---|---|
| `title` | `title` | Titulo del producto |
| `price` (precio actual en ML) | `price_before` (P0) | Precio anterior en LiquiOff |
| `images` | `images` | Maximo 5, como URLs (no se re-suben) |
| `permalink` | `evidence_url` | Link a la publicacion de ML como evidencia |
| — | `price_now` (P1) | Queda vacio, el vendedor lo completa |

El % OFF se recalcula automaticamente cuando el vendedor ingresa P1.

### Toasts segun query params

| Query param | Toast | Accion adicional |
|---|---|---|
| `?ml_connected=true` | Exito: "MercadoLibre conectado correctamente" | Abre MLProductPicker automaticamente |
| `?ml_error=true` | Error: "No se pudo conectar con MercadoLibre. Intenta de nuevo." | — |

Los query params se limpian de la URL despues de procesarlos.

## Flujo completo del usuario

```
1. Vendedor va a /vendedor/productos/nuevo
2. Ve la card "Importar desde ML" encima del formulario
3. Click en "Importar desde ML" → abre MLProductPicker
4. Si no esta conectado → click "Conectar MercadoLibre"
   → useMercadoLibre.connect() → GET /api/ml-auth-url → redirect a ML
   → Autoriza en ML → redirect a /vendedor/ml-callback?code=...&state=...
   → MLCallbackPage llama a /api/ml-callback → guarda tokens
   → Redirect a /vendedor/productos/nuevo?ml_connected=true
   → Toast de exito + abre MLProductPicker automaticamente
5. Ve sus publicaciones de ML en el modal
6. Click "Usar este producto" → pre-llena formulario
7. Completa precio de oferta (P1) y datos restantes
8. Publica normalmente
```
