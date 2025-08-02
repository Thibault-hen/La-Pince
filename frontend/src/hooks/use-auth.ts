import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/auth';
import { authLoadingAtom, csrfTokenAtom, userAtom } from '@/stores/authStore';
import { currencyAtom } from '@/stores/currencyStore';
import { showSuccessToast } from '@/utils/toasts';

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const setUser = useSetAtom(userAtom);
  const setCsrfToken = useSetAtom(csrfTokenAtom);
  const setCurrency = useSetAtom(currencyAtom);
  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      setUser(data.user);
      setCsrfToken(data.token);
      setCurrency(data.user.currency);
      queryClient.setQueryData(['authUser'], data);
      navigate('/dashboard');
    },
  });
};

export const useRegister = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      navigate('/login', {
        state: {
          messages: {
            successMessage: t('register.successMessage'),
            email: data.user.email,
          },
        },
      });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const setUser = useSetAtom(userAtom);
  const setCsrfToken = useSetAtom(csrfTokenAtom);
  const { t } = useTranslation();
  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      setUser(null);
      setCsrfToken(null);
      queryClient.clear();
      navigate('/', { replace: true });
      showSuccessToast(t('home.logout'));
    },
  });
};

export const useAuthUser = () => {
  const setUser = useSetAtom(userAtom);
  const setCsrfToken = useSetAtom(csrfTokenAtom);
  const setAuthLoading = useSetAtom(authLoadingAtom);
  const setCurrency = useSetAtom(currencyAtom);

  const {
    data: authUser,
    error,
    isLoading,
    ...others
  } = useQuery({
    queryKey: ['authUser'],
    queryFn: authService.me,
    refetchInterval: 1000 * 60 * 5,
  });

  useEffect(() => {
    setAuthLoading(isLoading);
  }, [isLoading, setAuthLoading]);

  useEffect(() => {
    if (authUser?.user) {
      setUser(authUser.user);
      setCsrfToken(authUser.token);
      setCurrency(authUser.user.currency);
    }
  }, [authUser, setUser, setCsrfToken, setCurrency]);

  useEffect(() => {
    if (error) {
      setUser(null);
      setCsrfToken(null);
    }
  }, [error, setUser, setCsrfToken]);

  return {
    authUser,
    error,
    isLoading,
    ...others,
  };
};
