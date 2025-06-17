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
import { useUpdateBudget } from '@/hooks/use-budget';
import { useForm } from '@tanstack/react-form';
import { updateBudgetSchema } from '@/schemas/budget.schemas';
import { Loader } from '@/components/ui/loader';
import type { Budget } from '@/types/budget';
import { useEffect } from 'react';
import { useCategories } from '@/hooks/use-category';
import { useTranslation } from 'react-i18next';

interface AddBudgetProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  budget?: Budget;
}

export const EditBudgetModal = ({ budget, open, setOpen }: AddBudgetProps) => {
  const { data: categories } = useCategories();
  const { mutateAsync: updateBudget } = useUpdateBudget();
  const { t } = useTranslation();

  useEffect(() => {
    form.reset();
  }, [budget]);

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
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <DialogHeader className="mb-4">
            <DialogTitle className="font-medium text-xl">
              {t('budget.edit.title', { title: budget?.category?.title || 'Budget' })}
            </DialogTitle>
            <DialogDescription>{t('budget.edit.description')}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <form.Field
              name="amount"
              children={(field) => (
                <div className="grid gap-3">
                  <Label htmlFor={field.name}>{t('budget.edit.form.amount')}</Label>
                  <Input
                    id={field.name}
                    placeholder={t('budget.edit.form.amountPlaceholder')}
                    type="number"
                    required
                    value={field.state.value || ''}
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
                  <Label htmlFor={field.name}>{t('budget.edit.form.limitAlert')}</Label>
                  <Input
                    id={field.name}
                    placeholder={t('budget.edit.form.limitAlertPlaceholder')}
                    type="number"
                    required
                    value={field.state.value || ''}
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
                    <Label htmlFor={field.name}>{t('budget.edit.form.category')}</Label>
                    <Select
                      name={field.name}
                      onValueChange={(value) => field.handleChange(value)}
                      value={field.state.value}
                      defaultValue={selectedCategory?.id}
                      required
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t('budget.edit.form.categoryPlaceholder')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>{t('budget.edit.form.categoryLabel')}</SelectLabel>
                          {categories?.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              <span>{category.title}</span>
                              <div
                                style={{ backgroundColor: category.color?.value }}
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
              <Button variant="outline">{t('budget.edit.form.cancel')}</Button>
            </DialogClose>
            <form.Subscribe
              selector={(state) => [state.isSubmitting]}
              children={([isSubmiting]) => (
                <Button type="submit" variant="blue">
                  {isSubmiting ? <Loader /> : t('budget.edit.form.update')}
                </Button>
              )}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
