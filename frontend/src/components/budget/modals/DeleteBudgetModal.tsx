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
import { useDeleteBudget } from '@/hooks/use-budget';
import { useCurrency } from '@/hooks/use-currency';
import type { Budget } from '@/types/budget';
import { useTranslation } from 'react-i18next';

interface DeleteBudgetProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  budget?: Budget;
}

export const DeleteBudgetModal = ({ open, setOpen, budget }: DeleteBudgetProps) => {
  const { mutateAsync: deleteBudget } = useDeleteBudget();
  const { t } = useTranslation();
  const { formatAmount } = useCurrency();

  const handleDeleteBudget = async () => {
    if (!budget?.id) return;
    await deleteBudget(budget.id);
    setOpen(false);
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-medium text-xl">
            {t('budget.delete.title')}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t('budget.delete.description', {
              title: t(budget?.category.title ?? 'category.defaultTitle'),
              amount: formatAmount(Number(budget?.amount)) || 0,
            })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            {t('budget.delete.cancel')}
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteBudget}>
            {t('budget.delete.confirm')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
