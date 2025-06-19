import { accountService } from '@/services/account';
import type { UserAccount } from '@/types/account';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const getErrorMessage = (error: any): string | null => {
    if (!error) return null;

    if (error.response?.status === 409) {
      return t('budget.toast.emailAlreadyUsed');
    }
    if (error.response?.status === 429) {
      return t('toast.tooManyAttempts');
    }
    return t('account.toast.updateProfileError');
  };

  return useMutation({
    mutationFn: (data: UserAccount) => accountService.updateUserProfile(data),
    onSuccess: () => {
      toast.success(t('account.toast.updated'));
      queryClient.invalidateQueries({ queryKey: ['account'] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};

export const useUpdatePassword = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const getErrorMessage = (error: any): string | null => {
    if (!error) return null;

    if (error.response?.status === 403 || error.response?.status === 400) {
      return t('account.toast.wrongPassword');
    }
    if (error.response?.status === 429) {
      return t('toast.tooManyAttempts');
    }
    return t('account.toast.updatePasswordError');
  };

  return useMutation({
    mutationFn: (data: { currentPassword: string; newPassword: string }) =>
      accountService.updateUserPassword(data),
    onSuccess: () => {
      toast.success(t('account.toast.passwordUpdated'));
      queryClient.invalidateQueries({ queryKey: ['account'] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};
