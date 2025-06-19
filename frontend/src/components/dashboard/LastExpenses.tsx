import { ArrowUpRight, TrendingDown, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import type { Expense } from '@/types/dashboard';
import { useNavigate } from 'react-router-dom';

interface LastExpensesProps {
  lastExpensesData: Expense[]
}

export const LastExpenses = ({lastExpensesData} : LastExpensesProps) => {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Aujourd'hui";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Hier';
    } else {
      return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
    }
  };

  const totalAmount = lastExpensesData.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="w-full max-w-xl shadow-xl dark:bg-primary rounded-lg border">
      <div className="text-white relative overflow-hidden px-8 py-4">
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-secondary-color/10 border border-secondary-color/20 rounded-lg">
                <TrendingDown className="h-5 w-5 text-secondary-color" />
              </div>
              <div>
                <h2 className="text-lg lg:text-lg font-bold text-white mb-1">Dernières Dépenses</h2>
                <p className="text-white/70 text-sm font-medium">Vos 10 dernières transactions</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                <p className="text-lg md:text-xl font-bold text-white">
                  -{totalAmount.toFixed(2)} €
                </p>
              </div>
              <p className="text-white/70 text-sm">Total des dépenses</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        {/* Expense List */}
        <div>
          {lastExpensesData.map((expense, index) => {
            return (
              <div
                key={index}
                className="relative p-2 px-6 dark:bg-primary transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  {/* Color indicator */}
                  <div
                    className="w-4 h-4 rounded-full shadow-sm"
                    style={{ backgroundColor: expense.budget.category.color.value }}
                  />

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold truncate text-base">{expense.description}</h3>
                      <span className="text-sm font-bold text-red-500 ml-4">
                        -{expense.amount.toFixed(2)} €
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(expense.date)}</span>
                      <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-blue-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="p-6">
            <Button className="w-full" variant="blue" onClick={() => navigate('/tableau-de-bord/depenses')}>
              Voir toutes les transactions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
