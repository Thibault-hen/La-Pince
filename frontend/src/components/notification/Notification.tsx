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
    <div className="relative group">
      <div className="flex flex-col gap-3 p-5 dark:bg-primary backdrop-blur-sm border rounded-xl shadow-sm transition-all duration-300 ease-out hover:scale-[1.02] hover:-translate-y-0.5">
        <div
          className="absolute top-0 left-0 w-full h-1.5 rounded-t-full opacity-60"
          style={{
            background: `linear-gradient(90deg, ${notification.color.value}, transparent 70%)`,
          }}
        />

        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 relative">
            {notification.notificationType === 'budgetWarning' ? (
              <div className="relative">
                <CircleAlert
                  size={24}
                  className="text-amber-600 dark:text-amber-400 drop-shadow-sm"
                />
                <div className="absolute -inset-1 bg-amber-500/20 rounded-full blur-sm -z-10" />
              </div>
            ) : (
              <div className="relative">
                <TriangleAlert
                  size={24}
                  className="text-red-600 dark:text-red-400 drop-shadow-sm"
                />
                <div className="absolute -inset-1 bg-red-500/20 rounded-full blur-sm -z-10" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm leading-tight">
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
          <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <Trans
              i18nKey={`notification.${notification.notificationType}.content`}
              values={{
                budgetName: t(notification.budgetName),
                budgetAmountRemaining: formatAmount(notification?.budgetAmount ?? 0),
              }}
              components={[
                <span
                  className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium text-white shadow-sm"
                  style={{
                    backgroundColor: notification.color.value,
                    boxShadow: `0 0 0 1px ${notification.color.value}20`,
                  }}
                />,
                <br />,
                <span
                  className={`font-medium ${
                    notification.notificationType === 'budgetWarning'
                      ? 'text-amber-700 dark:text-amber-300'
                      : 'text-red-700 dark:text-red-300'
                  }`}
                />,
              ]}
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <div className="w-1 h-1 bg-gray-400 rounded-full" />
            <time className="font-medium">
              {(() => {
                const now = new Date();
                const notificationDate = new Date(notification.createdAt);
                const diffInSeconds = Math.floor(
                  (now.getTime() - notificationDate.getTime()) / 1000
                );

                if (diffInSeconds < 60) {
                  return t(
                    `notification.time.seconds_${diffInSeconds === 1 ? 'singular' : 'plural'}`,
                    {
                      count: diffInSeconds,
                    }
                  );
                } else if (diffInSeconds < 3600) {
                  const minutes = Math.floor(diffInSeconds / 60);
                  return t(`notification.time.minutes_${minutes === 1 ? 'singular' : 'plural'}`, {
                    count: minutes,
                  });
                } else if (diffInSeconds < 86400) {
                  const hours = Math.floor(diffInSeconds / 3600);
                  return t(`notification.time.hours_${hours === 1 ? 'singular' : 'plural'}`, {
                    count: hours,
                  });
                } else {
                  const days = Math.floor(diffInSeconds / 86400);
                  return t(`notification.time.days_${days === 1 ? 'singular' : 'plural'}`, {
                    count: days,
                  });
                }
              })()}
            </time>
          </div>
        </div>
      </div>
    </div>
  );
}
