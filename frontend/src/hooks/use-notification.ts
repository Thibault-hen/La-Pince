import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { notificationService } from '@/services/notification';
import type { Color } from '@/types/color';
import { useCurrency } from './use-currency';

export type TransformedNotification = {
	id: string;
	notificationType: 'budgetWarning' | 'budgetExceeded';
	createdAt: string;
	budgetName: string;
	budgetAmount: number;
	isRead: boolean;
	color: Color;
};

export function useNotifications() {
	const { convertFromEUR } = useCurrency();
	const { data = [], ...others } = useQuery({
		queryKey: ['notifications'],
		queryFn: async () => {
			return notificationService.getAll();
		},
		select: (data) =>
			data.map((notification): TransformedNotification => {
				return {
					id: notification.id,
					notificationType: notification.notificationType,
					createdAt: notification.createdAt,
					budgetName: notification.budgetName,
					budgetAmount: convertFromEUR(
						notification.maximumAmount - notification.totalAmount,
					),
					isRead: notification.isRead,
					color: notification.color,
				};
			}),
	});
	return {
		notifications: data,
		others,
	};
}

export function useDeleteNotification() {
	const queryClient = useQueryClient();
	const { mutate: deleteNotification } = useMutation({
		mutationKey: ['notifications'],
		mutationFn: async (id: string) => {
			return notificationService.delete(id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['notifications'] });
		},
	});
	return {
		deleteNotification,
	};
}
