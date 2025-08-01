import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { contactService } from '@/services/contact';
import type { ContactMail } from '@/types/contact';
import { showErrorToast, showSuccessToast } from '@/utils/toasts';

export const useContactEmail = () => {
  const { t } = useTranslation();
  return useMutation({
    mutationFn: async (data: ContactMail) => {
      await contactService.sendContactEmail(data);
    },
    onSuccess: () => {
      showSuccessToast(t('home.contact.success'));
    },
    onError: () => {
      showErrorToast(t('home.contact.error'));
    },
  });
};
