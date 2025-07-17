import { t } from 'i18next';
import { Tags } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Category } from '@/types/category';
import { getCategoryIcon } from '@/utils/categoryIcon';

export const CategoryFilter = ({
  categories,
  onFilter,
}: {
  categories: Category[];
  onFilter: (categoryId: string) => void;
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const handleFilter = (categoryId: string) => {
    setActiveFilter(categoryId);
    onFilter(categoryId);
  };

  return (
    <div className="flex flex-col gap-2 mb-4 p-4 border shadow-sm dark:bg-primary rounded-lg">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-1.5 bg-primary-color/10 border border-primary-color/20 rounded-lg">
            <Tags className="w-4 h-4 text-primary-color" />
          </div>

          <span className="font-semibold text-foreground text-xs uppercase tracking-widest">
            {t('expenses.table.filter.category')}
          </span>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
        <Button
          variant="outline"
          className={`${activeFilter === 'all' ? 'bg-secondary-color text-white' : ''} rounded-xl transition-colors`}
          onClick={() => handleFilter('all')}
        >
          Toutes
        </Button>
        {categories.map((cat) => {
          const IconComponent = getCategoryIcon(cat.title);
          return (
            <div className="flex justify-center" key={cat.id}>
              <Badge
                variant={activeFilter === cat.id ? 'default' : 'outline'}
                className="
                    items-center capitalize min-w-26 gap-1.5 rounded-xl
                    shadow-sm font-bold text-xs border cursor-pointer
                "
                style={{
                  backgroundColor:
                    activeFilter === cat.id
                      ? cat.color?.value
                      : `${cat.color?.value}20`,
                  color: activeFilter === cat.id ? 'white' : cat.color?.value,
                  borderColor: cat.color?.value,
                }}
                onClick={() => handleFilter(cat.id)}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: cat.color?.value }}
                >
                  <IconComponent className="w-3.5 h-3.5 text-white" />
                </div>
                <span>{t(cat.title)}</span>
              </Badge>
            </div>
          );
        })}
      </div>
    </div>
  );
};
