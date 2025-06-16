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
import type { Color } from '@/types/color';
import { useCreateCategory } from '@/hooks/use-category';
import { useForm } from '@tanstack/react-form';
import { createCategorySchema } from '@/schemas/category.schemas';

interface AddCategoryProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  colors?: Color[];
}

export const AddCategoryModal = ({ colors, open, setOpen }: AddCategoryProps) => {
  const { mutateAsync: createCategory } = useCreateCategory();

  const form = useForm({
    defaultValues: {
      title: '',
      colorId: '',
    },
    validators: {
      onSubmit: createCategorySchema,
    },
    async onSubmit({ value }) {
      await createCategory(value);
      setOpen(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <DialogHeader className="mb-4">
            <DialogTitle className="font-medium text-xl">Créer une nouvelle catégorie</DialogTitle>
            <DialogDescription>Entre les informations de ta nouvelle catégorie</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <form.Field
              name="title"
              children={(field) => (
                <div className="grid gap-3">
                  <Label htmlFor={field.name}>Titre</Label>
                  <Input
                    id={field.name}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                    }}
                    placeholder="Loisirs"
                    type="text"
                    required
                  />
                  {field.state.meta.errors.length > 0 && (
                    <span className="text-red-500 text-sm">
                      {field.state.meta.errors[0]?.message}
                    </span>
                  )}
                </div>
              )}
            />
            <form.Field
              name="colorId"
              children={(field) => (
                <div className="grid gap-3">
                  <Label htmlFor={field.name}>Couleurs</Label>
                  <Select
                    name={field.name}
                    onValueChange={(value) => field.handleChange(value)}
                    required
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sélectionne une couleur" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Couleurs</SelectLabel>
                        {colors?.map((color) => (
                          <SelectItem key={color.id} value={color.id ?? ''} className="flex">
                            <span>{color.name}</span>
                            <div
                              style={{ backgroundColor: color.value }}
                              className="h-3 w-3 rounded-lg"
                            ></div>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}
            />
          </div>
          <DialogFooter className="mt-4 flex justify-between items-center">
            <DialogClose asChild>
              <Button variant="outline">Annuler</Button>
            </DialogClose>
            <Button type="submit" variant="blue">
              Créer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
