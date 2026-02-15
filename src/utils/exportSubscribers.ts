import { Subscriber } from '@/hooks/useSubscribers';

export function exportToCSV(subscribers: Subscriber[], filename: string = 'suscriptores.csv') {
  if (!subscribers || subscribers.length === 0) return;

  const headers = ['Nombre', 'Método', 'Contacto', 'Categorías', 'Zona', 'Frecuencia', 'Fecha'];

  const rows = subscribers.map(sub => [
    sub.nombre,
    sub.metodo_contacto,
    sub.contacto,
    sub.categorias.join('; '),
    sub.zona,
    sub.frecuencia,
    new Date(sub.created_at).toLocaleDateString('es-UY'),
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function copyEmailsToClipboard(subscribers: Subscriber[]): Promise<boolean> {
  const emailSubscribers = subscribers.filter(s => s.metodo_contacto === 'email');

  if (emailSubscribers.length === 0) return false;

  const emails = emailSubscribers.map(s => s.contacto).join(', ');

  try {
    await navigator.clipboard.writeText(emails);
    return true;
  } catch {
    return false;
  }
}

export async function copyWhatsAppsToClipboard(subscribers: Subscriber[]): Promise<boolean> {
  const whatsappSubscribers = subscribers.filter(s => s.metodo_contacto === 'whatsapp');

  if (whatsappSubscribers.length === 0) return false;

  const numbers = whatsappSubscribers.map(s => s.contacto).join('\n');

  try {
    await navigator.clipboard.writeText(numbers);
    return true;
  } catch {
    return false;
  }
}
