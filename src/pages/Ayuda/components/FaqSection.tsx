import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { FaqItem } from '../data/faqData';

interface FaqSectionProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  items: FaqItem[];
  searchQuery?: string;
}

function highlightText(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;
  
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  
  return parts.map((part, i) => 
    regex.test(part) ? (
      <mark key={i} className="bg-primary/20 text-foreground rounded px-0.5">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

export function FaqSection({ title, description, icon, items, searchQuery = '' }: FaqSectionProps) {
  if (items.length === 0) return null;

  return (
    <section className="mb-8">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          {icon}
          {title}
        </h2>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        {items.map((item) => (
          <AccordionItem key={item.id} value={item.id} className="border-border">
            <AccordionTrigger className="text-left hover:no-underline hover:text-primary">
              <span className="pr-4">
                {highlightText(item.question, searchQuery)}
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {highlightText(item.answer, searchQuery)}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
