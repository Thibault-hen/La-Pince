import { EllipsisVertical, Pencil, Trash2, TriangleAlert } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getColorStatus } from '@/utils/colorStatus';
import { getPercentage } from '@/utils/percentage';
import type { Budget } from '@/types/budget';
import { useTranslation } from 'react-i18next';
import { useCurrency } from '@/hooks/use-currency';

interface BudgetProps {
  budget: Budget;
  onOpenEditModal: () => void;
  onOpenDeleteModal: () => void;
}

export const BudgetCard = ({ budget, onOpenEditModal, onOpenDeleteModal }: BudgetProps) => {
  const { t } = useTranslation();
  const { formatAmount } = useCurrency();

  const getRemainingBudget = () => {
    if (budget.amount === undefined || budget.totalExpense === undefined) {
      return 0;
    }
    const remaining = budget.amount - budget.totalExpense;
    return remaining < 0 ? '0' : remaining.toFixed(2);
  };

  return (
    <Card className="flex justify-around p-4 dark:bg-primary hover:border-secondary-color transition-all duration-200 ease-in-out">
      <CardHeader className="p-0">
        <div className="flex items-center justify-between">
          <CardTitle
            className="border-l-4 px-2 flex gap-2 items-center"
            style={{ borderLeftColor: budget.category.color?.value }}
          >
            {t(budget.category.title)}
            {budget.totalExpense > (budget.amount ?? 0) && (
              <TriangleAlert
                size={30}
                className="text-red-500 bg-red-500/20 p-1 rounded-xl border border-red-500"
              />
            )}
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
                  <span>{t('budget.card.edit')}</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="p-2 dark:bg-primary cursor-pointer hover:!bg-red-500 dark:hover:bg-red-700/20 transition-all duration-150 ease-in-out"
                  onClick={onOpenDeleteModal}
                >
                  <Trash2 className="dark:text-white text-dark" />
                  <span>{t('budget.card.delete')}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col">
        <CardDescription className="flex flex-col space-x-1 items-center">
          <div className="flex justify-between w-full">
            <div className="flex gap-1 items-center">
              <span className="text-xs text-muted-foreground">{t('budget.card.spent')}</span>
              <span
                className="text-xs"
                style={
                  {
                    color: getColorStatus(budget.totalExpense, budget.amount),
                  } as React.CSSProperties
                }
              >
                ({getPercentage(budget.totalExpense, budget.amount)})
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className={`${budget.totalExpense > budget.amount ? 'text-red-500' : ''}`}>
                {formatAmount(budget.totalExpense)}
              </span>
              <span>/</span>
              <span className="font-bold">{formatAmount(budget.amount)}</span>
            </div>
          </div>
          <div className="flex w-full flex-col">
            <Progress
              value={budget.totalExpense > budget.amount ? budget.amount : budget.totalExpense}
              max={budget.amount > 0 ? budget.amount : 100}
              className="w-full border [&>*]:bg-[var(--bg-color)] h-3 mt-2"
              style={
                {
                  '--bg-color': getColorStatus(budget.totalExpense, budget.amount),
                } as React.CSSProperties
              }
            />
            <span className="flex self-end p-1 text-xs text-muted-foreground font-bold">
              {formatAmount(Number(getRemainingBudget()))} {t('budget.card.remaining')}
            </span>
          </div>
        </CardDescription>
      </CardContent>
    </Card>
  );
};
