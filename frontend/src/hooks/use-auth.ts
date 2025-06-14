import { authService } from '@/services/auth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

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
        state: { messages: { successMessage: 'Compte créé avec succès', email: data.user.email } },
      });
    },
  });
};

export const useAuthUser = () => {
  const { data: authUser, ...others } = useQuery({
    queryKey: ['authUser'],
    queryFn: authService.me,
    refetchInterval: 1000 * 60 * 5,
    retry: false,
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });

  return {
    authUser,
    ...others,
  };
};
