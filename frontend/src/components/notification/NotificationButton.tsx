import { useQueryClient } from '@tanstack/react-query';
import { Bell } from 'lucide-react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNotifications } from '@/hooks/use-notification';
import { showInfoToast } from '@/utils/toasts';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
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
    return () => {
      if (
        ws.readyState === WebSocket.OPEN ||
        ws.readyState === WebSocket.CONNECTING
      ) {
        ws.close();
      }
    };
  }, [queryClient, t]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative shadow-none dark:bg-primary cursor-pointer hover:bg-secondary-color dark:hover:bg-secondary-color border"
        >
          {notificationCount > 0 && (
            <Badge className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-secondary-color font-bold text-xs text-white border border-black/50">
              {notificationCount}
            </Badge>
          )}
          <Bell />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-color/10 border border-primary-color/20 rounded-lg">
                <Bell className="h-5 w-5 text-primary-color" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  Notifications
                </p>
                <SheetDescription className="text-sm text-muted-foreground">
                  {t('notification.header.subtitle')}
                </SheetDescription>
              </div>
            </div>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col  gap-2 overflow-auto mb-2 shadow-inner shadow-20  px-2 rounded-md ">
          {notifications.length === 0 ? (
            <div className="mt-3 text-center text-muted-foreground">
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
      </SheetContent>
    </Sheet>
  );
}
