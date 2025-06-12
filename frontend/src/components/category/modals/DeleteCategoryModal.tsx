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

interface DeleteCategoryProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  category?: {
    id: string;
    title: string;
    color: string;
    budget: {
      id: string;
      amount: number;
      totalExpenses: number;
    };
  };
}

export const DeleteCategoryModal = (props: DeleteCategoryProps) => {
  return (
    <AlertDialog open={props.open} onOpenChange={props.setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-medium text-xl">
            Supprimer une catégorie
          </AlertDialogTitle>
          <AlertDialogDescription>
            Tu veux vraiment supprimer ta catégorie {props.category?.title} ?
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
