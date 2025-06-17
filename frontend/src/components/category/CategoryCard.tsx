import { EllipsisVertical, Pencil, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Badge } from '../ui/badge';
import type { Category } from '@/types/category';
import type { Budget } from '@/types/budget';
import { useTranslation } from 'react-i18next';

interface ICategoryProps {
  category?: Category & {
    budgets?: Budget[];
  };
  onOpenEditModal: () => void;
  onOpenDeleteModal: () => void;
}

export const CategoryCard = ({ category, onOpenDeleteModal, onOpenEditModal }: ICategoryProps) => {
  const { t } = useTranslation();

  return (
    <Card
      className="flex justify-around p-4 dark:bg-primary hover:border-secondary-color transition-all duration-200 ease-in-out gap-1 shadow"
      style={
        {
          '--hover-card': category?.color,
        } as React.CSSProperties
      }
    >
      <CardHeader className="p-0">
        <div className="flex items-center justify-between">
          <CardTitle
            className="border-l-4 px-2 flex gap-2 items-center"
            style={{
              borderLeftColor: category?.color?.value as React.CSSProperties['borderLeftColor'],
            }}
          >
            {category?.title}
          </CardTitle>
          <CardDescription className="flex gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger
                asChild
                className="dark:bg-primary cursor-pointer hover:bg-secondary-color dark:hover:bg-secondary-color border-none  focus:outline-none focus:ring-0 focus:ring-transparent
             focus-visible:outline-none focus-visible:ring-0
             data-[highlighted]:bg-transparent data-[state=open]:bg-transparent
             shadow-none focus:shadow-none focus-visible:shadow-none"
              >
                <Button variant="outline" size="icon">
                  <EllipsisVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  className="p-2 dark:bg-primary cursor-pointer hover:!bg-secondary-color transition-all duration-150 ease-in-out"
                  onClick={onOpenEditModal}
                >
                  <Pencil className="dark:text-white text-dark" />
                  <span>{t('category.card.edit')}</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="p-2 dark:bg-primary cursor-pointer hover:!bg-red-500 dark:hover:bg-red-700/20 transition-all duration-150 ease-in-out"
                  onClick={onOpenDeleteModal}
                >
                  <Trash2 className="dark:text-white text-dark" />
                  <span>{t('category.card.delete')}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-0 mx-4">
        <CardDescription>
          <span className="mr-2">{t('category.card.currentBudget')}</span>
          <Badge
            variant="outline"
            className="font-bold items-center hover:bg-secondary-color transition-all duration-200 ease-in-out"
          >
            {category?.budgets?.reduce((total, budget) => total + budget.amount, 0).toFixed(2)}€
          </Badge>
        </CardDescription>
      </CardContent>
    </Card>
  );
};
