import type { LoginUser, RegisterUser } from '@/schemas/auth.schema';
import type { GenericMessageResponse } from '@/schemas/schema';
import { api } from '@/utils/api';

type User = {
  id: string;
  email: string;
  name: string;
  alert: boolean;
  currency: string;
  createdAt: string;
  updatedAt: string;
};

export const authService = {
  async login(data: LoginUser): Promise<User> {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  async register(data: RegisterUser): Promise<User> {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  async logout(): Promise<GenericMessageResponse> {
    const response = await api.get('/auth/logout');
    return response.data;
  },
};
