import { Calculator, Euro, TrendingUp } from 'lucide-react';

interface DashboardCardsProps {
  currentMonthRevenue: number;
  currentMonthBudget: number;
  currentMonthExpenses: number;
}

export const DashboardCards = ({currentMonthRevenue, currentMonthBudget, currentMonthExpenses}: DashboardCardsProps) => {
  return (
    <div className="flex flex-col w-full xl:max-w-xl justify-between">
      <div className="relative group">
        <div className="relative bg-white dark:bg-primary p-6 rounded-xl border hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-primary-color/10 border border-primary-color/20 rounded-lg">
              <Euro className="h-5 w-5 text-primary-color" />
            </div>
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              revenu
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {currentMonthRevenue.toFixed(2)}€
            </div>
            <p className="text-sm text-muted-foreground">Mon revenu ce mois ci</p>
          </div>
        </div>
      </div>

      <div className="relative group">
        <div className="relative bg-white dark:bg-primary p-6 rounded-xl border hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-primary-color/10 border border-primary-color/20 rounded-lg">
              <Calculator className="h-5 w-5 text-primary-color" />
            </div>
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              budget total
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-xl md:text-3xl font-bold">{currentMonthBudget.toFixed(2)}€</div>
            <p className="text-sm text-muted-foreground">Budget total ce mois ci</p>
          </div>
        </div>
      </div>

      <div className="relative group">
        <div className="relative bg-white dark:bg-primary p-6 rounded-xl border hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-primary-color/10 border border-primary-color/20 rounded-lg">
              <TrendingUp className="h-5 w-5 text-primary-color" />
            </div>
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Restant
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-xl md:text-3xl font-bold">{(currentMonthRevenue - currentMonthExpenses).toFixed(2)}€</div>
            <p className="text-sm text-muted-foreground">Restant ce mois ci</p>
          </div>
        </div>
      </div>
    </div>
  );
};
