import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Admin } from '@/types/admin';
import { mockAdminLogin } from '@/mocks/auth';

const ADMIN_STORAGE_KEY = 'admin_session';

interface AdminAuthContextType {
  admin: Admin | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const stored = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setAdmin(parsed.admin);
      } catch {
        localStorage.removeItem(ADMIN_STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const result = await mockAdminLogin(email, password);
    setAdmin(result);
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify({ 
      admin: result, 
      token: `admin-token-${Date.now()}` 
    }));
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem(ADMIN_STORAGE_KEY);
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
