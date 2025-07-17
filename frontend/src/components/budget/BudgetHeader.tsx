import { PiggyBank, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';

export const BudgetHeader = ({
  onOpenAddModal,
}: {
  onOpenAddModal: () => void;
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col sm:items-center sm:flex-row justify-between gap-2">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary-color/10 border border-primary-color/20 rounded-lg">
          <PiggyBank className="h-5 w-5 text-primary-color" />
        </div>
        <div>
          <h1 className="text-lg md:text-2xl font-bold text-foreground">
            {t('budget.header.title')}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t('budget.header.subtitle')}
          </p>
        </div>
      </div>
      <div>
        <Button
          variant="blue"
          className="w-full text-xxs"
          onClick={onOpenAddModal}
        >
          <Plus />
          {t('budget.header.addButton')}
        </Button>
      </div>
    </div>
  );
};
