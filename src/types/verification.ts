export type VerificationStatus = 'unverified' | 'verifiable' | 'verified';

export type VerificationMethod =
  | 'manual_url_check'
  | 'manual_screenshot'
  | 'admin_override';

export interface PriceVerification {
  id: string;
  product_id: string;
  admin_id: string;
  evidence_url?: string;
  price_reference?: string;
  verification_method: VerificationMethod;
  price_before_verified: number;
  price_now_verified: number;
  discount_verified: number;
  verified_at: string;
  notes?: string;
  created_at: string;
}

export interface VerificationBadgeInfo {
  status: VerificationStatus;
  variant: 'success' | 'warning' | 'secondary';
  icon: 'shield-check' | 'file-check' | 'alert-circle';
  label: string;
  description: string;
  showTooltip: boolean;
}
