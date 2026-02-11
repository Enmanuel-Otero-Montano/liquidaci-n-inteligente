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
  seller_type: string | null;
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
  seller_type: string;
  password: string;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterInput) => Promise<{ needsEmailConfirmation: boolean }>;
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
    // onAuthStateChange must not await Supabase calls directly
    // to avoid deadlocks with the auth client.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        // Defer DB call to avoid deadlock with Supabase auth internals
        fetchSellerProfile(session.user.id).then(seller => {
          setState({
            user: session.user,
            seller,
            isAuthenticated: true,
            isLoading: false,
          });
        });
      } else {
        setState({
          user: null,
          seller: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchSellerProfile(session.user.id).then(seller => {
          setState({
            user: session.user,
            seller,
            isAuthenticated: true,
            isLoading: false,
          });
        });
      } else {
        setState(prev => ({ ...prev, isLoading: false }));
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);

    const seller = await fetchSellerProfile(data.user.id);
    setState({
      user: data.user,
      seller,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const register = async (data: RegisterInput): Promise<{ needsEmailConfirmation: boolean }> => {
    const { data: signUpData, error } = await supabase.auth.signUp({
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
          seller_type: data.seller_type,
        },
      },
    });
    if (error) throw new Error(error.message);

    // Detect existing user: Supabase returns identities=[] for duplicate emails
    if (
      signUpData.user &&
      (!signUpData.user.identities || signUpData.user.identities.length === 0)
    ) {
      throw new Error('Ya existe una cuenta con este email. Intentá iniciar sesión.');
    }

    // If there's no session, email confirmation is required
    if (!signUpData.session) {
      return { needsEmailConfirmation: true };
    }

    // Session exists: update seller profile and set state
    const user = signUpData.session.user;
    await supabase
      .from('sellers')
      .update({
        nombre_comercial: data.nombre_comercial,
        responsable: data.responsable,
        telefono: data.telefono,
        zona: data.zona,
        direccion: data.direccion || null,
        seller_type: data.seller_type,
        status: 'pending',
      })
      .eq('user_id', user.id);

    const seller = await fetchSellerProfile(user.id);
    setState({
      user,
      seller,
      isAuthenticated: true,
      isLoading: false,
    });

    return { needsEmailConfirmation: false };
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
