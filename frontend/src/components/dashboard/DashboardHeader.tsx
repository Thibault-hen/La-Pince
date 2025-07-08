import { t } from 'i18next';
import { Home } from 'lucide-react';
import { Button } from '../ui/button';

export const DashboardHeader = ({
  onOpenEditModal,
}: {
  onOpenEditModal: () => void;
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary-color/10 border border-primary-color/20 rounded-lg">
          <Home className="h-5 w-5 text-primary-color" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {t('dashboard.header.title')}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t('dashboard.header.subtitle')}
          </p>
        </div>
      </div>
      <div>
        <div>
          <Button variant="blue" onClick={onOpenEditModal}>
            {t('dashboard.header.addButton')}
          </Button>
        </div>
      </div>
    </div>
  );
};
