import { Plus, Tags } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';

export const CategoryHeader = ({
  onOpenAddModal,
}: {
  onOpenAddModal: () => void;
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col sm:items-center sm:flex-row justify-between gap-2">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary-color/10 border border-primary-color/20 rounded-lg">
          <Tags className="h-5 w-5 text-primary-color" />
        </div>
        <div>
          <h1 className="text-lg md:text-2xl font-bold text-foreground">
            {t('categories.header.title')}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t('categories.header.subtitle')}
          </p>
        </div>
      </div>
      <div>
        <Button variant="blue" className="w-full" onClick={onOpenAddModal}>
          <Plus />
          {t('categories.header.addButton')}
        </Button>
      </div>
    </div>
  );
};
