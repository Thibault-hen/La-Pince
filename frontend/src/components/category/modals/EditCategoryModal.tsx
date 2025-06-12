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
import type { IBudget, ICategory } from '@/data/data';

interface EditCategoryProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  category?: ICategory & {
    budget: IBudget;
  };
}

export const EditCategoryModal = (props: EditCategoryProps) => {
  const colors = [
    { hex: '#FF5733', title: 'Red' },
    { hex: '#33FF57', title: 'Green' },
    { hex: '#3357FF', title: 'Blue' },
    { hex: '#FF33A1', title: 'Pink' },
    { hex: '#A133FF', title: 'Purple' },
    { hex: '#33FFF5', title: 'Cyan' },
    { hex: '#F5FF33', title: 'Yellow' },
    { hex: '#FF8C33', title: 'Orange' },
    { hex: '#33FF8C', title: 'Teal' },
  ];
  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-medium text-xl">Modifier une catégorie</DialogTitle>
            <DialogDescription>
              Modifie les informations de ta catégorie {props.category?.title}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="limit">Titre</Label>
              <Input
                id="title"
                name="title"
                placeholder="Loisirs"
                type="text"
                value={props.category?.title}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="color">Couleurs</Label>
              <Select name="color" required defaultValue={props.category?.color}>
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
              Modifier
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
