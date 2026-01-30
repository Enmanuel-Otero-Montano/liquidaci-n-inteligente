import { Inbox } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="rounded-full bg-muted p-4 mb-4">
        <Inbox className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">No hay reservas</h3>
      <p className="text-muted-foreground max-w-sm">
        Cuando los compradores reserven tus productos, las verás acá para poder contactarlos.
      </p>
    </div>
  );
}
