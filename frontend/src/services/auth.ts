import type { LoginUser, RegisterUser } from '@/schemas/auth.schemas';
import type { GenericMessageResponse } from '@/schemas/global.schema';
import { api } from '@/utils/api';

export type User = {
  user: {
    id: string;
    email: string;
    name: string;
    alert: boolean;
    currency: string;
    createdAt: string;
    updatedAt: string;
  };
};

export const authService = {
  async login(data: LoginUser): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 3000));
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

  async me(): Promise<User> {
    const response = await api.get('/account/me');
    return response.data;
  },
};
