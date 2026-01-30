import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { AdminLoginBranding } from './components/AdminLoginBranding';
import { AdminLoginForm } from './components/AdminLoginForm';

export function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
      
      <div className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-md">
          <Card className="bg-slate-900/80 border-slate-700 backdrop-blur-sm shadow-2xl">
            <CardContent className="pt-8 pb-6 px-8">
              <AdminLoginBranding />
              <AdminLoginForm />
            </CardContent>
          </Card>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="inline-flex items-center text-sm text-slate-500 hover:text-slate-300 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Volver al sitio
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-4 text-center text-xs text-slate-600 relative z-10">
        LiquiMarket Admin © {new Date().getFullYear()}
      </div>
    </div>
  );
}
