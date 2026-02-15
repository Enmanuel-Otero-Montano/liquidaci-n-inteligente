import { VerificationBadgeInfo, VerificationStatus } from '@/types/verification';

export const VERIFICATION_CONFIG = {
  MIN_REFERENCE_LENGTH: 20,

  VERIFICATION_METHODS: {
    MANUAL_URL: {
      value: 'manual_url_check' as const,
      label: 'Verificacion manual de URL',
      description: 'Se verifico el precio visitando el enlace provisto',
    },
    MANUAL_SCREENSHOT: {
      value: 'manual_screenshot' as const,
      label: 'Verificacion con captura de pantalla',
      description: 'Se verifico el precio mediante evidencia visual',
    },
    ADMIN_OVERRIDE: {
      value: 'admin_override' as const,
      label: 'Verificacion por conocimiento del admin',
      description: 'El admin verifico el precio sin evidencia digital',
    },
  },
} as const;

export function getVerificationBadgeInfo(
  status: VerificationStatus,
  hasEvidence: boolean
): VerificationBadgeInfo {
  switch (status) {
    case 'verified':
      return {
        status: 'verified',
        variant: 'success',
        icon: 'shield-check',
        label: 'Oferta verificada',
        description:
          'Verificamos que el descuento es real comparando con el precio anterior proporcionado.',
        showTooltip: true,
      };

    case 'verifiable':
      return {
        status: 'verifiable',
        variant: 'warning',
        icon: 'file-check',
        label: hasEvidence
          ? 'Oferta con evidencia - En revisión'
          : 'Oferta declarada',
        description: hasEvidence
          ? 'El vendedor proporcionó evidencia del precio anterior. Nuestro equipo lo está verificando.'
          : 'Oferta declarada por el vendedor sin evidencia adjunta.',
        showTooltip: true,
      };

    case 'unverified':
    default:
      return {
        status: 'unverified',
        variant: 'secondary',
        icon: 'alert-circle',
        label: 'Oferta declarada por el vendedor',
        description:
          'El vendedor declaró este descuento pero no proporcionó evidencia del precio anterior.',
        showTooltip: true,
      };
  }
}

export function calculateVerificationStatus(
  evidenceUrl?: string | null,
  priceReference?: string | null
): VerificationStatus {
  const hasEvidenceUrl = !!evidenceUrl && evidenceUrl.trim().length > 0;
  const hasValidReference =
    !!priceReference &&
    priceReference.trim().length >= VERIFICATION_CONFIG.MIN_REFERENCE_LENGTH;

  return hasEvidenceUrl || hasValidReference ? 'verifiable' : 'unverified';
}
