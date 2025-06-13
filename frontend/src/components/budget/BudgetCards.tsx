import { TrendingUp, Hash, Euro } from 'lucide-react';
import { Progress } from '../ui/progress';
import { useSpring } from 'motion/react';
import { useEffect, useState } from 'react';

export const BudgetCards = () => {
  const [displayTotal, setDisplayTotal] = useState<number>();
  const [displayCount, setDisplayCount] = useState<number>();
  const [displayRemaining, setDisplayRemaining] = useState<number>();

  const totalBudget = useSpring(0, {
    bounce: 0,
    duration: 2000,
  });

  const budgetCount = useSpring(0, {
    bounce: 0,
    duration: 2000,
  });

  const budgetRemaining = useSpring(0, {
    bounce: 0,
    duration: 2000,
  });

  totalBudget.on('change', (value) => {
    setDisplayTotal(Math.round(value));
  });

  budgetCount.on('change', (value) => {
    setDisplayCount(Math.round(value));
  });

  budgetRemaining.on('change', (value) => {
    setDisplayRemaining(Math.round(value));
  });

  const ColorStatus = {
    ok: '#34eb74',
    warning: '#eb8c34',
    alert: '#FF0000',
  };

  const budgetStatusBarColor = (value: number, max: number): string => {
    const percentage = (value / max) * 100;

    if (percentage < 60) return ColorStatus.ok;
    if (percentage < 90) return ColorStatus.warning;
    return ColorStatus.alert;
  };

  const values = {
    total: 800,
    budgets: 5,
    remaining: 200,
  };

  useEffect(() => {
    totalBudget.set(values.total);
    budgetCount.set(values.budgets);
    budgetRemaining.set(values.remaining);
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full xl:w-120">
      <div className="relative group">
        <div className="relative bg-white dark:bg-primary p-6 rounded-xl border hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 dark:bg-primary-color/20 bg-primary-color/30 border border-primary-color rounded-lg">
              <Euro className="h-5 w-5 text-primary-color" />
            </div>
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              TOTAL
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
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
              <Hash className="h-5 w-5 text-primary-color" />
            </div>
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Budgets
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{displayCount}</div>
            <p className="text-sm text-muted-foreground">Budget actifs</p>
          </div>
        </div>
      </div>

      <div className="relative group">
        <div className="relative bg-white dark:bg-primary p-6 rounded-xl border hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 dark:bg-secondary-color/10 bg-secondary-color/30 border border-secondary-color rounded-lg">
              <TrendingUp className="h-5 w-5 text-secondary-color" />
            </div>
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Restant
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {displayRemaining}
              <span className="text-lg text-gray-500 dark:text-gray-400 ml-1">€</span>
            </div>
            <p className="text-sm text-muted-foreground">Budget restant</p>

            <div className="mt-3">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                <span>Utilisé</span>
                <span>70%</span>
              </div>
              <Progress
                value={200}
                max={800}
                className="w-full border [&>*]:bg-[var(--bg-color)] h-3 mt-2"
                style={
                  {
                    '--bg-color': budgetStatusBarColor(200, 800),
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
