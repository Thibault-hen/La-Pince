import { categoryService } from '@/services/category';
import type { Category, UpdateCategory } from '@/types/category';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useCategories = () => {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: categoryService.getAll,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: categoryService.createCategory,
    onSuccess: (data) => {
      toast.success(`Ta catégorie ${data.title} a été créé`);
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: (_data) => {
      toast.error('Une erreur est survenue ou cette catégorie existe déjà');
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCategory }) =>
      categoryService.updateCategory(id, data),
    onSuccess: (data) => {
      toast.success(`Ta catégorie ${data.title} a été mise à jour`);
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    },
    onError: (_data) => {
      toast.error(
        'Une erreur est survenue lors de la mise à jour ou une autre catégorie porte le même nom'
      );
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: categoryService.deleteCategory,
    onSuccess: (_data) => {
      toast.success('Ta catégorie a été supprimé');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    },
    onError: (_data) => {
      toast.error(
        "Une erreur est survenue lors de la suppression de ta catégorie ou elle n'existe plus"
      );
    },
  });
};
