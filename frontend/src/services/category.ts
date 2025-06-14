import { api } from '@/utils/api';

export type CategoryResponse = {
  id: string;
  title: string;
  color: {
    value: string;
  };
};

export const categoryService = {
  async getAll(): Promise<CategoryResponse[]> {
    const { data } = await api.get('/category');
    console.log({ data });
    return data;
  },
};
