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
  token: string;
};

export const authService = {
  async login(data: LoginUser): Promise<User> {
    const response = await api.post<User>('/auth/login', data);
    api.defaults.headers.common['csrf_token'] = response.data.token;
    return response.data;
  },

  async register(data: RegisterUser): Promise<User> {
    const response = await api.post<User>('/auth/register', data);
    return response.data;
  },

  async logout(): Promise<GenericMessageResponse> {
    const response = await api.get<GenericMessageResponse>('/auth/logout');
    return response.data;
  },

  async me(): Promise<User> {
    const response = await api.get<User>('/account/me');
    api.defaults.headers.common['csrf_token'] = response.data.token;
    return response.data;
  },
};
