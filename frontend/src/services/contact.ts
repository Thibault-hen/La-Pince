import type { ContactMail } from '@/types/contact';
import { api } from '@/utils/api';

export const contactService = {
  async sendContactEmail(data: ContactMail) {
    const response = await api.post('/contact', data);
    return response.data;
  },
};
