import { Check, X } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface PasswordStrengthIndicatorProps {
  password: string;
}

function getPasswordStrength(password: string): number {
  let strength = 0;
  if (password.length >= 8) strength += 25;
  if (/[a-z]/.test(password)) strength += 25;
  if (/[A-Z]/.test(password)) strength += 25;
  if (/[0-9]/.test(password)) strength += 25;
  return strength;
}

export function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  if (!password) return null;

  const strength = getPasswordStrength(password);
  const strengthColor = strength <= 25 ? 'bg-red-500' :
                        strength <= 50 ? 'bg-orange-500' :
                        strength <= 75 ? 'bg-yellow-500' : 'bg-green-500';
  const strengthText = strength <= 25 ? 'Débil' :
                       strength <= 50 ? 'Regular' :
                       strength <= 75 ? 'Buena' : 'Fuerte';

  const requirements = [
    { text: 'Mínimo 8 caracteres', met: password.length >= 8 },
    { text: 'Una letra mayúscula', met: /[A-Z]/.test(password) },
    { text: 'Un número', met: /[0-9]/.test(password) },
  ];

  return (
    <div className="space-y-2 mt-2">
      <div className="flex items-center gap-2">
        <Progress value={strength} className={`h-2 ${strengthColor}`} />
        <span className="text-xs text-muted-foreground">{strengthText}</span>
      </div>
      <ul className="text-xs space-y-1">
        {requirements.map((req, i) => (
          <li key={i} className="flex items-center gap-1">
            {req.met ? (
              <Check className="h-3 w-3 text-green-500" />
            ) : (
              <X className="h-3 w-3 text-muted-foreground" />
            )}
            <span className={req.met ? 'text-green-600' : 'text-muted-foreground'}>
              {req.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
