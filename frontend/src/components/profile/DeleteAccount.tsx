import { UserRoundX } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';

interface DeleteAccountProps {
  onOpenDeleteModal: () => void;
}

export const DeleteAccount = ({ onOpenDeleteModal }: DeleteAccountProps) => {
  const { t } = useTranslation();
  return (
    <Card className="dark:bg-primary">
      <CardHeader>
        <div className="flex items-center gap-2">
          <UserRoundX className="h-5 w-5 text-primary-color" />
          <CardTitle className="text-lg md:text-xl">
            {t('account.delete.header.title')}
          </CardTitle>
        </div>
        <CardDescription>
          <p>{t('account.delete.header.subtitle')}</p>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground list-inside">
            <li className="list-disc">{t('account.delete.list.item1')}</li>
            <li className="list-disc">{t('account.delete.list.item2')}</li>
            <li className="list-disc">{t('account.delete.list.item3')}</li>
          </ul>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="pt-1">
          <Button
            type="submit"
            size="lg"
            variant="red"
            onClick={onOpenDeleteModal}
          >
            {t('account.delete.button')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
