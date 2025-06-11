import { Info } from 'lucide-react';

export const BudgetCards = () => {
  return (
    <div className="flex justify-between gap-2 w-full flex-col">
      <div className="w-full relative overflow-hidden rounded-md border dark:bg-primary p-6 transition-all shadow border-l-primary-color border-l-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Info className="h-6 w-6 text-secondary-color" />
            <span className="text-xs font-bold uppercase tracking-widest p-2">Budget total</span>
          </div>
        </div>

        <div className="mt-4">
          <div className="text-2xl font-bold tracking-wider">
            666 <span className="text-secondary-color">€</span>
          </div>
        </div>
      </div>
      <div className="w-full relative overflow-hidden rounded-md border dark:bg-primary p-6 transition-all shadow border-l-primary-color border-l-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Info className="h-6 w-6 text-secondary-color" />
            <span className="text-xs font-bold uppercase tracking-widest">Budget restant</span>
          </div>
        </div>

        <div className="mt-4">
          <div className="text-2xl font-bold tracking-wider">
            200 <span className="text-secondary-color">€</span>
          </div>
        </div>
      </div>

      <div className="w-full relative overflow-hidden rounded-md border dark:bg-primary p-6 transition-all shadow border-l-primary-color border-l-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Info className="h-6 w-6 text-secondary-color" />
            <span className="text-xs font-bold uppercase tracking-widest">Nombre de budgets</span>
          </div>
        </div>

        <div className="mt-4">
          <div className="text-2xl font-bold tracking-wider">5</div>
        </div>
      </div>
    </div>
  );
};
