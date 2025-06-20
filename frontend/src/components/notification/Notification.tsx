import { useCurrency } from '@/hooks/use-currency';
import { useDeleteNotification } from '@/hooks/use-notification';
import { Check } from 'lucide-react';
import { Trans, useTranslation } from 'react-i18next';

type NotificationProps = {
  notification: {
    type: 'budgetWarning' | 'budgetExceeded';
    id: string;
    date: string;
    budgetName: string;
    budgetAmount?: number;
  };
};

export default function Notification({ notification }: NotificationProps) {
  const { t } = useTranslation();
  const { deleteNotification } = useDeleteNotification();
  const { formatAmount } = useCurrency();
  return (
    <>
      <div
        className={`{  flex-col gap-2   group transition-all duration-300 ease-in-out    flex p-4 bg-primary-color/8 border-2 hover:border-secondary-color/10 rounded-md `}
      >
        <h1
          className={`${notification.type === 'budgetWarning' ? 'text-orange-400' : 'text-red-400'}`}
        >
          {t(`notification.${notification.type}.title`)}
        </h1>

        <div className="flex items-center justify-between">
          <div className=" text-sm  text-ellipsis text-overflow group-hover:whitespace-normal">
            <Trans
              i18nKey={`notification.${notification.type}.content`}
              defaults="Your budget <0>{{ budgetName }}</0> is approaching its limit.<1/>You have <2>{{budgetAmountRemaining}}<2/> remaining."
              values={{
                budgetName: t(notification.budgetName),
                budgetAmountRemaining: formatAmount(notification?.budgetAmount ?? 0),
              }}
              components={[
                <strong className="border-2 rounded-md px-1" />,
                <br />,
                <span className="border-2 rounded-md px-1 text-red-400" />,
              ]}
            />
          </div>
          <div className="flex items-center ml-auto">
            <button
              onClick={() => {
                deleteNotification(notification.id);
              }}
              className="text-red-400 hover:text-red-500 mx-2 "
            >
              <Check className={'cursor-pointer text-primary-color text-bold'} />
            </button>
          </div>
        </div>
        <div className=" text-sm opacity-70 text-gray-500">
          {(() => {
            const now = new Date();
            const notificationDate = new Date(notification.date);
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
