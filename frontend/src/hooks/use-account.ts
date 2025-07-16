import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSetAtom } from 'jotai';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { useCurrencyContext } from '@/context/currency-context';
import {
  type UpdateCurrency,
  updateCurrencySchema,
} from '@/schemas/account.schema';
import { accountService } from '@/services/account';
import { csrfTokenAtom, userAtom } from '@/stores/authStore';
import type { UserAccount } from '@/types/account';

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const setUser = useSetAtom(userAtom);
  const { setCurrency } = useCurrencyContext();

  const getErrorMessage = (error: unknown): string => {
    if (error instanceof AxiosError) {
      if (error.response?.status === 409) {
        return t('budget.toast.emailAlreadyUsed');
      }
      if (error.response?.status === 429) {
        return t('toast.tooManyAttempts');
      }
    }
    return t('account.toast.updateProfileError');
  };

  return useMutation({
    mutationFn: (data: UserAccount) => accountService.updateUserProfile(data),
    onSuccess: (data) => {
      toast.success(t('account.toast.updated'));
      queryClient.invalidateQueries({ queryKey: ['account'] });
      setCurrency(data.currency);
      setUser(data);
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};

export const useUpdatePassword = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const getErrorMessage = (error: unknown): string => {
    if (error instanceof AxiosError) {
      if (error.response?.status === 403 || error.response?.status === 400) {
        return t('account.toast.wrongPassword');
      }
      if (error.response?.status === 429) {
        return t('toast.tooManyAttempts');
      }
    }
    return t('account.toast.updatePasswordError');
  };

  return useMutation({
    mutationFn: accountService.updateUserPassword,
    onSuccess: (_data) => {
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
  const setUser = useSetAtom(userAtom);
  return useMutation({
    mutationFn: async (currency: UpdateCurrency) => {
      updateCurrencySchema.parse(currency);
      const response = await accountService.updateCurrency(currency);
      return response;
    },
    onSuccess: (data) => {
      toast.success(t('currency.toast.updated', { currency: data.currency }));
      queryClient.invalidateQueries({ queryKey: ['account'] });
      setUser((prev) => (prev ? { ...prev, currency: data.currency } : prev));
    },
    onError: (_error) => {
      toast.error(t('currency.toast.error'));
    },
  });
};

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const setUser = useSetAtom(userAtom);
  const setCsrfToken = useSetAtom(csrfTokenAtom);

  const getErrorMessage = (error: unknown): string => {
    if (error instanceof AxiosError) {
      if (error.response?.status === 400) {
        return t('account.delete.modal.wrongPassword');
      }
      if (error.response?.status === 429) {
        return t('account.delete.modal.tooManyAttempts');
      }
    }
    return t('account.delete.modal.error');
  };

  return useMutation({
    mutationFn: accountService.deleteAccount,
    onSuccess: () => {
      toast.success(t('account.toast.deleted'));
      queryClient.clear();
      setUser(null);
      setCsrfToken(null);
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};
