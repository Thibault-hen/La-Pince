import { categoryService, type CategoryResponse } from '@/services/category';
import { useQuery } from '@tanstack/react-query';

export function useCategory(): {
  categories: CategoryResponse[];
  isLoading: boolean;
} {
  console.log('Fetching categories...');
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryService.getAll(),
  });
  return {
    categories: categories || [],
    isLoading,
  };
}
