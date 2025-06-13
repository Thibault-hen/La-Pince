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
import type { Budget } from '@/services/budget';

interface DeleteBudgetProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  budget?: Budget;
}

export const DeleteBudgetModal = (props: DeleteBudgetProps) => {
  return (
    <AlertDialog open={props.open} onOpenChange={props.setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-medium text-xl">Supprimer un budget</AlertDialogTitle>
          <AlertDialogDescription>
            Tu veux vraiment supprimer ton budget {props.budget?.category.title} de{' '}
            {props.budget?.amount} € ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">Annuler</AlertDialogCancel>
          <AlertDialogAction>Supprimer</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
