import { ArrowUpRight, TrendingDown, Calendar } from 'lucide-react';
import { Button } from '../ui/button';

export const LastExpenses = () => {
  // Données d'exemple - remplacez par vos vraies données de la base
  const recentExpenses = [
    {
      id: 1,
      title: 'Courses Carrefour',
      amount: 67.5,
      date: '2025-06-19',
      color: '#10b981', // emerald-500
    },
    {
      id: 2,
      title: 'Essence Shell',
      amount: 45.2,
      date: '2025-06-18',
      color: '#3b82f6', // blue-500
    },
    {
      id: 3,
      title: 'Café Starbucks',
      amount: 4.8,
      date: '2025-06-18',
      color: '#f97316', // orange-500
    },
    {
      id: 4,
      title: 'Netflix',
      amount: 15.99,
      date: '2025-06-17',
      color: '#8b5cf6', // violet-500
    },
    {
      id: 5,
      title: 'Pharmacie',
      amount: 23.45,
      date: '2025-06-17',
      color: '#ef4444', // red-500
    },
    {
      id: 6,
      title: 'Restaurant Le Bistrot',
      amount: 89.3,
      date: '2025-06-16',
      color: '#f97316', // orange-500
    },
    {
      id: 7,
      title: 'Zara',
      amount: 129.0,
      date: '2025-06-15',
      color: '#ec4899', // pink-500
    },
    {
      id: 8,
      title: 'Électricité EDF',
      amount: 156.78,
      date: '2025-06-14',
      color: '#6366f1', // indigo-500
    },
    {
      id: 9,
      title: 'Parking Centre Ville',
      amount: 8.5,
      date: '2025-06-14',
      color: '#3b82f6', // blue-500
    },
    {
      id: 10,
      title: 'Boulangerie Paul',
      amount: 12.6,
      date: '2025-06-13',
      color: '#10b981', // emerald-500
    },
  ];

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

  const totalAmount = recentExpenses.reduce((sum, expense) => sum + expense.amount, 0);

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
          {recentExpenses.map((expense, _index) => {
            return (
              <div
                key={expense.id}
                className="relative p-2 px-6 dark:bg-primary transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  {/* Color indicator */}
                  <div
                    className="w-4 h-4 rounded-full shadow-sm"
                    style={{ backgroundColor: expense.color }}
                  />

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold truncate text-base">{expense.title}</h3>
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
            <Button className="w-full" variant="blue">
              Voir toutes les transactions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
