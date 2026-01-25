import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Seller } from '@/types/seller';

interface AuthState {
  user: Seller | null;
  token: string | null;
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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Cargar sesión de localStorage al montar
  useEffect(() => {
    const stored = localStorage.getItem('seller_auth');
    if (stored) {
      try {
        const { user, token } = JSON.parse(stored);
        setState({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch {
        localStorage.removeItem('seller_auth');
        setState(prev => ({ ...prev, isLoading: false }));
      }
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string) => {
    const { mockLogin } = await import('@/mocks/auth');
    const result = await mockLogin(email, password);
    
    const authData = { user: result.user, token: result.token };
    localStorage.setItem('seller_auth', JSON.stringify(authData));
    
    setState({
      user: result.user,
      token: result.token,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const register = async (data: RegisterInput) => {
    const { mockRegister } = await import('@/mocks/auth');
    const result = await mockRegister(data);
    
    const authData = { user: result.user, token: result.token };
    localStorage.setItem('seller_auth', JSON.stringify(authData));
    
    setState({
      user: result.user,
      token: result.token,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const logout = () => {
    localStorage.removeItem('seller_auth');
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
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
