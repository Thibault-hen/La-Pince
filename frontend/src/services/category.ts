import type { Category } from '@/types/category';
import { api } from '@/utils/api';

export const categoryService = {
  async getAll(): Promise<Category[]> {
    const response = await api.get<Category[]>('/category');
    return response.data;
  },
};
