import { toast } from 'sonner';

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    closeButton: true,
  });
};

export const showErrorToast = (message: string) => {
  toast.error(message, {
    closeButton: true,
  });
};
