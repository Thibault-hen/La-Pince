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
import type { Budget } from '@/services/budget';

interface DeleteBudgetProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  budget?: Budget;
}

export const DeleteBudgetModal = ({ open, setOpen, budget }: DeleteBudgetProps) => {
  const { mutateAsync: deleteBudget } = useDeleteBudget();

  const handleDeleteBudget = async () => {
    if (budget?.id) {
      await deleteBudget(budget.id);
      setOpen(false);
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-medium text-xl">Supprimer un budget</AlertDialogTitle>
          <AlertDialogDescription>
            Tu veux vraiment supprimer ton budget {budget?.category.title} de {budget?.amount} € ?
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
