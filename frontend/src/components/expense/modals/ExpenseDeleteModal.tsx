
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
import { useDeleteExpense, type Expense } from '@/hooks/expenses';

interface DeleteBudgetProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  expense?: Expense;
}

export const ExpenseDeleteModal = ({ open, setOpen, expense }: DeleteBudgetProps) => {
  const { mutateAsync: deleteExpense } = useDeleteExpense();

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
          <AlertDialogTitle className="font-medium text-xl">Supprimer une dépense</AlertDialogTitle>
          <AlertDialogDescription>
            Tu veux vraiment supprimer ta dépense {expense?.title} de {expense?.amount} € ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteExpense}>Supprimer</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
