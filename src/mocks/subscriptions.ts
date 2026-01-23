import type { Subscriber, SubscriptionFormData } from '@/types/subscription';

export const mockSubscribe = async (data: SubscriptionFormData): Promise<{ success: boolean; subscriber: Subscriber }> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const subscriber: Subscriber = {
    id: `sub-${Date.now()}`,
    nombre: data.nombre,
    metodoContacto: data.metodoContacto,
    contacto: data.metodoContacto === 'email' ? data.email! : data.whatsapp!,
    categorias: data.categorias,
    zona: data.zona,
    frecuencia: data.frecuencia,
    created_at: new Date().toISOString(),
  };
  
  // Guardar en localStorage
  const existing = JSON.parse(localStorage.getItem('subscribers') || '[]');
  existing.push(subscriber);
  localStorage.setItem('subscribers', JSON.stringify(existing));
  
  return { success: true, subscriber };
};

export const getSubscriberCount = (): number => {
  const existing = JSON.parse(localStorage.getItem('subscribers') || '[]');
  return existing.length + 127; // Número base ficticio
};
