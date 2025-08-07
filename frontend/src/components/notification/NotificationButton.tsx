import { useQueryClient } from '@tanstack/react-query';
import { Bell } from 'lucide-react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNotifications } from '@/hooks/use-notification';
import { showInfoToast } from '@/utils/toasts';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import Notification from './Notification';

export default function NotificationButton() {
	const { notifications } = useNotifications();

	const notificationCount = notifications.filter((n) => !n.isRead).length;
	const { t } = useTranslation();
	const queryClient = useQueryClient();
	useEffect(() => {
		const ws = new WebSocket(`${import.meta.env.VITE_WS_URL}`);
		ws.onmessage = () => {
			queryClient.invalidateQueries({ queryKey: ['notifications'] });
			showInfoToast(t('notification.newNotification'));
		};

		if (notificationCount > 0) {
			document.title = `(${notificationCount}) La Pince`;
		} else {
			document.title = 'La Pince';
		}

		return () => {
			if (
				ws.readyState === WebSocket.OPEN ||
				ws.readyState === WebSocket.CONNECTING
			) {
				ws.close();
			}
		};
	}, [queryClient, t, notificationCount]);

	return (
		<Popover>
			<PopoverTrigger className="relative" asChild>
				<div>
					<Button
						variant="outline"
						size="icon"
						className="relative shadow-none dark:bg-primary cursor-pointer hover:bg-secondary-color dark:hover:bg-secondary-color border"
					>
						<Bell />
					</Button>
					{notificationCount > 0 && (
						<Badge className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-secondary-color font-bold text-xs text-white border border-black/50">
							{notificationCount}
						</Badge>
					)}
				</div>
			</PopoverTrigger>
			<PopoverContent
				align="end"
				className="p-0 min-w-[380px] max-h-[550px] overflow-auto"
			>
				<div className="flex items-center gap-3 border-b pb-2 mb-2 p-3 justify-between">
					<div className="flex gap-2 items-center">
						<div className="p-2 bg-primary-color/10 border border-primary-color/20 rounded-lg">
							<Bell className="h-5 w-5 text-primary-color" />
						</div>
						<div>
							<h4 className="text-sm md:text-base font-bold text-foreground">
								Notifications
							</h4>
							<span className="text-xs text-muted-foreground">
								{t('notification.header.subtitle')}
							</span>
						</div>
					</div>
					<div>
						{/* <Button
							variant="blue"
							size="sm"
							disabled={notifications.length === 0}
						>
							Tout supprimer
						</Button> */}
					</div>
				</div>
				<div className="flex flex-col gap-2 overflow-auto rounded-md">
					{notifications.length === 0 ? (
						<div className="p-8 text-center text-muted-foreground text-sm ">
							{t('notification.noNotification')}
						</div>
					) : (
						notifications.map((notification) => {
							return (
								<Notification
									key={notification.id}
									notification={notification}
								/>
							);
						})
					)}
				</div>
			</PopoverContent>
		</Popover>
	);
}
