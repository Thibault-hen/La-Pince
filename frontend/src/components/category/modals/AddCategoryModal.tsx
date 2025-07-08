/** biome-ignore-all lint/correctness/noChildrenProp: TanStack Form uses children prop pattern */
import { useForm } from '@tanstack/react-form';
import { useTranslation } from 'react-i18next';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCreateCategory } from '@/hooks/use-category';
import { createCategorySchema } from '@/schemas/category.schemas';
import type { Color } from '@/types/color';

interface AddCategoryProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  colors?: Color[];
}

export const AddCategoryModal = ({
  colors,
  open,
  setOpen,
}: AddCategoryProps) => {
  const { mutateAsync: createCategory } = useCreateCategory();
  const { t } = useTranslation();

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
            <DialogTitle className="font-medium text-xl">
              {t('categories.add.title')}
            </DialogTitle>
            <DialogDescription>
              {t('categories.add.description')}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <form.Field
              name="title"
              children={(field) => (
                <div className="grid gap-3">
                  <Label htmlFor={field.name}>
                    {t('categories.add.form.title')}
                  </Label>
                  <Input
                    id={field.name}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                    }}
                    placeholder={t('categories.add.form.titlePlaceholder')}
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
                  <Label htmlFor={field.name}>
                    {t('categories.add.form.color')}
                  </Label>
                  <Select
                    name={field.name}
                    onValueChange={(value) => field.handleChange(value)}
                    required
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={t('categories.add.form.colorPlaceholder')}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>
                          {t('categories.add.form.colorLabel')}
                        </SelectLabel>
                        {colors?.map((color) => (
                          <SelectItem
                            key={color.id}
                            value={color.id ?? ''}
                            className="flex cursor-pointer"
                          >
                            <span>{t(color.name)}</span>
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
              <Button variant="outline">
                {t('categories.add.form.cancel')}
              </Button>
            </DialogClose>
            <Button type="submit" variant="blue">
              {t('categories.add.form.create')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
