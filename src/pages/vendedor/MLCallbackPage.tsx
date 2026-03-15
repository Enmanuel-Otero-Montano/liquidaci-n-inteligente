import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export function MLCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (!code) {
      navigate('/vendedor/productos/nuevo?ml_error=true', { replace: true });
      return;
    }

    const exchangeCode = async () => {
      try {
        const res = await fetch(`/api/ml-callback?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state || '')}`);
        const data = await res.json();

        if (res.ok && data.success) {
          navigate('/vendedor/productos/nuevo?ml_connected=true', { replace: true });
        } else {
          navigate('/vendedor/productos/nuevo?ml_error=true', { replace: true });
        }
      } catch {
        navigate('/vendedor/productos/nuevo?ml_error=true', { replace: true });
      }
    };

    exchangeCode();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <img
        src="/liquioff-logo.svg"
        alt="LiquiOff"
        className="h-12 mb-6"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />
      <div className="flex items-center gap-3">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <p className="text-muted-foreground text-lg">Conectando con MercadoLibre...</p>
      </div>
    </div>
  );
}
