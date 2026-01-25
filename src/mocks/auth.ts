import { Seller } from '@/types/seller';
import { mockSellers } from './sellers';

interface LoginResult {
  success: boolean;
  user: Seller;
  token: string;
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

interface RegisterResult {
  success: boolean;
  user: Seller;
  token: string;
}

// Storage key for registered sellers
const REGISTERED_SELLERS_KEY = 'registered_sellers';

// Get all sellers including registered ones
const getAllSellers = (): Seller[] => {
  const storedSellers = JSON.parse(localStorage.getItem(REGISTERED_SELLERS_KEY) || '[]');
  return [...mockSellers, ...storedSellers.map((s: { password: string } & Seller) => {
    const { password, ...seller } = s;
    return seller;
  })];
};

// Get password for a seller (for login validation)
const getSellerPassword = (email: string): string | null => {
  // Check mock sellers (all use "123456")
  const mockSeller = mockSellers.find(s => s.email.toLowerCase() === email.toLowerCase());
  if (mockSeller) return '123456';
  
  // Check registered sellers
  const storedSellers = JSON.parse(localStorage.getItem(REGISTERED_SELLERS_KEY) || '[]');
  const registeredSeller = storedSellers.find(
    (s: { email: string }) => s.email.toLowerCase() === email.toLowerCase()
  );
  if (registeredSeller) return registeredSeller.password;
  
  return null;
};

export const mockLogin = async (email: string, password: string): Promise<LoginResult> => {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Buscar vendedor por email en todos los sellers
  const allSellers = getAllSellers();
  const seller = allSellers.find(s => s.email.toLowerCase() === email.toLowerCase());
  
  if (!seller) {
    throw new Error('Credenciales incorrectas');
  }
  
  // Verificar password
  const storedPassword = getSellerPassword(email);
  if (storedPassword !== password) {
    throw new Error('Credenciales incorrectas');
  }
  
  return {
    success: true,
    user: seller,
    token: `mock-jwt-${Date.now()}`,
  };
};

export const mockRegister = async (data: RegisterInput): Promise<RegisterResult> => {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Verificar si el email ya existe
  const allSellers = getAllSellers();
  const existingEmail = allSellers.find(
    s => s.email.toLowerCase() === data.email.toLowerCase()
  );
  
  if (existingEmail) {
    throw new Error('Este email ya está registrado');
  }
  
  // Crear nuevo vendedor
  const newSeller: Seller = {
    id: `seller-${Date.now()}`,
    nombre_comercial: data.nombre_comercial,
    responsable: data.responsable,
    email: data.email,
    telefono: data.telefono,
    zona: data.zona,
    direccion: data.direccion,
    status: 'active',
    created_at: new Date().toISOString(),
  };
  
  // Guardar en localStorage para persistencia
  const storedSellers = JSON.parse(localStorage.getItem(REGISTERED_SELLERS_KEY) || '[]');
  storedSellers.push({ ...newSeller, password: data.password });
  localStorage.setItem(REGISTERED_SELLERS_KEY, JSON.stringify(storedSellers));
  
  return {
    success: true,
    user: newSeller,
    token: `mock-jwt-${Date.now()}`,
  };
};

export const mockLogout = async (): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 300));
};
