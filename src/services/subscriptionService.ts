import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';
import type { Subscriber, SubscriptionFormData } from '@/types/subscription';

type SubscriberRow = Database['public']['Tables']['subscribers']['Row'];

const MENSAJE_RED =
  'No pudimos conectar con el servidor. Verificá tu conexión e intentá de nuevo.';
const MENSAJE_DUPLICADO = 'Este email/WhatsApp ya está suscrito a nuestras ofertas.';
const MENSAJE_GENERAL =
  'Hubo un error inesperado. Intentá de nuevo en unos minutos.';
const MENSAJE_VALIDACION = 'Revisá los datos ingresados e intentá de nuevo.';

const SUBSCRIBE_TIMEOUT_MS = 15000;

class SubscriptionServiceError extends Error {
  public readonly kind:
    | 'duplicate'
    | 'network'
    | 'timeout'
    | 'validation'
    | 'unknown';

  constructor(
    message: string,
    kind: SubscriptionServiceError['kind'] = 'unknown'
  ) {
    super(message);
    this.name = 'SubscriptionServiceError';
    this.kind = kind;
  }
}

const withTimeout = async <T,>(promise: Promise<T>, timeoutMs: number): Promise<T> => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new SubscriptionServiceError(MENSAJE_RED, 'timeout'));
    }, timeoutMs);
  });

  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
};

const isNetworkLikeError = (error: unknown): boolean => {
  if (error instanceof SubscriptionServiceError) {
    return error.kind === 'network' || error.kind === 'timeout';
  }
  if (error instanceof TypeError) return true;
  if (error instanceof Error) {
    return /failed to fetch|networkerror|load failed|fetch/i.test(error.message);
  }
  return false;
};

const isDuplicateError = (error: unknown): boolean => {
  if (!error || typeof error !== 'object') return false;
  const maybe = error as { code?: unknown; message?: unknown; details?: unknown };
  if (maybe.code === '23505') return true;
  const combined = `${String(maybe.message ?? '')} ${String(maybe.details ?? '')}`;
  return /duplicate key value|already exists/i.test(combined);
};

const normalizeContacto = (data: SubscriptionFormData): string | null => {
  if (data.metodoContacto === 'email') {
    return data.email ? data.email.trim().toLowerCase() : null;
  }
  if (data.metodoContacto === 'whatsapp') {
    return data.whatsapp ? data.whatsapp.replace(/\s/g, '') : null;
  }
  return null;
};

const mapRowToSubscriber = (row: SubscriberRow): Subscriber => {
  const metodoContacto =
    row.metodo_contacto === 'whatsapp' ? 'whatsapp' : 'email';

  return {
    id: row.id,
    nombre: row.nombre,
    metodoContacto,
    contacto: row.contacto,
    categorias: row.categorias ?? [],
    zona: row.zona,
    frecuencia: row.frecuencia,
    created_at: row.created_at,
  };
};

/**
 * Insertar un nuevo suscriptor en Supabase
 * @param data - Datos del formulario validados
 * @returns El suscriptor creado
 * @throws Error si falla la inserción
 */
export const subscribe = async (data: SubscriptionFormData): Promise<Subscriber> => {
  const contacto = normalizeContacto(data);

  if (!data?.nombre || !data?.metodoContacto || !contacto) {
    throw new SubscriptionServiceError(MENSAJE_VALIDACION, 'validation');
  }
  if (!Array.isArray(data.categorias) || data.categorias.length === 0) {
    throw new SubscriptionServiceError(MENSAJE_VALIDACION, 'validation');
  }
  if (!data.zona) {
    throw new SubscriptionServiceError(MENSAJE_VALIDACION, 'validation');
  }

  const payload: Database['public']['Tables']['subscribers']['Insert'] = {
    nombre: data.nombre,
    metodo_contacto: data.metodoContacto,
    contacto,
    categorias: data.categorias,
    zona: data.zona,
    frecuencia: data.frecuencia || 'inmediato',
  };

  try {
    const { data: row, error } = await withTimeout(
      supabase.from('subscribers').insert(payload).select('*').single(),
      SUBSCRIBE_TIMEOUT_MS
    );

    if (error) {
      if (isDuplicateError(error)) {
        throw new SubscriptionServiceError(MENSAJE_DUPLICADO, 'duplicate');
      }
      throw error;
    }

    if (!row) {
      throw new SubscriptionServiceError(MENSAJE_GENERAL, 'unknown');
    }

    return mapRowToSubscriber(row);
  } catch (error) {
    console.error('Error al suscribir en Supabase:', error);

    if (error instanceof SubscriptionServiceError) {
      throw new Error(error.message);
    }

    if (isDuplicateError(error)) {
      throw new Error(MENSAJE_DUPLICADO);
    }

    if (isNetworkLikeError(error)) {
      throw new Error(MENSAJE_RED);
    }

    throw new Error(MENSAJE_GENERAL);
  }
};

/**
 * Obtener el conteo total de suscriptores (para stats en landing)
 * @returns Número total de suscriptores
 */
export const getSubscriberCount = async (): Promise<number> => {
  try {
    const { count, error } = await supabase
      .from('subscribers')
      .select('*', { count: 'exact', head: true });

    if (error) throw error;
    return typeof count === 'number' ? count : 0;
  } catch (error) {
    console.error('Error al obtener conteo de suscriptores:', error);
    return 0;
  }
};

