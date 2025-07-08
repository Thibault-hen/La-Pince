import { useTranslation } from 'react-i18next';
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
import { useDeleteAccount } from '@/hooks/use-account';

interface DeleteAccountProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const DeleteAccountModal = ({ open, setOpen }: DeleteAccountProps) => {
  const { mutateAsync: deleteAccount } = useDeleteAccount();
  const { t } = useTranslation();

  const handleDeleteAccount = async () => {
    await deleteAccount();
    setOpen(false);
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-medium text-xl">
            {' '}
            {t('account.delete.modal.title')}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {' '}
            {t('account.delete.modal.description')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            {t('account.delete.modal.cancel')}
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteAccount}>
            {t('account.delete.modal.confirm')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
