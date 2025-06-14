import { api } from '@/utils/api';

export type Category = {
  id: string;
  colorId: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  color: {
    name: string;
    value: string;
  };
  userId: string;
};

export const categoryService = {
  async getAll(): Promise<Category[]> {
    const response = await api.get('/category');
    console.log(response.data);
    return response.data;
  },
};
