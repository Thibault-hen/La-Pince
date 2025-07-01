import { Bell, BellRing } from 'lucide-react';
import { Button } from '../ui/button';
import { Sheet, SheetTrigger, SheetContent, SheetHeader } from '../ui/sheet';
import Notification from './Notification';
import { useNotifications } from '@/hooks/use-notification';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { Badge } from '../ui/badge';
import { showInfoToast } from '@/utils/toasts';

export default function NotificationButton() {
  const { notifications } = useNotifications();

  const notificationCount = notifications.filter((n) => !n.isRead).length;
  console.log('Notification count:', notificationCount);
  console.log('Notifications:', notifications);
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  useEffect(() => {
    const ws = new WebSocket(`${import.meta.env.VITE_WS_URL}`);
    ws.onmessage = () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      showInfoToast(t('notification.newNotification'));
    };
    return () => ws.close();
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative shadow-none dark:bg-primary cursor-pointer hover:bg-primary-color dark:hover:bg-primary-color border"
        >
          {notificationCount > 0 && (
            <Badge className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-secondary-color font-bold text-xs text-white">
              {notificationCount}
            </Badge>
          )}
          <Bell className="size-4 opacity-50"></Bell>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-color/10 border border-primary-color/20 rounded-lg">
              <Bell className="h-5 w-5 text-primary-color" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
              <p className="text-sm text-muted-foreground">{t('notification.header.subtitle')}</p>
            </div>
          </div>
        </SheetHeader>
        <div className="flex flex-col  gap-2 overflow-auto mb-2 shadow-inner shadow-20  px-2 rounded-md ">
          {notifications.length === 0 ? (
            <div className="mt-3 text-center text-muted-foreground">
              {t('notification.noNotification')}
            </div>
          ) : (
            notifications.map((notification) => {
              return <Notification key={notification.id} notification={notification} />;
            })
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
