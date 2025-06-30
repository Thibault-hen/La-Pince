import { useCurrency } from '@/hooks/use-currency';
import { useDeleteNotification, type TransformedNotification } from '@/hooks/use-notification';
import { CircleAlert, Trash2, TriangleAlert } from 'lucide-react';
import { Trans, useTranslation } from 'react-i18next';
import { Button } from '../ui/button';

type NotificationProps = { notification: TransformedNotification };

export default function Notification({ notification }: NotificationProps) {
  const { t } = useTranslation();
  const { deleteNotification } = useDeleteNotification();
  const { formatAmount } = useCurrency();
  return (
    <>
      <div className="flex-col gap-2 group transition-all duration-300 ease-in-out flex p-4 dark:bg-primary border-2 hover:border-secondary-color/10 rounded-md">
        <h1 className="font-bold text-foreground flex items-center gap-2 text-sm">
          {' '}
          {notification.notificationType === 'budgetWarning' ? (
            <CircleAlert
              size={28}
              className="bg-secondary-color/10 border p-1 text-secondary-color rounded-md"
            />
          ) : (
            <TriangleAlert size={28} className="bg-red-500/10 border p-1 text-red-500 rounded-md" />
          )}{' '}
          {t(`notification.${notification.notificationType}.title`)}
        </h1>

        <div className="flex items-center justify-between">
          <div className="text-sm text-ellipsis text-overflow">
            <Trans
              i18nKey={`notification.${notification.notificationType}.content`}
              defaults="Your budget <0>{{ budgetName }}</0> is approaching its limit.<1/>You have <2>{{budgetAmountRemaining}}<2/> remaining."
              values={{
                budgetName: t(notification.budgetName),
                budgetAmountRemaining: formatAmount(notification?.budgetAmount ?? 0),
              }}
              components={[
                <strong
                  className="rounded-md px-2 py-1 justify-center text-[0.65rem] tracking-wider"
                  style={{ backgroundColor: notification.color.value }}
                />,
                <br />,
                <span className="border-2 rounded-md px-1 text-red-400" />,
              ]}
            />
          </div>
          <div className="flex items-center ml-auto">
            <Button
              variant="outline"
              className="p-1.5 rounded-md  hover:bg-secondary-color transition-colors duration-300 ml-1"
              onClick={() => {
                deleteNotification(notification.id);
              }}
            >
              <Trash2 className="cursor-pointer text-bold text-white" size={18} />
            </Button>
          </div>
        </div>
        <div className=" text-sm opacity-70 text-gray-500">
          {(() => {
            const now = new Date();
            const notificationDate = new Date(notification.createdAt);
            const diffInSeconds = Math.floor((now.getTime() - notificationDate.getTime()) / 1000);

            if (diffInSeconds < 60) {
              return `${diffInSeconds} seconds ago`;
            } else if (diffInSeconds < 3600) {
              const minutes = Math.floor(diffInSeconds / 60);
              return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
            } else if (diffInSeconds < 86400) {
              const hours = Math.floor(diffInSeconds / 3600);
              return `${hours} hour${hours > 1 ? 's' : ''} ago`;
            } else {
              const days = Math.floor(diffInSeconds / 86400);
              return `${days} day${days > 1 ? 's' : ''} ago`;
            }
          })()}
        </div>
      </div>
    </>
  );
}
