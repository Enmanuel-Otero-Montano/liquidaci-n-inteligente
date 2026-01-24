import { Link, Navigate } from 'react-router-dom';
import { Tag, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { LoginForm } from './components/LoginForm';
import { LoginBranding } from './components/LoginBranding';

export function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth();

  // Si ya está autenticado, redirigir al dashboard
  if (!isLoading && isAuthenticated) {
    return <Navigate to="/vendedor" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header mínimo */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Tag className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">Liquidaciones</span>
          </Link>
          <Link 
            to="/" 
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="pt-16 min-h-screen flex items-center">
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Form column */}
            <div className="flex justify-center lg:justify-end">
              <LoginForm />
            </div>

            {/* Branding column */}
            <LoginBranding />
          </div>
        </div>
      </main>
    </div>
  );
}
