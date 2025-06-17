import { CirclePlus, PiggyBank } from 'lucide-react';
import { Button } from '../ui/button';

export const BudgetHeader = ({ onOpenAddModal }: { onOpenAddModal: () => void }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary-color/10 border border-primary-color/20 rounded-lg">
          <PiggyBank className="h-5 w-5 text-primary-color" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Budgets</h1>
          <p className="text-sm text-muted-foreground">Gérez vos budgets</p>
        </div>
      </div>
      <div>
        <Button variant="blue" onClick={onOpenAddModal}>
          Ajouter un budget <CirclePlus />
        </Button>
      </div>
    </div>
  );
};
