import { CircleAlert, Trash2, TriangleAlert } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCurrency } from '@/hooks/use-currency';
import {
	type TransformedNotification,
	useDeleteNotification,
} from '@/hooks/use-notification';
import { getCategoryIcon } from '@/utils/categoryIcon';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

type NotificationProps = { notification: TransformedNotification };

export default function Notification({ notification }: NotificationProps) {
	const { t } = useTranslation();
	const { deleteNotification } = useDeleteNotification();
	const { formatAmount } = useCurrency();
	const IconComponent = getCategoryIcon(notification.budgetName);
	return (
		<div className="relative group border-b p-2 last-of-type:last:border-0">
			<div className="flex flex-col gap-1 px-5 py-2 rounded-xl transition-all duration-300 ease-out">
				<div className="absolute top-0 left-0 w-full h-1.5 rounded-t-full opacity-60" />

				<div className="flex items-center gap-3">
					<div className="flex-shrink-0 relative">
						{notification.notificationType === 'budgetWarning' ? (
							<div className="relative">
								<CircleAlert
									size={24}
									className="text-amber-600 dark:text-amber-400 z-10"
								/>
								<div className="absolute dark:-inset-0 bg-amber-500/20 rounded-full blur-md z-0" />
							</div>
						) : (
							<div className="relative">
								<TriangleAlert
									size={24}
									className="text-red-600 dark:text-red-400 z-10"
								/>
								<div className="absolute dark:-inset-0.5 bg-red-500/20 rounded-full blur-md z-0" />
							</div>
						)}
					</div>

					<div className="flex-1 min-w-0">
						<h3 className="font-semibold text-xs leading-tight">
							{t(`notification.${notification.notificationType}.title`)}
						</h3>
					</div>

					<Button
						variant="outline"
						size="icon"
						className="max-w-[35px] max-h-[25px]"
						onClick={() => deleteNotification(notification.id)}
					>
						<Trash2 />
					</Button>
				</div>

				{/* Content section */}
				<div className="space-y-2 text-xs">
					<div className="text-sm leading-relaxed">
						<div className="space-y-2 flex flex-col">
							<div className="leading-relaxed flex items-center text-xs">
								<span>{t('notification.yourBudget')}</span>
								<Badge
									className="inline-flex tracking-wide items-center capitalize gap-1.5 rounded-xl shadow-sm font-bold text-[0.625rem] border mx-1 py-1"
									style={{
										backgroundColor: `${notification.color.value}15`,
										color: notification.color.value,
										borderColor: `${notification.color.value}`,
									}}
								>
									<div
										className="w-4 h-4 rounded-full flex items-center justify-center"
										style={{ backgroundColor: notification.color.value }}
									>
										<IconComponent className="w-3 h-3 text-white" />
									</div>
									{t(notification.budgetName)}
								</Badge>
								<span>
									{notification.notificationType === 'budgetWarning'
										? t('notification.budgetWarning.description')
										: t('notification.budgetExceeded.description')}
								</span>
							</div>
							<div className="text-xs gap-1 flex">
								<span className="text-muted-foreground">
									{t('notification.budgetWarning.remaining1')}
								</span>
								<span
									className={`font-medium ${
										notification.notificationType === 'budgetWarning'
											? 'dark:text-amber-300 text-amber-600'
											: 'text-red-500'
									}`}
								>
									{notification.notificationType === 'budgetWarning'
										? formatAmount(notification?.budgetAmount ?? 0)
										: formatAmount(0)}
								</span>
								<span className="text-muted-foreground">
									{t('notification.budgetWarning.remaining2')}
								</span>
							</div>
						</div>
					</div>

					<div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
						<div className="w-1 h-1 bg-gray-400 rounded-full" />
						<time className="font-medium">
							{(() => {
								const now = new Date();
								const notificationDate = new Date(notification.createdAt);
								const diffInSeconds = Math.floor(
									(now.getTime() - notificationDate.getTime()) / 1000,
								);

								if (diffInSeconds < 60) {
									return t(
										`notification.time.seconds_${diffInSeconds === 1 ? 'singular' : 'plural'}`,
										{
											count: diffInSeconds,
										},
									);
								} else if (diffInSeconds < 3600) {
									const minutes = Math.floor(diffInSeconds / 60);
									return t(
										`notification.time.minutes_${minutes === 1 ? 'singular' : 'plural'}`,
										{
											count: minutes,
										},
									);
								} else if (diffInSeconds < 86400) {
									const hours = Math.floor(diffInSeconds / 3600);
									return t(
										`notification.time.hours_${hours === 1 ? 'singular' : 'plural'}`,
										{
											count: hours,
										},
									);
								} else {
									const days = Math.floor(diffInSeconds / 86400);
									return t(
										`notification.time.days_${days === 1 ? 'singular' : 'plural'}`,
										{
											count: days,
										},
									);
								}
							})()}
						</time>
					</div>
				</div>
			</div>
		</div>
	);
}
