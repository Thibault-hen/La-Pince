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
import { useCategories } from '@/hooks/use-category';
import { useUpdateBudget } from '@/hooks/use-budget';
import { useForm } from '@tanstack/react-form';
import { updateBudgetSchema } from '@/schemas/budget.schemas';
import { Loader } from '@/components/ui/loader';
import type { Budget } from '@/services/budget';

interface AddBudgetProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  budget?: Budget;
}

export const EditBudgetModal = ({ budget, open, setOpen }: AddBudgetProps) => {
  const { data: categories } = useCategories();
  const { mutateAsync: updateBudget } = useUpdateBudget();

  const form = useForm({
    defaultValues: {
      amount: budget?.amount ?? 0,
      limitAlert: budget?.limitAlert ?? 0,
      categoryId: budget?.categoryId ?? '',
    },
    validators: {
      onSubmit: updateBudgetSchema,
    },
    async onSubmit({ value }) {
      if (!budget?.id) return;
      console.log('Form submitted with values:', value);
      await updateBudget({ id: budget.id, data: value });
      setOpen(false);
    },
  });

  if (!budget) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <form
          onSubmit={async (e) => {
            console.log('Form submitted:');
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <DialogHeader>
            <DialogTitle className="font-medium text-xl">
              Modifie ton budget {budget?.category?.title}
            </DialogTitle>
            <DialogDescription>Entre les nouvelles informations de ton budget</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <form.Field
              name="amount"
              children={(field) => (
                <div className="grid gap-3">
                  <Label htmlFor={field.name}>Montant</Label>
                  <Input
                    id={field.name}
                    placeholder="800"
                    type="number"
                    required
                    defaultValue={budget.amount}
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(Number(e.target.value));
                    }}
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
              name="limitAlert"
              children={(field) => (
                <div className="grid gap-3">
                  <Label htmlFor={field.name}>Alerte limite</Label>
                  <Input
                    id={field.name}
                    placeholder="600"
                    type="number"
                    required
                    defaultValue={budget.limitAlert}
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(Number(e.target.value));
                    }}
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
              name="categoryId"
              children={(field) => {
                const selectedCategory = categories?.find(
                  (category) => category.id === budget.categoryId
                );
                return (
                  <div className="grid gap-3">
                    <Label htmlFor={field.name}>Categorie</Label>
                    <Select
                      name={field.name}
                      onValueChange={(value) => field.handleChange(value)}
                      value={field.state.value}
                      defaultValue={selectedCategory?.id}
                      required
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sélectionne une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Catégories</SelectLabel>
                          {categories?.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              <span>{category.title}</span>
                              <div
                                style={{ backgroundColor: category?.color.value }}
                                className="h-3 w-3 rounded-lg"
                              ></div>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {field.state.meta.errors.length > 0 && (
                      <span className="text-red-500 text-sm">
                        {field.state.meta.errors[0]?.message}
                      </span>
                    )}
                  </div>
                );
              }}
            />
          </div>
          <DialogFooter className="flex justify-between items-center mt-4">
            <DialogClose asChild>
              <Button variant="outline">Annuler</Button>
            </DialogClose>
            <form.Subscribe
              selector={(state) => [state.isSubmitting]}
              children={([isSubmiting]) => (
                <Button type="submit" variant="blue">
                  {isSubmiting ? <Loader /> : 'Créer'}
                </Button>
              )}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
