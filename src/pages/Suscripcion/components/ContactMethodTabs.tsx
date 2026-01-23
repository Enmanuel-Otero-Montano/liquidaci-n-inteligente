import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, Phone } from 'lucide-react';

interface ContactMethodTabsProps {
  value: 'email' | 'whatsapp';
  onChange: (value: 'email' | 'whatsapp') => void;
}

export function ContactMethodTabs({ value, onChange }: ContactMethodTabsProps) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">¿Cómo te avisamos?</p>
      <Tabs value={value} onValueChange={(v) => onChange(v as 'email' | 'whatsapp')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email
          </TabsTrigger>
          <TabsTrigger value="whatsapp" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            WhatsApp
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
