import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useDeleteCategory } from '@/hooks/use-category';
import type { Budget } from '@/types/budget';
import type { Category } from '@/types/category';

interface DeleteBudgetProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  category?: Category & {
    budgets?: Budget[];
  };
}

export const DeleteCategoryModal = ({ open, setOpen, category }: DeleteBudgetProps) => {
  const { mutateAsync: deleteCategory } = useDeleteCategory();

  const handleDeleteBudget = async () => {
    if (!category?.id) return;
    await deleteCategory(category.id);
    setOpen(false);
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-medium text-xl">Supprimer un budget</AlertDialogTitle>
          <AlertDialogDescription>
            Tu veux vraiment supprimer ton budget {category?.title} de{' '}
            {category?.budgets?.reduce((total, budget) => total + budget.amount, 0).toFixed(2)}€ ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteBudget}>Supprimer</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
