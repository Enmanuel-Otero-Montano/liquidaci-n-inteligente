export interface Admin {
  id: string;
  email: string;
  name: string;
  role: 'admin';
}

export interface AdminLoginInput {
  email: string;
  password: string;
}
