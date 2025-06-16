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
import {  useUpdateCategory } from '@/hooks/categories';
import { useForm } from '@tanstack/react-form';
import { createCategorySchema } from '@/schemas/category.schemas';
import type { Category } from '@/types/category';
import { useEffect } from 'react';

interface AddCategoryProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  colors?: Color[];
  category?: Category;
}

export const EditCategoryModal = ({ category, colors, open, setOpen }: AddCategoryProps) => {
  const { mutateAsync: updateCategory } = useUpdateCategory();

  useEffect(() => {
    form.reset();
  }, [category]);

  const form = useForm({
    defaultValues: {
      title: category?.title ?? '',
      colorId: category?.colorId ?? '',
    },
    validators: {
      onSubmit: createCategorySchema,
    },
    async onSubmit({ value }) {
      if (!category?.id) return;
      await updateCategory({ id: category.id, data: value });
      setOpen(false);
    },
  });

  if (!category) return null;

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
            <DialogTitle className="font-medium text-xl">
              Modifie ta catégorie {category?.title}
            </DialogTitle>
            <DialogDescription>Modifie les informations de ton budget</DialogDescription>
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
                    value={field.state.value || ''}
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
              children={(field) => {
                const selectedColor = colors?.find((color) => color.id === category?.colorId);
                return (
                  <div className="grid gap-3">
                    <Label htmlFor={field.name}>Couleurs</Label>
                    <Select
                      name={field.name}
                      onValueChange={(value) => field.handleChange(value)}
                      required
                      defaultValue={selectedColor?.id}
                      value={field.state.value}
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
                );
              }}
            />
          </div>
          <DialogFooter className="mt-4 flex justify-between items-center">
            <DialogClose asChild>
              <Button variant="outline">Annuler</Button>
            </DialogClose>
            <Button type="submit" variant="blue">
              Modifier
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
