import type { LoginUser, RegisterUser } from '@/schemas/auth.schemas';
import type { GenericMessageResponse } from '@/schemas/global.schema';
import { csrfTokenAtom } from '@/stores/authStore';
import { api } from '@/utils/api';
import { getDefaultStore } from 'jotai';

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

const store = getDefaultStore();

export const authService = {
  async login(data: LoginUser): Promise<User> {
    const response = await api.post<User>('/auth/login', data);
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
    return response.data;
  },

  sendResetEmail: async ({ email }: { email: string }) => {
    const response = await api.post('/auth/send-reset-email', { email });
    return response.data;
  },

  resetPassword: async ({ newPassword, token }: { newPassword: string; token: string }) => {
    const response = await api.post('/auth/reset-password', {
      newPassword,
      token,
    });
    return response.data;
  },
};

api.interceptors.request.use(
  (config) => {
    const csrfToken = store.get(csrfTokenAtom);
    if (csrfToken) {
      config.headers['csrf_token'] = csrfToken;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      store.set(csrfTokenAtom, null);
      const currentPath = window.location.pathname;
      const authPages = ['/tableau-de-bord'];

      if (authPages.some((page) => currentPath.includes(page))) {
        window.location.href = '/connexion';
      }
    }
    return Promise.reject(error);
  }
);
