import { categoryService } from '@/services/category';
import { useQuery } from '@tanstack/react-query';

export const useCategories = () => {
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: categoryService.getAll,
  });

  return { categories };
};
