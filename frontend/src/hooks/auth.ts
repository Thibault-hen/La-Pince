import { authService } from '@/services/auth';
import { useMutation } from '@tanstack/react-query';

export function useLogin() {
  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      console.log('Login successful: ', data);
    },
  });
}
