export const CATEGORIAS = [
  { value: 'electronica', label: 'Electrónica' },
  { value: 'ropa', label: 'Ropa y Calzado' },
  { value: 'hogar', label: 'Hogar y Decoración' },
  { value: 'belleza', label: 'Belleza y Cuidado Personal' },
  { value: 'deportes', label: 'Deportes' },
  { value: 'accesorios', label: 'Accesorios' },
  { value: 'juguetes', label: 'Juguetes' },
  { value: 'todas', label: 'Todas las categorías' },
] as const;

export const ZONAS_URUGUAY = [
  { value: 'montevideo', label: 'Montevideo' },
  { value: 'canelones', label: 'Canelones' },
  { value: 'maldonado', label: 'Maldonado' },
  { value: 'colonia', label: 'Colonia' },
  { value: 'paysandu', label: 'Paysandú' },
  { value: 'salto', label: 'Salto' },
  { value: 'rivera', label: 'Rivera' },
  { value: 'otro', label: 'Otro departamento' },
] as const;

export const FRECUENCIAS = [
  { value: 'inmediato', label: 'Cada vez que haya algo nuevo' },
  { value: 'semanal', label: 'Resumen semanal' },
  { value: 'mejores', label: 'Solo las mejores ofertas (>40% OFF)' },
] as const;

export const REPORT_REASONS = [
  { 
    value: 'descuento_enganoso', 
    label: 'Descuento engañoso', 
    description: 'El descuento anunciado no parece ser real'
  },
  { 
    value: 'producto_no_coincide', 
    label: 'Producto no coincide', 
    description: 'Las fotos o descripción no coinciden con el producto'
  },
  { 
    value: 'stock_inexistente', 
    label: 'Stock inexistente', 
    description: 'El vendedor dice no tener el producto disponible'
  },
  { 
    value: 'otro', 
    label: 'Otro motivo', 
    description: 'Otro problema con la publicación'
  },
] as const;

export type CategoriaValue = typeof CATEGORIAS[number]['value'];
export type ZonaValue = typeof ZONAS_URUGUAY[number]['value'];
export type FrecuenciaValue = typeof FRECUENCIAS[number]['value'];
export type ReportReasonValue = typeof REPORT_REASONS[number]['value'];
