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
import { colors } from '@/data/data';

interface AddCategoryProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const AddCategoryModal = (props: AddCategoryProps) => {
  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-medium text-xl">Créer une nouvelle catégorie</DialogTitle>
            <DialogDescription>Entre les informations de ta nouvelle catégorie</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="limit">Titre</Label>
              <Input id="title" name="title" placeholder="Loisirs" type="text" required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="color">Couleurs</Label>
              <Select name="color" required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionne une couleur" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Couleurs</SelectLabel>
                    {colors.map((color, idx) => (
                      <SelectItem key={idx} value={color.hex} className="flex">
                        <span>{color.title}</span>
                        <div
                          style={{ backgroundColor: color.hex }}
                          className="h-3 w-3 rounded-lg"
                        ></div>
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
};
