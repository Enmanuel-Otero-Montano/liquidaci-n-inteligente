import { Seller, UpdateProfileInput } from '@/types/seller';
import { Admin } from '@/types/admin';
import { mockSellers } from './sellers';

// Mock admin credentials
const MOCK_ADMIN = {
  id: 'admin-1',
  email: 'admin@liquidaciones.uy',
  password: 'Admin123!',
  name: 'Administrador',
  role: 'admin' as const,
};

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

export const mockUpdateProfile = async (
  sellerId: string,
  data: UpdateProfileInput
): Promise<Seller> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Try to find in mock sellers first
  const mockSellerIndex = mockSellers.findIndex(s => s.id === sellerId);
  if (mockSellerIndex !== -1) {
    // For mock sellers, we can't really update them, but we simulate success
    const updatedSeller: Seller = {
      ...mockSellers[mockSellerIndex],
      ...data,
    };
    return updatedSeller;
  }
  
  // Try to find in registered sellers
  const storedSellers = JSON.parse(localStorage.getItem(REGISTERED_SELLERS_KEY) || '[]');
  const registeredIndex = storedSellers.findIndex(
    (s: Seller) => s.id === sellerId
  );
  
  if (registeredIndex === -1) {
    throw new Error('Vendedor no encontrado');
  }
  
  // Update the seller
  storedSellers[registeredIndex] = {
    ...storedSellers[registeredIndex],
    ...data,
  };
  localStorage.setItem(REGISTERED_SELLERS_KEY, JSON.stringify(storedSellers));
  
  const { password, ...sellerWithoutPassword } = storedSellers[registeredIndex];
  return sellerWithoutPassword;
};

export const mockChangePassword = async (
  sellerId: string,
  currentPassword: string,
  newPassword: string
): Promise<{ success: boolean }> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Check if it's a mock seller
  const mockSeller = mockSellers.find(s => s.id === sellerId);
  if (mockSeller) {
    if (currentPassword !== '123456') {
      throw new Error('La contraseña actual es incorrecta');
    }
    // Mock sellers can't really change password, but we simulate success
    return { success: true };
  }
  
  // Check registered sellers
  const storedSellers = JSON.parse(localStorage.getItem(REGISTERED_SELLERS_KEY) || '[]');
  const registeredIndex = storedSellers.findIndex(
    (s: Seller) => s.id === sellerId
  );
  
  if (registeredIndex === -1) {
    throw new Error('Vendedor no encontrado');
  }
  
  if (storedSellers[registeredIndex].password !== currentPassword) {
    throw new Error('La contraseña actual es incorrecta');
  }
  
  // Update password
  storedSellers[registeredIndex].password = newPassword;
  storedSellers[registeredIndex].password_changed_at = new Date().toISOString();
  localStorage.setItem(REGISTERED_SELLERS_KEY, JSON.stringify(storedSellers));
  
  return { success: true };
};

// Admin login
export const mockAdminLogin = async (email: string, password: string): Promise<Admin> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (email === MOCK_ADMIN.email && password === MOCK_ADMIN.password) {
    return {
      id: MOCK_ADMIN.id,
      email: MOCK_ADMIN.email,
      name: MOCK_ADMIN.name,
      role: MOCK_ADMIN.role,
    };
  }
  
  throw new Error('Credenciales inválidas');
};
