import { CirclePlus } from 'lucide-react';
import { Button } from '../ui/button';

export const CategoryHeader = ({ onOpenAddModal }: { onOpenAddModal: () => void }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="border-l-4 border-primary-color text-xl p-2 font-bold">Mes catégories</h2>
      <Button variant="blue" onClick={onOpenAddModal}>
        Ajouter une catégorie <CirclePlus />
      </Button>
    </div>
  );
};
