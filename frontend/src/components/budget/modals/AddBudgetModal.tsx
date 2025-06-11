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

interface AddBudgetProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const AddBudgetModal = (props: AddBudgetProps) => {
  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Créer un nouveau budget</DialogTitle>
            <DialogDescription>Entre les informations de ton nouveau budget</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="limit">Limite</Label>
              <Input id="limit" name="limit" placeholder="200" type="number" />
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
};
