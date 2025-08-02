import { t } from 'i18next';
import { Check, SquareStack, Tags } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
    <Select onValueChange={handleFilter} defaultValue="all">
      <SelectTrigger className="w-full sm:w-[220px] bg-primary">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="flex flex-col gap-1">
          <SelectLabel>{t('expenses.table.filter.category')}</SelectLabel>
          <SelectItem
            value="all"
            className={`${activeFilter === 'all' ? 'bg-primary-color' : 'bg-primary-color/20'} flex transition-colors min-w-26 gap-1.5 text-xs`}
            onClick={() => handleFilter('all')}
          >
            <div className="w-6 h-6 rounded-full flex items-center justify-center bg-primary-color">
              <SquareStack className="w-3.5 h-3.5 text-white" />
            </div>
            <span> {t('expenses.table.filter.categoryAll')}</span>
          </SelectItem>
          {categories.map((cat) => {
            const IconComponent = getCategoryIcon(cat.title);
            return (
              <div className="flex justify-center" key={cat.id}>
                <SelectItem
                  value={cat.id}
                  className="
                    items-center capitalize min-w-26 gap-1.5
                   font-bold text-xs
                "
                  style={{
                    backgroundColor:
                      activeFilter === cat.id
                        ? cat.color?.value
                        : `${cat.color?.value}20`,
                    color: activeFilter === cat.id ? 'white' : cat.color?.value,
                    borderColor: cat.color?.value,
                  }}
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: cat.color?.value }}
                  >
                    <IconComponent className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span>{t(cat.title)}</span>
                </SelectItem>
              </div>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
