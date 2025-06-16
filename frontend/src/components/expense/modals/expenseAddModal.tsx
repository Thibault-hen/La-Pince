import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useCategories } from '@/hooks/use-category';

type ExpenseAddModalProps = {
  isModalOpen: boolean;
  handleClose: () => void;
};

export default function ExpenseAddModal({ isModalOpen, handleClose }: ExpenseAddModalProps) {
  const { categories } = useCategories();

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={(open) => {
        if (!open) {
          handleClose();
        }
      }}
    >
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-medium text-xl">Créer une nouvelle dépense</DialogTitle>
            <DialogDescription>Entre les informations de ta nouvelle dépense</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="limit">Titre</Label>
              <Input
                id="title"
                name="title"
                placeholder="Titre de votre dépense"
                type="string"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="limit">Montant</Label>

              <Input id="amount" name="amount" placeholder="200€" type="text" required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="category">Categorie</Label>
              <Select name="category" required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionne une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Catégories</SelectLabel>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Annuler</Button>
            </DialogClose>
            <Button type="submit" variant="blue">
              Créer
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
