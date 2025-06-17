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
import { useDeleteCategory } from '@/hooks/categories';
import type { Budget } from '@/types/budget';
import type { Category } from '@/types/category';
import { useTranslation } from 'react-i18next';

interface DeleteBudgetProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  category?: Category & {
    budgets?: Budget[];
  };
}

export const DeleteCategoryModal = ({ open, setOpen, category }: DeleteBudgetProps) => {
  const { mutateAsync: deleteCategory } = useDeleteCategory();
  const { t } = useTranslation();

  const handleDeleteBudget = async () => {
    if (!category?.id) return;
    await deleteCategory(category.id);
    setOpen(false);
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-medium text-xl">
            {t('category.delete.title')}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t('category.delete.description', {
              title: category?.title,
              total: category?.budgets
                ?.reduce((total, budget) => total + budget.amount, 0)
                .toFixed(2),
            })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            {t('category.delete.cancel')}
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteBudget}>
            {t('category.delete.confirm')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
