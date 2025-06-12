import { authService } from '@/services/auth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { data, useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
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
        state: { messages: { successMessage: 'Compte crée avec succès', email: data.user.email } },
      });
    },
  });
};

export const useAuthUser = (redirectOnError = true) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: authUser, ...others } = useQuery({
    queryKey: ['authUser'],
    queryFn: authService.me,
    refetchInterval: 1000 * 60 * 5,
    retry: false,
    staleTime: 1000 * 60 * 2,
  });

  useEffect(() => {
    if (others.isError && redirectOnError) {
      queryClient.removeQueries({ queryKey: ['authUser'] });
      navigate('/connexion', { replace: true });
    }
  }, [others.isError, navigate, queryClient]);

  return {
    authUser,
    ...others,
  };
};
