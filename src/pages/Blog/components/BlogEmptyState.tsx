import { BookOpen } from 'lucide-react';

export function BlogEmptyState() {
  return (
    <div className="text-center py-16 px-4">
      <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <h2 className="text-xl font-semibold mb-2">
        Pronto tendremos contenido para vos
      </h2>
      <p className="text-muted-foreground max-w-md mx-auto">
        Estamos preparando artículos con consejos, guías y novedades para
        vendedores y emprendedores en Uruguay. ¡Volvé pronto!
      </p>
    </div>
  );
}
