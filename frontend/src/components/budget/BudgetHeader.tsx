import { CirclePlus } from 'lucide-react';
import { Button } from '../ui/button';
import { useTranslation } from 'react-i18next';

export const BudgetHeader = ({ onOpenAddModal }: { onOpenAddModal: () => void }) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="border-l-4 border-primary-color text-xl p-2 font-bold">
        {t('budget.header.title')}
      </h2>
      <Button variant="blue" onClick={onOpenAddModal}>
        {t('budget.header.addButton')} <CirclePlus />
      </Button>
    </div>
  );
};
