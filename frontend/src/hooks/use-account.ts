import { accountService } from '@/services/account';
import type { UserAccount } from '@/types/account';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

export const useUpdateUserProfile= () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (data: UserAccount) =>
      accountService.updateUserProfile(data),
    onSuccess: () => {
      toast.success(t('account.toast.updated'));
      queryClient.invalidateQueries({ queryKey: ['account'] });
    },
    onError: (_data) => {
      toast.error(t('account.toast.updateError'));
    },
  });
}