import { api } from "@/utils/api";

type GetNotificationResponse = {
  notificationType: "budgetWarning" | "budgetExceeded";
  id: string;
  createdAt: string;
  budgetName: string;
  maximumAmount: number;
  totalAmount: number;
}[]

export const notificationService = {
  async getAll(): Promise<GetNotificationResponse> {
    const { data } = await api.get<GetNotificationResponse>('/notification');
    return data;
  },
  async delete(id: string): Promise<void> {
    await api.delete(`/notification/${id}`);
  }
}

