import type { Color } from '@/types/color';
import { api } from '@/utils/api';

export type GetNotificationResponse = {
  notificationType: 'budgetWarning' | 'budgetExceeded';
  id: string;
  createdAt: string;
  budgetName: string;
  maximumAmount: number;
  totalAmount: number;
  isRead: boolean;
  color: Color;
  budgetAmount: number;
};

export const notificationService = {
  async getAll(): Promise<GetNotificationResponse[]> {
    const { data } = await api.get<GetNotificationResponse[]>('/notification');
    return data;
  },
  async delete(id: string): Promise<void> {
    await api.delete(`/notification/${id}`);
  },
};
