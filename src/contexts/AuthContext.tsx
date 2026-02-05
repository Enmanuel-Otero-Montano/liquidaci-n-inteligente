import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';

interface SellerProfile {
  id: string;
  user_id: string;
  nombre_comercial: string;
  responsable: string | null;
  email: string;
  telefono: string;
  zona: string;
  direccion: string | null;
  politicas: string | null;
  horario_retiro: string | null;
  whatsapp_message: string | null;
  profile_image_url: string | null;
  status: 'active' | 'pending' | 'suspended';
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

interface AuthState {
  user: User | null;
  seller: SellerProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface RegisterInput {
  nombre_comercial: string;
  responsable: string;
  email: string;
  telefono: string;
  zona: string;
  direccion?: string;
  password: string;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterInput) => Promise<void>;
  logout: () => void;
  updateSeller: (data: Partial<SellerProfile>) => void;
  refreshSeller: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

async function fetchSellerProfile(userId: string): Promise<SellerProfile | null> {
  const { data, error } = await supabase
    .from('sellers')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  if (error || !data) return null;
  return data as SellerProfile;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    seller: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        // Use setTimeout to avoid deadlock with Supabase client
        setTimeout(async () => {
          const seller = await fetchSellerProfile(session.user.id);
          setState({
            user: session.user,
            seller,
            isAuthenticated: true,
            isLoading: false,
          });
        }, 0);
      } else {
        setState({
          user: null,
          seller: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    });

    // THEN check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const seller = await fetchSellerProfile(session.user.id);
        setState({
          user: session.user,
          seller,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        setState(prev => ({ ...prev, isLoading: false }));
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
  };

  const register = async (data: RegisterInput) => {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: window.location.origin,
        data: {
          nombre_comercial: data.nombre_comercial,
          responsable: data.responsable,
          telefono: data.telefono,
          zona: data.zona,
          direccion: data.direccion || '',
        },
      },
    });
    if (error) throw new Error(error.message);

    // After signup, update the auto-created seller profile with full data
    const { data: session } = await supabase.auth.getSession();
    if (session?.session?.user) {
      await supabase
        .from('sellers')
        .update({
          nombre_comercial: data.nombre_comercial,
          responsable: data.responsable,
          telefono: data.telefono,
          zona: data.zona,
          direccion: data.direccion || null,
          status: 'active',
        })
        .eq('user_id', session.session.user.id);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const updateSeller = (data: Partial<SellerProfile>) => {
    if (!state.seller) return;
    setState(prev => ({
      ...prev,
      seller: prev.seller ? { ...prev.seller, ...data } : null,
    }));
  };

  const refreshSeller = async () => {
    if (!state.user) return;
    const seller = await fetchSellerProfile(state.user.id);
    setState(prev => ({ ...prev, seller }));
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout, updateSeller, refreshSeller }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
}
