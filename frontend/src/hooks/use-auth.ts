import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/auth';
import { authLoadingAtom, csrfTokenAtom, userAtom } from '@/stores/authStore';

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const setUser = useSetAtom(userAtom);
  const setCsrfToken = useSetAtom(csrfTokenAtom);
  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      setUser(data.user);
      setCsrfToken(data.token);
      queryClient.setQueryData(['authUser'], data);
      navigate('/tableau-de-bord');
    },
  });
};

export const useRegister = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      navigate('/connexion', {
        state: {
          messages: {
            successMessage: 'Compte créé avec succès',
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
  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      setUser(null);
      setCsrfToken(null);
      queryClient.clear();
      navigate('/', { replace: true });
    },
  });
};

export const useAuthUser = () => {
  const setUser = useSetAtom(userAtom);
  const setCsrfToken = useSetAtom(csrfTokenAtom);
  const setAuthLoading = useSetAtom(authLoadingAtom);

  const {
    data: authUser,
    error,
    isLoading,
    ...others
  } = useQuery({
    queryKey: ['authUser'],
    queryFn: authService.me,
    retry: false,
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setAuthLoading(isLoading);
  }, [isLoading, setAuthLoading]);

  useEffect(() => {
    if (authUser) {
      setUser(authUser.user);
      setCsrfToken(authUser.token);
    }
  }, [authUser, setUser, setCsrfToken]);

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
