import { categoryService } from '@/services/category';
import type { Category } from '@/types/category';
import { useQuery } from '@tanstack/react-query';

export const useCategories = () => {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: categoryService.getAll,
  });
};
