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
import { useDeleteExpense, type Expense } from '@/hooks/use-expense';
import { useTranslation } from 'react-i18next';

interface DeleteBudgetProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  expense?: Expense;
}

export const ExpenseDeleteModal = ({ open, setOpen, expense }: DeleteBudgetProps) => {
  const { mutateAsync: deleteExpense } = useDeleteExpense();
  const { t } = useTranslation();

  const handleDeleteExpense = async () => {
    if (expense?.id) {
      await deleteExpense(expense.id);
      setOpen(false);
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-medium text-xl">
            {t('expenses.delete.title')}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t('expenses.delete.description', { title: expense?.title, amount: expense?.amount })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            {t('expenses.delete.cancel')}
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteExpense}>
            {t('expenses.delete.confirm')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
