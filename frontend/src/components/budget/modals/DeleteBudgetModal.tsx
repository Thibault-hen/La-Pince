import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface EditBudgetProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  budget?: {
    id: string;
    title: string;
    amount: number;
    value: string;
    totalExpense: number;
  };
}

export const DeleteBudgetModal = (props: EditBudgetProps) => {
  return (
    <AlertDialog open={props.open} onOpenChange={props.setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Supprime ton budget</AlertDialogTitle>
          <AlertDialogDescription>
            Tu veux vraiment supprimer ton budget {props.budget?.title} de {props.budget?.amount} €
            ?
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
