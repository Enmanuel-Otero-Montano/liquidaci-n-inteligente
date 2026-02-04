/**
 * Configuración para upload de imágenes de perfil
 */
export const PROFILE_IMAGE_CONFIG = {
  maxSizeBytes: 2 * 1024 * 1024, // 2MB
  maxSizeMB: 2,
  acceptedTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'],
  acceptedExtensions: '.png,.jpg,.jpeg,.webp',
  recommendedSize: '200x200px',
};

/**
 * Valida si un archivo es una imagen válida para perfil
 */
export function validateProfileImage(file: File): { 
  valid: boolean; 
  error?: string 
} {
  if (!PROFILE_IMAGE_CONFIG.acceptedTypes.includes(file.type)) {
    return { 
      valid: false, 
      error: 'Formato no soportado. Usá PNG, JPG o WEBP.' 
    };
  }
  
  if (file.size > PROFILE_IMAGE_CONFIG.maxSizeBytes) {
    return { 
      valid: false, 
      error: `La imagen no puede superar ${PROFILE_IMAGE_CONFIG.maxSizeMB}MB` 
    };
  }
  
  return { valid: true };
}

/**
 * Convierte un archivo a base64
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Error al leer el archivo'));
    reader.readAsDataURL(file);
  });
}

/**
 * Obtiene las iniciales de un nombre (máximo 2 caracteres)
 */
export function getInitials(name: string): string {
  if (!name) return '??';
  return name
    .split(' ')
    .filter(word => word.length > 0)
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Comprime una imagen si es necesario (para fase posterior con canvas)
 * Por ahora solo retorna el base64 original
 */
export async function processProfileImage(file: File): Promise<string> {
  const validation = validateProfileImage(file);
  if (!validation.valid) {
    throw new Error(validation.error);
  }
  
  return fileToBase64(file);
}
