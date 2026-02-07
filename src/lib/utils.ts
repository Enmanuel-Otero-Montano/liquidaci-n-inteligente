import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Convert local Uruguayan phone to international format for wa.me links */
export function formatPhoneForWhatsApp(phone: string): string {
  let cleaned = phone.replace(/[\s\-()]/g, '');
  if (cleaned.startsWith('+')) cleaned = cleaned.slice(1);
  if (cleaned.startsWith('0')) cleaned = '598' + cleaned.slice(1);
  if (/^9\d{7}$/.test(cleaned)) cleaned = '598' + cleaned;
  return cleaned;
}
