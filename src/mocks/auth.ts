import { Seller } from '@/types/seller';
import { mockSellers } from './sellers';

interface LoginResult {
  success: boolean;
  user: Seller;
  token: string;
}

export const mockLogin = async (email: string, password: string): Promise<LoginResult> => {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Buscar vendedor por email
  const seller = mockSellers.find(s => s.email.toLowerCase() === email.toLowerCase());
  
  // Credenciales de prueba: cualquier seller del mock con password "123456"
  if (seller && password === '123456') {
    return {
      success: true,
      user: seller,
      token: `mock-jwt-${Date.now()}`,
    };
  }
  
  throw new Error('Credenciales incorrectas');
};

export const mockLogout = async (): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 300));
};
