import { notificationService } from "@/services/notification";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useNotifications() {
  const { data = [], isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      return notificationService.getAll();
    },
    select: (data) => data.map((notification) => {
      return {
        id: notification.id,
        type: notification.notificationType,
        date: notification.createdAt,
        budgetName: notification.budgetName,
        budgetAmount: notification.maximumAmount - notification.totalAmount,
      }
    }),
  });
  return {
    notifications: data,
    isLoading,
  };
}

export function useDeleteNotification() {
  const queryClient = useQueryClient();
  const { mutate: deleteNotification } = useMutation({
    mutationKey: ['notifications'],
    mutationFn: async (id: string) => {
      return await notificationService.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  })
  return {
    deleteNotification
  };
}


