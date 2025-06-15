import { TrendingUp, Hash, Euro } from 'lucide-react';
import { Progress } from '../ui/progress';
import { useSpring } from 'motion/react';
import { useEffect, useState } from 'react';
import { getColorStatus } from '@/utils/colorStatus';
import { getPercentage } from '@/utils/percentage';

type BudgetCardsProps = {
  totalBudget?: number;
  activeBudget?: number;
  remainingBudget?: number;
};

export const BudgetCards = ({ totalBudget, activeBudget, remainingBudget }: BudgetCardsProps) => {
  const [displayTotal, setDisplayTotal] = useState<string>();
  const [displayCount, setDisplayCount] = useState<string>();
  const [displayRemaining, setDisplayRemaining] = useState<string>();

  const total = useSpring(0, {
    bounce: 0,
    duration: 2000,
  });

  const count = useSpring(0, {
    bounce: 0,
    duration: 2000,
  });

  const remaining = useSpring(0, {
    bounce: 0,
    duration: 2000,
  });

  total.on('change', (value) => {
    setDisplayTotal(value.toFixed(2));
  });

  count.on('change', (value) => {
    setDisplayCount(value.toFixed(0));
  });

  remaining.on('change', (value) => {
    setDisplayRemaining(value < 0 ? '0' : value.toFixed(2));
  });

  useEffect(() => {
    total.set(totalBudget ?? 0);
    count.set(activeBudget ?? 0);
    remaining.set(remainingBudget ?? 0);
  }, [totalBudget, activeBudget, remainingBudget]);

  return (
    <div className="flex flex-col gap-4 w-full xl:w-120">
      <div className="relative group">
        <div className="relative bg-white dark:bg-primary p-6 rounded-xl border hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 dark:bg-primary-color/20 bg-primary-color/30 border border-primary-color rounded-lg">
              <Euro className="h-4 w-4 md:h-5 md:w-5 text-primary-color" />
            </div>
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              TOTAL
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {displayTotal}
              <span className="text-lg text-gray-500 dark:text-gray-400 ml-1">€</span>
            </div>
            <p className="text-sm text-muted-foreground">Budget total</p>
          </div>
        </div>
      </div>

      <div className="relative group">
        <div className="relative bg-white dark:bg-primary p-6 rounded-xl border hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 dark:bg-primary-color/20 bg-primary-color/30 border border-primary-color rounded-lg">
              <Hash className="h-4 w-4 md:h-5 md:w-5 text-primary-color" />
            </div>
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Budgets
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-xl md:text-3xl font-bold">{displayCount}</div>
            <p className="text-sm text-muted-foreground">Budget actifs</p>
          </div>
        </div>
      </div>

      <div className="relative group">
        <div className="relative bg-white dark:bg-primary p-6 rounded-xl border hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 dark:bg-secondary-color/10 bg-secondary-color/30 border border-secondary-color rounded-lg">
              <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-secondary-color" />
            </div>
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Restant
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-xl md:text-3xl font-bold ">
              {displayRemaining}
              <span className="text-lg text-gray-500 dark:text-gray-400 ml-1">€</span>
            </div>
            <p className="text-sm text-muted-foreground">Budget restant</p>

            <div className="mt-3">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                <span>Utilisé</span>
                <span>{getPercentage(totalBudget ?? 0, remainingBudget ?? 0)}</span>
              </div>
              <Progress
                value={remainingBudget}
                max={totalBudget}
                className="w-full border [&>*]:bg-[var(--bg-color)] h-3 mt-2"
                style={
                  {
                    '--bg-color': getColorStatus(200, 800),
                  } as React.CSSProperties
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
