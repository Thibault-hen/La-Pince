import { accountService } from '@/services/account';
import type { UserAccount } from '@/types/account';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { updateCurrencySchema, type UpdateCurrency } from '@/schemas/account.schema';

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
    mutationFn: accountService.updateUserPassword,
    onSuccess: () => {
      toast.success(t('account.toast.passwordUpdated'));
      queryClient.invalidateQueries({ queryKey: ['account'] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};

export const useUpdateCurrency = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: async (currency: UpdateCurrency) => {
      updateCurrencySchema.parse(currency);
      const response = await accountService.updateCurrency(currency);
      return response;
    },
    onSuccess: (data) => {
      toast.success(t('currency.toast.updated', { currency: data.currency }));
      queryClient.invalidateQueries({ queryKey: ['account'] });
    },
    onError: (_error) => {
      toast.error(t('currency.toast.error'));
    },
  });
};
