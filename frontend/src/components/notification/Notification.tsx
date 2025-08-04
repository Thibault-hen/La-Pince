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
		<div className="relative group">
			<div className="flex flex-col gap-3 p-5 dark:bg-primary backdrop-blur-sm border rounded-xl shadow-sm transition-all duration-300 ease-out">
				<div
					className="absolute top-0 left-0 w-full h-1.5 rounded-t-full opacity-60"
					style={{
						background: `linear-gradient(90deg, ${notification.color.value}, transparent 70%)`,
					}}
				/>

				<div className="flex items-center gap-3">
					<div className="flex-shrink-0 relative">
						{notification.notificationType === 'budgetWarning' ? (
							<div className="relative">
								<CircleAlert
									size={24}
									className="text-amber-600 dark:text-amber-400"
								/>
								<div className="absolute dark:-inset-1 bg-amber-500/20 rounded-full blur-sm -z-10" />
							</div>
						) : (
							<div className="relative">
								<TriangleAlert
									size={24}
									className="text-red-600 dark:text-red-400"
								/>
								<div className="absolute dark:-inset-1 bg-red-500/20 rounded-full blur-sm -z-10" />
							</div>
						)}
					</div>

					<div className="flex-1 min-w-0">
						<h3 className="font-semibold text-gray-900 dark:text-gray-100 text-xs md:text-sm leading-tight">
							{t(`notification.${notification.notificationType}.title`)}
						</h3>
					</div>

					<div className="flex-shrink-0">
						<Button
							variant="outline"
							size="sm"
							className="rounded-lg opacity-0 group-hover:opacity-100"
							onClick={() => deleteNotification(notification.id)}
						>
							<Trash2 size={28} />
						</Button>
					</div>
				</div>

				{/* Content section */}
				<div className="space-y-3">
					<div className="text-sm leading-relaxed">
						<div className="text-sm leading-relaxed space-y-3">
							<div className="space-y-3 flex flex-col">
								<div className="md:text-sm leading-relaxed text-xs">
									<span>{t('notification.yourBudget')}</span>
									<Badge
										className="inline-flex tracking-wide items-center capitalize gap-1.5 rounded-xl shadow-sm font-bold md:text-xs text-[0.625rem] border mx-1 py-1"
										style={{
											backgroundColor: `${notification.color.value}15`,
											color: notification.color.value,
											borderColor: `${notification.color.value}`,
										}}
									>
										<div
											className="w-4.5 h-4.5 rounded-full flex items-center justify-center"
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
								<div className="text-xs md:text-sm gap-1 flex">
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
					</div>

					<div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
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
