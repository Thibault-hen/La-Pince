import { Bell, BellRing } from 'lucide-react';
import { Button } from '../ui/button';
import { Sheet, SheetTrigger, SheetContent, SheetHeader } from '../ui/sheet';
import Notification from './Notification';
import { useNotifications } from '@/hooks/use-notification';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

export default function NotificationButton() {
  const { notifications } = useNotifications();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  useEffect(() => {
    const ws = new WebSocket(`${import.meta.env.VITE_WS_URL}`);
    ws.onmessage = () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      toast.info('New notification received', { position: 'top-center' });
    };
    return () => ws.close();
  }, []);

  return (
    <Sheet>
      <SheetTrigger>
        <Button
          variant="outline"
          size="icon"
          className="shadow-none dark:bg-primary cursor-pointer hover:bg-primary-color dark:hover:bg-primary-color border"
        >
          {notifications.length > 0 ? (
            <BellRing className="size-4 text-secondary-color" />
          ) : (
            <Bell className="size-4 opacity-50" />
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <div className="flex align-center gap-2  items-center justify-start">
            <Bell className="h-5 w-5 text-primary-color" />
            <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
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
