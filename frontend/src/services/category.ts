import type {
  Category,
  CategoryWithBudget,
  CreateCategory,
  UpdateCategory,
} from '@/types/category';
import { api } from '@/utils/api';

export const categoryService = {
  async getAll(): Promise<CategoryWithBudget[]> {
    const response = await api.get<CategoryWithBudget[]>('/category');
    return response.data;
  },

  async createCategory(data: CreateCategory): Promise<Category> {
    const response = await api.post<Category>('/category', data);
    return response.data;
  },

  async updateCategory(id: string, data: UpdateCategory): Promise<Category> {
    const response = await api.put<Category>(`/category/${id}`, data);
    return response.data;
  },

  async deleteCategory(id: string) {
    const response = await api.delete(`/category/${id}`);
    return response.data;
  },
};
