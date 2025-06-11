import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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

interface EditBudgetProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  budget?: {
    id: string;
    title: string;
    amount: number;
    value: string;
    totalExpense: number;
  };
}

export const EditBudgetModal = (props: EditBudgetProps) => {
  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edite ton budget</DialogTitle>
            <DialogDescription>
              Modifie les informations de ton budget {props.budget?.title}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="limit">Limite</Label>
              <Input
                id="limit"
                name="limit"
                placeholder="200"
                type="number"
                value={props.budget?.amount}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="alertLimit">Seuil d'alerte</Label>
              <Input id="alertLimit" name="alertLimit" placeholder="170" type="number" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="category">Categorie</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionne une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Catégories</SelectLabel>
                    <SelectItem value="nourriture">Nourriture</SelectItem>
                    <SelectItem value="vêtements">Vêtements</SelectItem>
                    <SelectItem value="loisirs">Loisirs</SelectItem>
                    <SelectItem value="voyages">Voyages</SelectItem>
                    <SelectItem value="Autres">Autres</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="hover:bg-secondary-color" variant="outline">
                Annuler
              </Button>
            </DialogClose>
            <Button type="submit" variant="blue">
              Editer
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
