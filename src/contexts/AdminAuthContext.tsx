import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';

interface AdminAuthContextType {
  admin: { id: string; email: string; name: string; role: 'admin' } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminAuthContextType['admin']>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAdminRole = async (user: User) => {
    const { data } = await supabase.rpc('has_role', {
      _user_id: user.id,
      _role: 'admin',
    });
    if (data) {
      setAdmin({
        id: user.id,
        email: user.email || '',
        name: user.user_metadata?.name || 'Administrador',
        role: 'admin',
      });
    } else {
      setAdmin(null);
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        await checkAdminRole(session.user);
      } else {
        setAdmin(null);
      }
      setIsLoading(false);
    });

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        await checkAdminRole(session.user);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);

    // Verify admin role
    const { data: isAdmin } = await supabase.rpc('has_role', {
      _user_id: data.user.id,
      _role: 'admin',
    });

    if (!isAdmin) {
      await supabase.auth.signOut();
      throw new Error('No tenés permisos de administrador');
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        isAuthenticated: !!admin,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
